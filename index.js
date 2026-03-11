"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const VANBLOG_URL = process.env.VANBLOG_URL || "https://lcqgy.top";
const VANBLOG_TOKEN = process.env.VANBLOG_TOKEN;
const apiClient = axios_1.default.create({
    baseURL: `${VANBLOG_URL}/api/v1`,
    headers: {
        Authorization: `Bearer ${VANBLOG_TOKEN}`,
    },
});
const server = new index_js_1.Server({
    name: "vanblog-mcp",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
/**
 * 列出所有可用的工具
 */
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "get_blog_stats",
                description: "获取博客的实时统计数据，如文章数、分类数、标签数、评论数等。",
                inputSchema: { type: "object", properties: {} },
            },
            {
                name: "list_posts",
                description: "列出博客的所有文章，支持分页查看。",
                inputSchema: {
                    type: "object",
                    properties: {
                        page: { type: "number", description: "页码", default: 1 },
                        limit: { type: "number", description: "每页数量", default: 10 },
                    },
                },
            },
            {
                name: "publish_post",
                description: "在博客上发布一篇新文章。",
                inputSchema: {
                    type: "object",
                    properties: {
                        title: { type: "string", description: "文章标题" },
                        content: { type: "string", description: "文章内容 (Markdown)" },
                        category: { type: "string", description: "文章分类名称", default: "未分类" },
                        tags: { type: "array", items: { type: "string" }, description: "标签列表" },
                    },
                    required: ["title", "content"],
                },
            },
        ],
    };
});
/**
 * 处理工具调用请求
 */
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        if (name === "get_blog_stats") {
            const response = await apiClient.get("/dashboard/stat");
            return {
                content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
            };
        }
        if (name === "list_posts") {
            const { page = 1, limit = 10 } = args;
            const response = await apiClient.get("/post/list", { params: { page, limit } });
            return {
                content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
            };
        }
        if (name === "publish_post") {
            const { title, content, category, tags = [] } = args;
            const postData = {
                title,
                content,
                category,
                tags,
                status: "published", // 默认直接发布
            };
            const response = await apiClient.post("/post/add", postData);
            return {
                content: [{ type: "text", text: `文章发布成功！ ID: ${response.data.id}` }],
            };
        }
        throw new Error(`未知工具: ${name}`);
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `错误: ${error.response?.data?.message || error.message}`,
                },
            ],
            isError: true,
        };
    }
});
/**
 * 启动服务器
 */
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("VanBlog MCP 服务器已启动！");
}
main().catch((error) => {
    console.error("启动失败:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map