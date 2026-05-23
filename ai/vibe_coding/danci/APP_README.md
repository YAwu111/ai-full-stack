# Vibe 词典

根据 `prompt.md` 实现的 AI 双语词典：选语言、查词/句、自然解释、例句朗读、概念配图、继续提问、笔记本与编故事复习。

## 功能对照

| 需求 | 实现 |
|------|------|
| 10 种常用语言（母语 + 目标语） | 中/英/西/法/德/日/韩/葡/俄/阿 |
| 单词、短语、整句查询 | 搜索框支持任意文本 |
| 母语自然解释 + 2 条例句及翻译 | 结果页「解释」「例句」 |
| 朋友式用法说明 | 「朋友式小贴士」 |
| AI 概念图 | DALL·E 生成（需 API Key） |
| 针对词条继续聊天 | 「继续提问」面板 |
| 目标语发音（词 + 例句） | 浏览器 Web Speech API |
| 保存到笔记本 | 结果页保存，本地持久化 |
| 编故事记忆 | 笔记本「编故事记忆」 |

## 快速开始

1. 安装依赖：

```bash
npm install
```

2. 配置 OpenAI（或兼容接口）：

```bash
cp .env.example .env
# 编辑 .env，填入 OPENAI_API_KEY
```

3. 启动（前端 + API 同时运行）：

```bash
npm run dev
```

- 前端：http://localhost:5173  
- API：http://localhost:3001  

## 环境变量

| 变量 | 说明 |
|------|------|
| `OPENAI_API_KEY` | 必填，用于查词、对话、编故事、配图 |
| `OPENAI_BASE_URL` | 可选，兼容 OpenAI 的代理地址 |
| `OPENAI_MODEL` | 默认 `gpt-4o-mini` |
| `OPENAI_IMAGE_MODEL` | 默认 `dall-e-3` |
| `PORT` | API 端口，默认 `3001` |

## 技术栈

- 前端：React + Vite + TypeScript  
- 后端：Express + OpenAI SDK  
- 发音：Web Speech API（低延迟、无需额外 Key）  
- 笔记本：`localStorage`
