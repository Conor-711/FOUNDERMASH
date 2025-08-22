# Railway 部署指南

## 问题：每次部署后数据重置

**原因**：目前使用SQLite数据库存储在临时文件系统中，每次Railway部署时容器重启，数据库文件丢失。

## 解决方案：配置PostgreSQL持久化数据库

### 步骤 1：在Railway添加PostgreSQL服务

1. 登录 Railway 控制台
2. 进入你的项目
3. 点击 "Add Service" → "Database" → "PostgreSQL"
4. Railway会自动生成数据库连接信息

### 步骤 2：自动Schema切换

项目已配置自动在部署时切换到PostgreSQL schema：

- **开发环境**：使用 `prisma/schema.prisma` (SQLite)
- **生产环境**：自动使用 `prisma/schema.production.prisma` (PostgreSQL)

Railway构建过程会自动切换schema，无需手动修改。

### 步骤 3：配置环境变量

在Railway项目的环境变量中设置：

```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

**注意**：`DATABASE_URL` 会由Railway自动设置为PostgreSQL连接字符串

### 步骤 3：部署配置

项目已包含 `railway.toml` 配置文件，包含：
- 自动运行数据库迁移：`npx prisma migrate deploy`
- 正确的构建和启动命令
- 健康检查配置

### 步骤 4：迁移现有数据（可选）

如果需要迁移本地开发数据到生产环境：

1. 导出本地数据：
```bash
npx prisma db pull --schema prisma/schema.prisma
```

2. 在PostgreSQL中重新创建表结构：
```bash
npx prisma migrate deploy
```

3. 手动迁移重要数据（如果需要）

### 验证部署

部署完成后：
1. 数据库表结构会自动创建
2. founder ELO分数会保持在投票后的状态
3. 用户投票记录会持久保存
4. 后续部署不会重置数据

### 性能优化

已实施的优化：
- 数据库事务批处理
- 并行数据库操作
- 请求超时控制
- 优化的前端交互时机

这些改进应该显著减少点击founder头像的响应时间。
