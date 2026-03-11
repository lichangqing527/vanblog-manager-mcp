import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const client = axios.create({
  baseURL: 'https://lcqgy.top/api',
  headers: { 'token': process.env.VANBLOG_TOKEN }
});

async function quickPublish() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('📖 使用方法: node publish.js "标题" "分类" ["标签1,标签2"]');
    console.log('示例: node publish.js "我的第一篇AI文章" "技术分享" "AI,Gemini"');
    return;
  }

  const [title, category, tagsRaw] = args;
  const tags = tagsRaw ? tagsRaw.split(',') : [];

  console.log(`🚀 正在发布文章: 【${title}】 到分类 【${category}】...`);

  try {
    const res = await client.post('/admin/article', {
      title,
      content: '这是由 Gemini CLI 自动生成的内容占位符。请在后台编辑具体内容。',
      category,
      tags,
      createdAt: new Date().toISOString()
    });
    
    // 适配我们发现的嵌套响应结构
    const articleId = res.data.data.id;
    console.log(`✅ 发布成功！文章 ID: ${articleId}`);
    console.log(`🔗 管理地址: https://lcqgy.top/admin/article/edit/${articleId}`);
  } catch (error) {
    console.error('❌ 发布失败:', error.response?.data || error.message);
  }
}

quickPublish();
