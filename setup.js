import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import os from 'os';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setup() {
  console.log('🛠️  开始引导安装 VBlog Manager MCP...\n');

  try {
    // 1. 安装依赖与编译
    console.log('[1/4] 正在安装依赖并编译项目...');
    execSync('npm install', { stdio: 'inherit' });
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ 编译完成。\n');

    // 2. 获取配置
    console.log('[2/4] 配置博客信息...');
    const url = await question('请输入博客 URL (例如 https://lcqgy.top): ');
    const token = await question('请输入 API Token: ');

    const envContent = `VANBLOG_URL=${url}\nVANBLOG_TOKEN=${token}\nPORT=3000\n`;
    fs.writeFileSync('.env', envContent);
    console.log('✅ .env 配置文件已生成。\n');

    // 3. 自动识别 Gemini 配置路径并注册
    console.log('[3/4] 正在尝试自动注册到 Gemini CLI...');
    const homeDir = os.homedir();
    // 常见的 Gemini 配置路径 (根据 Gemini CLI 的实际存储位置调整)
    const configPath = path.join(homeDir, '.gemini', 'mcp-servers.json');
    const configDir = path.dirname(configPath);

    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    let config = { mcpServers: {} };
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }

    const absoluteDistPath = path.resolve('dist', 'index.js').replace(/\\/g, '/');

    config.mcpServers['vblog-manager'] = {
      command: 'node',
      args: [absoluteDistPath],
      env: {
        VANBLOG_URL: url,
        VANBLOG_TOKEN: token
      }
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`✅ 已成功注册到: ${configPath}\n`);

    // 4. 完成
    console.log('🎉 安装成功！现在您可以直接对 Gemini 说: "帮我看看博客概览" 了。');
    process.exit(0);
  } catch (error) {
    console.error('❌ 安装失败:', error.message);
    process.exit(1);
  }
}

setup();
