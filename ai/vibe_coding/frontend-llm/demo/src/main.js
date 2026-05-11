import "./style.css";

(async () => {
  const endpoint = "https://api.deepseek.com/chat/completions";
  const replyEl = document.getElementById("reply");

  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  if (!apiKey) {
    replyEl.textContent =
      "未配置 VITE_DEEPSEEK_API_KEY：请在 demo 根目录创建 .env.local（不是 js/ 子目录），并写入 VITE_DEEPSEEK_API_KEY=你的密钥。";
    return;
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "你好, DeepSeek!" },
  ];
  const body = {
    model: "deepseek-v4-pro",
    messages,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const raw = await response.text();
  if (!response.ok) {
    replyEl.textContent = `请求失败 HTTP ${response.status}：${raw || "(无响应体)"}`;
    return;
  }
  if (!raw.trim()) {
    replyEl.textContent = "响应体为空，无法解析 JSON。";
    return;
  }
  try {
    const data = JSON.parse(raw);
    replyEl.textContent = data.choices[0].message.content;
  } catch (e) {
    replyEl.textContent = `JSON 解析失败：${e.message}`;
  }
})();
