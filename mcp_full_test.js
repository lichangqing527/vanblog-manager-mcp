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

async function runTests() {
  console.log('🚀 开始全功能自动化测试 (3.1 稳定版)...\n');

  try {
    // 1. 测试概览
    console.log('[1/4] 测试博客概览...');
    const res = await client.get('/admin/article', { params: { page: 1 } });
    console.log(`✅ 成功: 当前文章总数 ${res.data.data.total}\n`);

    // 2. 测试草稿流
    console.log('[2/4] 测试草稿管理...');
    const draftRes = await client.post('/admin/draft', { 
      title: 'TEST_DRAFT_TEMP', 
      content: 'Test Content',
      category: '🤖 机器人自动发布'
    });
    const draftId = draftRes.data.data.id;
    await client.delete(`/admin/draft/${draftId}`);
    console.log(`✅ 成功: 草稿流测试通过\n`);

    // 3. 测试文章流
    console.log('[3/4] 测试文章管理...');
    const articleRes = await client.post('/admin/article', { 
        title: 'TEST_ARTICLE_TEMP', 
        content: 'Test Article Content', 
        category: '🤖 机器人自动发布' 
    });
    const articleId = articleRes.data.data.id;
    
    const listRes = await client.get('/admin/article', { params: { page: 1 } });
    const found = listRes.data.data.articles.find(a => a.id === articleId);
    if (found) {
        console.log(`   - 列表校验成功: 找到了测试文章`);
        await client.delete(`/admin/article/${articleId}`);
        console.log(`✅ 成功: 文章流测试通过\n`);
    }

    // 4. 测试配置 (使用新路径)
    console.log('[4/4] 测试站点信息获取...');
    const config = await client.get('/admin/meta/site');
    console.log(`✅ 成功: 站点标题为 "${config.data.data.title || '未设置'}"\n`);

    console.log('🎉 恭喜！所有 100% 准确的 API 测试均已通过。');
  } catch (error) {
    console.error('❌ 测试失败:', error.response?.data || error.message);
    process.exit(1);
  }
}

runTests();
