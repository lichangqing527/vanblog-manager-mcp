# 🚀 vblog-manager-mcp

> **VBlog Manager MCP (Universal Edition)** - 您的 AI 驱动博客管理管家。

这是一个基于 [Model Context Protocol (MCP)](https://modelcontextprotocol.io) 的服务器，专门为 VBlog/VanBlog 系统定制。它让您可以通过 Gemini CLI 或任何支持 MCP 的客户端，直接用自然语言管理您的博客。

---

## ✨ 核心特性

- **🌍 全方位工具**: 支持文章发布、草稿管理、评论监控、站点配置、分类标签整理。
- **💻 双模态支持**: 
  - **Stdio 模式**: 本地安全运行。
  - **SSE 远程模式**: 支持 HTTP/SSE 协议，可跨设备连接。
- **🐳 容器化支持**: 内置 Dockerfile，支持一键部署到云端（Railway, Vercel, VPS）。
- **🛡️ 隐私保护**: 敏感信息（Token）通过环境变量隔离，支持 `.env` 文件。
- **📊 自动化测试**: 内置完整的 `mcp_full_test.js` 验证逻辑。

---

## 🛠️ 快速开始 (本地部署)

### 1. 前置要求
- Node.js v18+
- npm 或 yarn

### 2. 安装与编译
```bash
git clone https://github.com/lichangqing527/vblog-manager-mcp.git
cd vblog-manager-mcp
npm install
npm run build
```

### 3. 配置环境变量
将 `.env.example` 重命名为 `.env`，填入您的 Token 和博客地址：
```env
VANBLOG_URL=https://your-blog-domain.com
VANBLOG_TOKEN=your_token_here
```

### 4. 注册到 Gemini CLI
在您的 `mcp-servers.json` 中添加：
```json
"vblog-manager": {
  "command": "node",
  "args": ["/absolute/path/to/vblog-manager-mcp/dist/index.js"]
}
```

---

## 🌍 远程与云端部署 (SSE 模式)

### 1. 本地启动远程模式
```bash
export PORT=3000
npm start
```
此时 MCP 会运行在 `http://localhost:3000/sse`。

### 2. Docker 一键部署
```bash
docker build -t vblog-manager .
docker run -p 3000:3000 --env-file .env vblog-manager
```

---

## 🧰 工具清单 (Tools)

| 工具名称 | 功能 | 示例指令 |
| :--- | :--- | :--- |
| `get_blog_overview` | 统计概览（文章、分类、标签） | "看看我博客现在的运营概括。" |
| `manage_articles` | 文章增删改查 | "列出我最近 5 篇文章。" |
| `manage_drafts` | 草稿箱管理 | "帮我存一段草稿。" |
| `get_comments` | 评论实时监控 | "最近有人留言吗？" |
| `site_config` | 修改站点配置（标题、描述） | "修改博客副标题。" |

---

## 📂 项目结构
- `index.ts`: MCP 核心逻辑 (ES Modules)
- `publish.js`: 极简命令行发布工具
- `cleanup_blog.js`: 自动化测试数据清理脚本
- `VBLOG_API_MANUAL.md`: VBlog 系统深度解析手册

---

## 📄 开源协议
MIT License.

---
*Generated with ❤️ by Gemini CLI.*
