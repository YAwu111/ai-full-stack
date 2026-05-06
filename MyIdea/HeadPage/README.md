# HeadPage 项目说明

以「奶龙大王」为主题的静态前端页面：首屏（layer1）+ 可上推的内容面板（layer2）、固定顶栏导航、主题区块、子页面与侧边快捷入口。

## 项目结构

| 文件 | 说明 |
|------|------|
| `index.html` | 主页面：首屏、三个主题区块、左侧子站导航、右侧快捷入口、页脚 |
| `style.css` | 全局与首页样式（含侧栏、主题块、footer 等） |
| `script.js` | 面板展开/收起、主导航与锚点滚动、回到顶部等 |
| `work.html` | 作品展示 |
| `server.html` | 服务中心 |
| `news.html` | 新闻中心 |
| `FAQ.html` | 常见问题 |
| `planning.html` | 企业规划 |
| `AI.html` | AI 聊天界面（调用 DeepSeek Chat Completions API） |
| `message.html` | 留言板（表单提交后本地展示最近留言，演示用） |
| `icon.png` | 站点图标 |
| `record1.svg` / `record2.svg` / `record3.svg` | 首屏旋转视觉素材 |

## 当前功能

- **首屏与面板**：滚轮或「了解更多」展开 `layer2`；`main` 与 `footer` 随 `layer2` 一起滚动。
- **顶栏导航**：固定在视口顶部；企业文化 / 关于我们 / 联系我们 会打开面板并滚到对应区块；首页回到页面顶部并收起面板。
- **主题区块**：企业文化、关于我们、联系我们（均在 `index.html` 的 `main` 内）。
- **左侧侧栏**：链向 `work.html`、`server.html`、`news.html`、`FAQ.html`、`planning.html`。
- **右侧侧栏**：`AI.html`（AI 聊天）、`message.html`（留言板）；侧栏支持边缘悬停展开。
- **子页面**：上述五个子页风格统一，含互相跳转与返回首页链接。
- **AI 聊天**：`AI.html` 内使用 DeepSeek 接口与指定模型、系统提示词（详见该文件内脚本）。

## 运行方式

纯静态资源，无需安装依赖。

1. 用浏览器直接打开 `index.html`；或  
2. 使用 VS Code / Cursor 的 Live Server 等本地静态服务预览。

若 `AI.html` 请求接口时出现跨域或网络限制，请通过本地静态服务打开页面，并确认网络可访问 DeepSeek API。

## 安全提示（重要）

`AI.html` 中若直接写入 API Key，会被任何打开页面的人在源码中看到，存在泄露与盗刷风险。**正式环境请改为后端代理**或环境变量注入，切勿把密钥提交到公开仓库。

## 后续可优化方向

- 子页面与 `AI.html` / `message.html` 的内联样式可抽成公共 `subpage.css`，减少重复维护。
- 留言板接入真实后端或表单服务（如 Formspree、自建 API）。
- 首屏 `record` 区域在小屏上的尺寸与溢出适配。
- 补充 `meta description`、Open Graph；导航项增加 `aria-current="page"` 等无障碍细节。
