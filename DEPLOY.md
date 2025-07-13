# Vercel 部署指南

## 🚀 一键部署到 Vercel

### 步骤 1: 重新安装依赖
```bash
cd SuperClaude/superclaude-generator
rm -rf node_modules package-lock.json
npm install
```

### 步骤 2: 本地测试
```bash
npm run build
npm start
```

### 步骤 3: 部署到 Vercel

#### 方法一：通过 Vercel CLI（推荐）
```bash
npm install -g vercel
cd SuperClaude
vercel --prod
```

#### 方法二：通过 Vercel Dashboard
1. 导入你的 GitHub 仓库
2. **项目设置**:
   - Framework Preset: **Next.js**
   - Root Directory: **superclaude-generator**
   - Build Command: **npm run build**
   - Output Directory: **.next**
   - Install Command: **npm install**

### 配置说明

已添加的配置文件：
- `vercel.json` - 指定项目根目录为 `superclaude-generator`
- `next.config.ts` - 优化生产构建配置
- `package.json` - 降级到稳定版本避免兼容性问题

### 🔧 修复的问题

1. **404 错误** - 通过 `vercel.json` 指定正确的项目目录
2. **依赖版本** - 降级到稳定的 React 18 + Next.js 14
3. **构建优化** - 添加 standalone 输出和性能优化

### 🚨 常见问题

- **如果仍然 404**: 检查 Vercel Dashboard 中的 "Settings > General > Root Directory" 是否设置为 `superclaude-generator`
- **构建失败**: 清除 `.next` 目录重新构建
- **类型错误**: 运行 `npm install` 重新安装类型定义

### 🎯 验证部署

部署成功后，访问 Vercel 提供的 URL，应该能看到 SuperClaude 命令生成器界面。 