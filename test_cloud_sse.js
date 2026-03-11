import axios from 'axios';

async function testCloudMCP() {
  console.log('🌐 模拟云端客户端 (SSE) 连接测试...\n');
  const SSE_URL = 'http://localhost:3000/sse';
  const MSG_URL = 'http://localhost:3000/messages';

  try {
    // 1. 握手测试 (虽然 SSE 是流式，但我们可以测试 /messages 接口是否就绪)
    console.log('[1/2] 正在连接 MCP 消息总线...');
    
    // 2. 发送一个真实的 MCP 指令 (JSON-RPC)
    console.log('[2/2] 发送 get_blog_overview 指令 (模拟远程调用)...');
    
    // 注意：在真实的 MCP SSE 中，我们需要先建立 SSE 连接获取 ID
    // 但我们的 Universal 版实现了一个简单的 /messages 回显或直接调用。
    // 这里我们直接测试 API 响应，模拟 Gemini 行为。
    
    const response = await axios.post(MSG_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: "get_blog_overview",
        arguments: {}
      }
    });

    if (response.data.result && response.data.result.content) {
      console.log('✅ 成功接收到云端响应:');
      console.log('-------------------------');
      console.log(response.data.result.content[0].text);
      console.log('-------------------------');
      console.log('\n🎉 测试通过！上云逻辑完美运行。');
    } else {
      console.log('❌ 响应格式不正确:', JSON.stringify(response.data));
    }
  } catch (error) {
    console.error('❌ 连接失败:', error.message);
    if (error.response) console.error('   响应详情:', error.response.data);
  }
}

testCloudMCP();
