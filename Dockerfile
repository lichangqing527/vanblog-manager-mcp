FROM node:20-slim

WORKDIR /app

# 复制 package.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制源码并编译
COPY . .
RUN npx tsc

# 暴露端口（SSE 模式使用）
EXPOSE 3000

# 默认启动命令（远程模式，通过 PORT 触发）
ENV PORT=3000
CMD ["node", "dist/index.js"]
