#!/bin/bash

# LinguaNode 一键启动脚本
# 功能：检查环境 -> 启动 Neo4j -> 初始化数据 -> 启动前端

# 设置颜色
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 欢迎使用 LinguaNode 系统${NC}"

# 1. 检查 Docker 是否安装
if ! command -v docker &> /dev/null
then
    echo -e "${YELLOW}⚠️ 未检测到 Docker，请确保您已手动启动 Neo4j 服务并监听 7687 端口。${NC}"
else
    # 检查容器是否已经在运行
    if [ "$(docker ps -q -f name=neo4j-lingua)" ]; then
        echo -e "${GREEN}✅ Neo4j 容器已在运行。${NC}"
    else
        echo -e "${BLUE}📦 正在通过 Docker 启动 Neo4j (首次运行可能需要下载镜像)...${NC}"
        docker run \
            --name neo4j-lingua \
            -p 7474:7474 -p 7687:7687 \
            -d \
            -e NEO4J_AUTH=neo4j/password \
            neo4j:latest > /dev/null
        
        echo -e "${YELLOW}⏳ 等待 Neo4j 服务就绪 (约 20 秒)...${NC}"
        sleep 20
    fi
fi

# 2. 安装依赖 (如果 node_modules 不存在)
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📥 正在安装项目依赖...${NC}"
    npm install
fi

# 3. 初始化图数据库数据
echo -e "${BLUE}🧪 正在导入语义网络数据到 Neo4j...${NC}"
npm run db:neo4j

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 数据初始化成功！${NC}"
else
    echo -e "${YELLOW}❌ 数据导出失败，请检查 Neo4j 是否连接成功。${NC}"
    exit 1
fi

# 4. 启动前端
echo -e "${GREEN}✨ 正在启动前端展示界面...${NC}"
echo -e "${BLUE}预览地址: http://localhost:5173${NC}"
npm run dev
