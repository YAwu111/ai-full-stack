import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import OpenAI from 'openai';
import { LANG_NAMES, type LangCode } from './lang.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || undefined,
    })
  : null;

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || 'dall-e-3';

function langLabel(code: LangCode): string {
  return LANG_NAMES[code] || code;
}

function requireOpenAI(res: express.Response): OpenAI | null {
  if (!openai) {
    res.status(503).json({
      error: '未配置 OPENAI_API_KEY，请在项目根目录创建 .env 并填入密钥',
    });
    return null;
  }
  return openai;
}

interface LookupBody {
  query: string;
  nativeLang: LangCode;
  targetLang: LangCode;
}

interface LookupAI {
  targetText: string;
  explanation: string;
  examples: { sentence: string; translation: string }[];
  usageTips: string;
  imagePrompt: string;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, hasKey: Boolean(openai) });
});

app.post('/api/lookup', async (req, res) => {
  const client = requireOpenAI(res);
  if (!client) return;

  const { query, nativeLang, targetLang } = req.body as LookupBody;
  if (!query?.trim()) {
    res.status(400).json({ error: '请输入要查询的内容' });
    return;
  }

  const native = langLabel(nativeLang);
  const target = langLabel(targetLang);

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `你是轻松、地道的双语词典助手。用户母语：${native}，学习目标语言：${target}。
返回严格 JSON，字段：
- targetText: 目标语言中最自然的对应表达（单词/短语/整句均可）
- explanation: 用${native}写的自然解释，像朋友解释，不要词典腔
- examples: 恰好2条，每条 { sentence: 目标语言例句, translation: ${native}翻译 }
- usageTips: 用${native}写，像朋友聊天：文化语境、常用场景、语气、同义词或易混词及差别。极简、直入主题，禁止教科书口吻
- imagePrompt: 英文，一句 DALL·E 提示词，直观呈现该概念，无文字、无水印`,
        },
        {
          role: 'user',
          content: `查询：${query.trim()}`,
        },
      ],
      temperature: 0.7,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error('空响应');

    const data = JSON.parse(raw) as LookupAI;
    let imageUrl: string | null = null;

    if (data.imagePrompt) {
      try {
        const img = await client.images.generate({
          model: IMAGE_MODEL,
          prompt: `${data.imagePrompt}. Clean illustration, soft colors, no text, no watermark.`,
          n: 1,
          size: '1024x1024',
        });
        imageUrl = img.data[0]?.url ?? null;
      } catch {
        imageUrl = null;
      }
    }

    res.json({
      id: crypto.randomUUID(),
      query: query.trim(),
      targetText: data.targetText,
      explanation: data.explanation,
      examples: data.examples?.slice(0, 2) ?? [],
      usageTips: data.usageTips,
      imagePrompt: data.imagePrompt,
      imageUrl,
      nativeLang,
      targetLang,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: '查询失败，请稍后重试' });
  }
});

app.post('/api/chat', async (req, res) => {
  const client = requireOpenAI(res);
  if (!client) return;

  const { messages, context } = req.body as {
    messages: { role: 'user' | 'assistant'; content: string }[];
    context: {
      query: string;
      targetText: string;
      nativeLang: LangCode;
      targetLang: LangCode;
    };
  };

  const native = langLabel(context.nativeLang);
  const target = langLabel(context.targetLang);

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `你是词典陪练。用户在学「${context.query}」→ ${context.targetText}（${target}）。用${native}回答，简洁口语化，可补充例句和易混点。`,
        },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.75,
    });

    const reply = completion.choices[0]?.message?.content ?? '暂时无法回答，请再试一次。';
    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: '对话失败' });
  }
});

app.post('/api/story', async (req, res) => {
  const client = requireOpenAI(res);
  if (!client) return;

  const { items, nativeLang, targetLang } = req.body as {
    items: { query: string; targetText: string }[];
    nativeLang: LangCode;
    targetLang: LangCode;
  };

  if (!items?.length) {
    res.status(400).json({ error: '笔记本为空，先保存一些词条吧' });
    return;
  }

  const native = langLabel(nativeLang);
  const target = langLabel(targetLang);
  const wordList = items.map((i) => `${i.query} → ${i.targetText}`).join('\n');

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `用${target}写一段200-350字的小故事，串联用户生词表里的词/短语，情节简单好记。附${native}标题。
JSON: { title, story, vocabularyUsed: string[] }`,
        },
        { role: 'user', content: wordList },
      ],
      temperature: 0.85,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error('空响应');
    res.json(JSON.parse(raw));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: '编故事失败' });
  }
});

app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT}`);
  if (!openai) console.warn('⚠ OPENAI_API_KEY 未设置，API 将返回 503');
});
