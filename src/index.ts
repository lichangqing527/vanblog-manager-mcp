#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const BLOG_URL = process.env.VANBLOG_URL || "https://lcqgy.top";
const BLOG_TOKEN = process.env.VANBLOG_TOKEN;

const apiClient = axios.create({
  baseURL: `${BLOG_URL}/api`,
  headers: {
    "token": BLOG_TOKEN,
    "Content-Type": "application/json"
  },
});

const server = new Server(
  {
    name: "vanblog-manager",
    version: "3.2.0",
  },
  {
    capabilities: { tools: {} },
  }
);

/**
 * 核心工具定义 (保持不变，确保逻辑稳健)
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_blog_overview",
        description: "获取博客全局概览（文章数、分类、标签）。",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "manage_articles",
        description: "管理文章：列表、发布、删除。",
        inputSchema: {
          type: "object",
          properties: {
            action: { enum: ["list", "publish", "delete"], description: "操作类型" },
            page: { type: "number", default: 1 },
            title: { type: "string" },
            content: { type: "string" },
            category: { type: "string" },
            id: { type: "string" },
          },
          required: ["action"],
        },
      },
      {
        name: "site_config",
        description: "获取或更新站点基础信息。",
        inputSchema: {
          type: "object",
          properties: {
            action: { enum: ["get", "update"], description: "操作类型" },
            config: { type: "object" },
          },
          required: ["action"],
        },
      }
    ],
  };
});

/**
 * 处理工具调用请求 (与之前逻辑一致，确保 100% 兼容)
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    switch (name) {
      case "get_blog_overview": {
        const [articles, categories, tags] = await Promise.all([
          apiClient.get("/admin/article", { params: { page: 1 } }),
          apiClient.get("/admin/category/all"),
          apiClient.get("/admin/tag/all")
        ]);
        return {
          content: [{
            type: "text",
            text: `📊 概览: 总文章 ${articles.data.data.total}, 分类: ${categories.data.data.map((c:any)=>c.name).join(",")}`
          }],
        };
      }
      case "manage_articles": {
        const { action, page, title, content, category, id } = args as any;
        if (action === "list") {
          const res = await apiClient.get("/admin/article", { params: { page } });
          return { content: [{ type: "text", text: JSON.stringify(res.data.data.articles, null, 2) }] };
        }
        if (action === "publish") {
          await apiClient.post("/admin/article", { title, content, category, createdAt: new Date().toISOString() });
          return { content: [{ type: "text", text: "✅ 文章发布成功" }] };
        }
        if (action === "delete") {
          await apiClient.delete(`/admin/article/${id}`);
          return { content: [{ type: "text", text: `🗑️ 文章已删除` }] };
        }
        break;
      }
      case "site_config": {
        const { action, config } = args as any;
        if (action === "get") {
          const res = await apiClient.get("/admin/meta/site");
          return { content: [{ type: "text", text: JSON.stringify(res.data.data, null, 2) }] };
        }
        break;
      }
      default:
        throw new Error(`未知工具: ${name}`);
    }
    return { content: [{ type: "text", text: "操作执行完毕" }] };
  } catch (error: any) {
    return { content: [{ type: "text", text: `❌ 失败: ${JSON.stringify(error.response?.data || error.message)}` }], isError: true };
  }
});

/**
 * 启动逻辑：智能双模切换
 */
async function main() {
  const PORT = process.env.PORT || null;

  if (PORT) {
    // 🌍 远程模式 (HTTP/SSE)
    const app = express();
    app.use(cors());
    let transport: SSEServerTransport | null = null;

    app.get("/sse", async (req, res) => {
      transport = new SSEServerTransport("/messages", res);
      await server.connect(transport);
    });

    app.post("/messages", async (req, res) => {
      if (transport) {
        await transport.handlePostMessage(req, res);
      }
    });

    app.listen(PORT, () => {
      console.error(`🌍 远程 MCP 服务器运行在端口: ${PORT}`);
      console.error(`🔗 访问地址: http://localhost:${PORT}/sse`);
    });
  } else {
    // 💻 本地模式 (STDIO)
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("💻 本地 MCP 服务器已启动 (STDIO 模式)");
  }
}

main().catch(console.error);
