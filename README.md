# 个人记账工具 (Expense Tracker)

这是一个使用现代前端技术栈构建的个人记账 Web 应用，具有直观的卡片式 UI 布局，并且完美支持响应式设计和暗黑模式。

## ✨ 核心功能

- 📊 **数据看板 (Dashboard)**：实时计算并显示“总资产”（所有收入减支出）、“当月总收入”和“当月总支出”（按自然月自动计算）。
- ✍️ **记账表单 (Add Transaction Form)**：支持录入收支类型、金额、自定义分类、日期和备注等详细信息。
- 📋 **账单明细列表 (Transaction List)**：按时间倒序展示历史记录，对收入（绿色）和支出（红色）进行醒目的视觉区分，并支持一键删除。
- 💾 **本地存储持久化**：使用 `Zustand` 结合浏览器 `localStorage` 自动保存账单记录，刷新页面数据不丢失。

## 🛠 技术栈

- 框架: [Next.js (App Router)](https://nextjs.org/)
- 语言: [TypeScript](https://www.typescriptlang.org/)
- 样式: [Tailwind CSS](https://tailwindcss.com/)
- 状态管理: [Zustand](https://github.com/pmndrs/zustand)
- 图标库: [Lucide React](https://lucide.dev/)

## 🚀 快速开始

### 1. 安装依赖

确保你的系统上安装了 Node.js (推荐 v18+)。在项目根目录运行以下命令：

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

启动后，在浏览器中访问 [http://localhost:3000](http://localhost:3000) 即可预览项目。

### 3. 构建与生产环境运行

如果你想构建生产环境优化的版本，请执行：

```bash
npm run build
npm run start
```

## 📁 项目结构

- `/src/components` - 包含独立模块化的核心组件（`Dashboard`, `AddTransactionForm`, `TransactionList`）。
- `/src/store` - 包含 Zustand 状态管理库代码。
- `/src/types` - 存放 TypeScript 类型定义和接口规范。
- `/src/app` - Next.js App Router 的核心页面和布局文件。

## 🎨 暗黑模式支持

本项目遵循系统偏好设置自动适配明暗模式（使用 Tailwind 的 `dark:` 修饰符实现）。你可以通过切换操作系统的外观设置来体验。
