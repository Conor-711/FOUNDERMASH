# Railway PostgreSQL 配置详细指南

## 🚨 当前错误分析

你遇到的错误是：`Environment variable not found: DATABASE_URL`

这意味着Railway项目中还没有正确配置PostgreSQL服务。

## 🔧 解决步骤

### 步骤 1：访问Railway项目

1. 打开 [railway.app](https://railway.app)
2. 登录你的账号
3. 找到并点击进入你的 **FOUNDERMASH** 项目

### 步骤 2：检查当前服务

在项目页面中，你应该看到：
- **一个Web服务**（显示你的GitHub仓库）
- **可能没有数据库服务**

### 步骤 3：添加PostgreSQL数据库

#### 方法A：通过左侧菜单
1. 点击左侧的 **"+"** 按钮
2. 选择 **"Database"**
3. 选择 **"PostgreSQL"**

#### 方法B：通过项目页面
1. 在项目页面寻找 **"Add Service"** 或 **"New Service"** 按钮
2. 选择 **"Database"**
3. 选择 **"PostgreSQL"**

#### 方法C：通过顶部菜单
1. 查看项目页面顶部是否有 **"Add"** 或 **"+"** 按钮
2. 选择添加数据库服务

### 步骤 4：等待数据库创建

1. PostgreSQL服务会出现一个新的卡片/图块
2. 等待状态从 "Building" 变为 **"Active"**
3. 这通常需要 1-3 分钟

### 步骤 5：验证环境变量

1. 点击你的 **Web服务**（不是数据库服务）
2. 选择 **"Variables"** 标签页
3. 确认你看到：
   - `DATABASE_URL` (应该以 `postgresql://` 开头)
   - `NODE_ENV` = `production`
   - `NEXT_TELEMETRY_DISABLED` = `1`

### 步骤 6：重新部署

1. 在Web服务页面，选择 **"Deployments"** 标签
2. 点击 **"Deploy Latest"** 或 **"Redeploy"**

## 🔍 故障排除

### 如果找不到"+"按钮：

1. **刷新页面**
2. **检查权限**：确保你是项目的所有者/管理员
3. **尝试不同浏览器**或无痕模式
4. **联系Railway支持**如果问题持续

### 如果PostgreSQL创建失败：

1. **重试创建**
2. **检查账号限制**（免费账号可能有限制）
3. **升级账号**如果需要

### 如果DATABASE_URL仍然缺失：

1. **重启PostgreSQL服务**
2. **删除并重新创建PostgreSQL服务**
3. **检查服务是否正确连接**

## ✅ 成功标志

配置成功后，你应该看到：

1. **两个服务**：Web服务 + PostgreSQL服务
2. **DATABASE_URL变量**：在Web服务的Variables页面
3. **部署成功**：Web服务显示"Deployed"状态
4. **网站可访问**：点击Web服务提供的URL

## 📞 需要帮助？

如果遇到困难，可以：

1. **截图当前Railway项目页面**
2. **说明你看到的具体界面和选项**
3. **我们可以一步步解决问题**

记住：Railway的界面可能因版本更新而略有不同，但核心流程是相同的。
