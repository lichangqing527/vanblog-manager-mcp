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

async function runCleanup() {
  console.log('🧹 启动博客数据终极清理程序...');

  try {
    const res = await client.get('/admin/article', { params: { page: 1 } });
    const root = res.data.data;
    const articles = root.articles || root.data || [];

    // 筛选出所有测试性质的文章
    const toDelete = articles.filter(a => 
      a.title.includes('Gemini') || 
      a.title.includes('TEST') || 
      a.category.includes('机器人')
    );

    if (toDelete.length === 0) {
      console.log('✅ 没发现残留的测试文章。');
      return;
    }

    console.log(`🔍 扫描发现 ${toDelete.length} 篇测试文章，正在删除...`);

    for (const a of toDelete) {
      const id = a.id || a._id;
      await client.delete(`/admin/article/${id}`);
      console.log(`   🗑️ 已成功删除: ${a.title}`);
    }

    console.log('\n🌟 清理成功！您的博客现已恢复为纯净状态。');
  } catch (error) {
    console.error('❌ 清理失败:', error.response?.data || error.message);
  }
}

runCleanup();
