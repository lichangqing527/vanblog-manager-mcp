# 🚀 vanblog-manager-mcp

> **VanBlog Manager MCP** - 您的 AI 驱动博客管理管家。

这是一个基于 [Model Context Protocol (MCP)](https://modelcontextprotocol.io) 的服务器，专为 VanBlog 系统定制。通过它，您可以使用 Gemini CLI、Claude Desktop 或任何支持 MCP 的客户端，直接以自然语言管理您的博客。

---

## ✨ 核心特性

- **🌍 全方位管理**: 支持文章发布、概览统计、分类管理及站点配置。
- **🏗️ 工程化标准**: 
  - **TypeScript**: 强类型开发，源码位于 `src/`。
  - **Vitest**: 完善的单元测试与集成测试，位于 `tests/`。
  - **ESLint**: 统一的代码质量校验。
- **🛠️ 一键安装**: 内置 `setup.js` 引导脚本，自动完成编译、配置与注册。
- **📦 标准化分发**: 支持 `npx vanblog-manager-mcp` 直接运行。
- **🛡️ 隐私保护**: 敏感信息通过环境变量隔离，支持 `.env` 文件。

---

## 🛠️ 快速开始

### 1. 自动安装 (推荐)
在项目根目录运行引导脚本，它将自动完成依赖安装、项目编译、生成配置并将其注册到 Gemini CLI：
```bash
node setup.js
```

### 2. 手动安装与编译
如果您希望手动控制流程：
```bash
# 安装依赖
npm install
# 执行编译 (输出到 dist 目录)
npm run build
# 运行测试
npm test
```

### 3. 配置
在 `mcp-servers.json` 中添加配置，或使用项目根目录生成的 `.env` 文件：
```json
"vanblog-manager-mcp": {
  "command": "node",
  "args": ["/绝对路径/dist/index.js"],
  "env": {
    "VANBLOG_URL": "https://your-blog.com",
    "VANBLOG_TOKEN": "your_token"
  }
}
```

---

## 📦 MCP 客户端安装

### Claude Desktop / Claude Code

```bash
claude mcp add vanblog-manager --scope user -- npx -y github:lichangqing527/vanblog-manager-mcp
```

然后在配置文件中设置环境变量：
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "vanblog-manager": {
      "command": "npx",
      "args": ["-y", "github:lichangqing527/vanblog-manager-mcp"],
      "env": {
        "VANBLOG_URL": "https://your-blog.com",
        "VANBLOG_TOKEN": "your_token_here"
      }
    }
  }
}
```

### Gemini CLI

```bash
gemini mcp add -s user vanblog-manager -e VANBLOG_URL="https://your-blog.com" -e VANBLOG_TOKEN="your_token_here" -- npx -y github:lichangqing527/vanblog-manager-mcp
```

> 💡 **提示**: 将 `your_token_here` 替换为您的 VanBlog Token。

---

## 🧰 工具清单 (Tools)

| 工具名称 | 功能描述 | 示例指令 |
| :--- | :--- | :--- |
| `get_blog_overview` | 获取博客全局概览（文章数、分类、标签）。 | "看看我博客现在的运营概况。" |
| `manage_articles` | 管理文章：支持列表查看、发布和删除。 | "帮我发布一篇标题为'测试'的文章。" |
| `site_config` | 获取或更新站点基础信息（标题、描述等）。 | "修改博客副标题为'AI 驱动'。" |

---

## 📂 项目结构
- `src/index.ts`: MCP 服务器核心逻辑。
- `tests/`: 包含协议验证与功能逻辑的测试用例。
- `setup.js`: 交互式引导安装工具。
- `dist/`: 编译后的生产代码。
- `VBLOG_API_MANUAL.md`: VanBlog API 深度解析手册。

---

## 📄 开源协议
MIT License.

---
*Developed with ❤️ for the VanBlog community.*
