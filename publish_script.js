import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const apiClient = axios.create({
  baseURL: 'https://lcqgy.top/api',
  headers: {
    Authorization: `Bearer ${process.env.VANBLOG_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

const content = `
# Gemini MCP 自动化部署实践

这是由 Gemini CLI 自动生成的部署记录。通过 Model Context Protocol (MCP)，我们成功为博客集成了一套自动管理工具。

## 🚀 集成功能
- **自动化发布**: 支持 Markdown 一键推送到博客。
- **实时统计**: 监控博客访问量与交互数据。
- **分类管理**: 自动归类与标签提取。

## 🛠️ 技术栈
- **Language**: TypeScript (ES Modules)
- **Protocol**: Model Context Protocol (MCP)
- **Host**: Node.js + Axios

---
*注：本文由 Gemini CLI 机器人自动生成并发布。*
`;

async function publish() {
  try {
    const response = await apiClient.post('/post', {
      title: 'Gemini MCP 自动化部署实践',
      content: content,
      category: '🤖 机器人自动发布',
      tags: ['Gemini', 'MCP', 'Automation'],
      status: 'published'
    });
    console.log('✅ 文章发布成功！');
    console.log('🔗 请访问博客查看: https://lcqgy.top/');
  } catch (error) {
    console.error('❌ 发布失败:', error.response?.data || error.message);
  }
}

publish();
