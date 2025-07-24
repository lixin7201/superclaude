// 为编程小白准备的详细说明和使用场景

export const commandScenarios = {
  build: {
    scenarios: [
      { title: "创建新项目", example: "/build --init --react --magic", description: "从零开始创建一个React项目，包含UI组件" },
      { title: "添加新功能", example: "/build --feature \"登录系统\" --tdd", description: "为现有项目添加登录功能，同时编写测试" },
      { title: "搭建API服务", example: "/build --api --openapi", description: "创建RESTful API，自动生成文档" }
    ],
    tips: "💡 小白提示：如果你想创建网站，选择 --react 或 --fullstack；如果想做后端API，选择 --api"
  },
  
  review: {
    scenarios: [
      { title: "检查代码质量", example: "/review --files src/app.js", description: "让AI帮你检查代码是否有问题" },
      { title: "审查安全性", example: "/review --files auth.js --persona-security", description: "专门检查登录相关代码的安全性" },
      { title: "查看提交", example: "/review --commit HEAD", description: "检查最新提交的代码改动" }
    ],
    tips: "💡 小白提示：代码写完后用这个命令检查一下，可以发现潜在问题"
  },
  
  explain: {
    scenarios: [
      { title: "解释代码", example: "/explain --depth beginner", description: "用初学者能懂的方式解释代码" },
      { title: "生成文档", example: "/explain --api --examples", description: "为你的API生成使用文档和示例" },
      { title: "画架构图", example: "/explain --architecture --visual", description: "生成系统架构的可视化图表" }
    ],
    tips: "💡 小白提示：看不懂代码时就用这个命令，让AI给你解释"
  },
  
  troubleshoot: {
    scenarios: [
      { title: "调试错误", example: "/troubleshoot --investigate", description: "系统地查找和解决程序错误" },
      { title: "性能问题", example: "/troubleshoot --perf --fix", description: "找出程序运行慢的原因并修复" },
      { title: "紧急修复", example: "/troubleshoot --hotfix --prod", description: "生产环境出问题时的紧急修复" }
    ],
    tips: "💡 小白提示：程序报错或运行不正常时用这个"
  },
  
  test: {
    scenarios: [
      { title: "写单元测试", example: "/test --unit", description: "为函数编写测试用例" },
      { title: "端到端测试", example: "/test --e2e --pup", description: "模拟用户操作测试整个流程" },
      { title: "测试覆盖率", example: "/test --coverage", description: "查看测试覆盖了多少代码" }
    ],
    tips: "💡 小白提示：测试能确保代码修改后不会出问题，建议经常使用"
  },
  
  deploy: {
    scenarios: [
      { title: "部署到测试环境", example: "/deploy --env staging", description: "先部署到测试环境验证" },
      { title: "生产环境部署", example: "/deploy --env prod --canary", description: "渐进式部署，先部署一小部分" },
      { title: "回滚部署", example: "/deploy --rollback --env prod", description: "出问题时快速恢复到之前版本" }
    ],
    tips: "💡 小白提示：部署就是把你的网站放到服务器上让别人访问"
  },
  
  improve: {
    scenarios: [
      { title: "优化性能", example: "/improve --performance", description: "让程序运行更快" },
      { title: "提升代码质量", example: "/improve --quality --iterate", description: "逐步改进代码结构" },
      { title: "无障碍优化", example: "/improve --accessibility", description: "让残障人士也能使用你的网站" }
    ],
    tips: "💡 小白提示：代码能运行后，用这个命令让它变得更好"
  },
  
  git: {
    scenarios: [
      { title: "保存进度", example: "/git --checkpoint \"完成登录功能\"", description: "创建一个恢复点，以后可以回到这里" },
      { title: "提交代码", example: "/git --commit --validate", description: "保存代码修改并检查是否有问题" },
      { title: "查看历史", example: "/git --history", description: "查看之前的修改记录" }
    ],
    tips: "💡 小白提示：Git帮你保存代码历史，写错了可以恢复"
  }
};

export const flagExplanations = {
  // 思考深度标志
  '--think': {
    whenToUse: "处理多个文件相关的普通任务",
    example: "修改一个功能涉及3-4个文件时",
    effect: "AI会分析相关文件之间的关系",
    beginnerTip: "一般任务用这个就够了"
  },
  '--think-hard': {
    whenToUse: "需要理解整体架构的复杂任务",
    example: "重构整个模块、设计新系统",
    effect: "AI会深入分析系统架构（约10K tokens）",
    beginnerTip: "大改动或设计新功能时使用"
  },
  '--ultrathink': {
    whenToUse: "处理极其复杂的关键系统问题",
    example: "处理核心算法、复杂bug、系统性能优化",
    effect: "AI会进行最深层次的分析（约32K tokens）",
    beginnerTip: "遇到特别难的问题才用，会消耗较多资源"
  },
  
  // 压缩模式
  '--uc': {
    whenToUse: "需要处理大量代码或长时间对话",
    example: "分析整个项目、长时间编程会话",
    effect: "大幅减少token使用，回复更简洁",
    beginnerTip: "想省钱或处理大项目时开启"
  },
  
  // MCP服务器
  '--c7': {
    whenToUse: "需要查找文档或API参考",
    example: "不记得某个库的用法",
    effect: "启用文档查询功能",
    beginnerTip: "忘记API怎么用时很有帮助"
  },
  '--seq': {
    whenToUse: "需要逻辑推理和分析",
    example: "调试复杂逻辑问题",
    effect: "启用顺序思考分析",
    beginnerTip: "处理逻辑复杂的问题时使用"
  },
  '--magic': {
    whenToUse: "需要创建UI组件",
    example: "快速生成按钮、表单等界面",
    effect: "AI生成漂亮的UI组件",
    beginnerTip: "做前端界面时的神器"
  },
  '--pup': {
    whenToUse: "需要自动化浏览器操作",
    example: "自动化测试、网页截图",
    effect: "启用浏览器自动化",
    beginnerTip: "测试网页或爬虫时使用"
  },
  
  // 执行控制
  '--plan': {
    whenToUse: "想先看看AI打算怎么做",
    example: "执行重要操作前",
    effect: "显示详细执行计划",
    beginnerTip: "不确定时先看计划再执行"
  },
  '--dry-run': {
    whenToUse: "想预览但不真正执行",
    example: "删除文件前先看看会删什么",
    effect: "只显示会做什么，不真正执行",
    beginnerTip: "危险操作前先用这个预览"
  },
  '--interactive': {
    whenToUse: "想要一步步确认",
    example: "重要操作需要人工确认",
    effect: "每一步都会询问你",
    beginnerTip: "新手推荐，让你掌控每一步"
  },
  
  // 质量控制
  '--validate': {
    whenToUse: "确保操作安全",
    example: "部署前检查",
    effect: "增强安全检查",
    beginnerTip: "重要操作都建议加上"
  },
  '--strict': {
    whenToUse: "绝对不允许出错",
    example: "金融、医疗相关代码",
    effect: "零容错模式",
    beginnerTip: "关键代码使用"
  }
};

export const personaGuide = {
  architect: {
    bestFor: "设计系统架构、技术选型",
    example: "要做一个电商网站，不知道怎么设计",
    tip: "大项目开始前找他"
  },
  frontend: {
    bestFor: "做网页界面、用户体验",
    example: "想让网站更好看、更好用",
    tip: "做前端界面时选他"
  },
  backend: {
    bestFor: "服务器、数据库、API",
    example: "处理用户数据、搭建服务器",
    tip: "后端逻辑找他"
  },
  security: {
    bestFor: "安全检查、防黑客",
    example: "担心网站被攻击",
    tip: "涉及用户隐私时必选"
  },
  mentor: {
    bestFor: "学习、理解代码",
    example: "看不懂代码，需要解释",
    tip: "新手的最佳选择"
  },
  qa: {
    bestFor: "测试、找bug",
    example: "确保代码没问题",
    tip: "上线前找他检查"
  },
  performance: {
    bestFor: "优化速度、省资源",
    example: "网站加载太慢",
    tip: "性能问题找他"
  }
};

// 常见场景的预设组合
export const presetTemplates = [
  {
    id: 'beginner-web',
    name: "🌱 初学者创建网站",
    description: "适合第一次做网站的新手",
    command: "/build",
    flags: ["--init", "--react", "--magic", "--interactive", "--persona-mentor"],
    explanation: "创建React网站 + UI组件生成 + 交互式引导 + 导师指导"
  },
  {
    id: 'fix-error',
    name: "🐛 修复程序错误",
    description: "程序报错了不知道怎么办",
    command: "/troubleshoot",
    flags: ["--investigate", "--fix", "--think", "--persona-analyzer"],
    explanation: "系统调查 + 自动修复 + 深度分析 + 分析专家"
  },
  {
    id: 'code-review',
    name: "👀 检查代码质量",
    description: "写完代码想检查有没有问题",
    command: "/review",
    flags: ["--quality", "--security", "--evidence", "--persona-qa"],
    explanation: "质量检查 + 安全检查 + 证据支持 + QA专家"
  },
  {
    id: 'deploy-safe',
    name: "🚀 安全部署上线",
    description: "把网站部署到服务器",
    command: "/deploy",
    flags: ["--env staging", "--validate", "--plan", "--dry-run"],
    explanation: "先部署测试环境 + 验证 + 显示计划 + 预览"
  },
  {
    id: 'learn-code',
    name: "📚 学习理解代码",
    description: "看不懂代码想要解释",
    command: "/explain",
    flags: ["--depth beginner", "--visual", "--examples", "--persona-mentor"],
    explanation: "初学者深度 + 可视化 + 示例 + 导师模式"
  },
  {
    id: 'optimize-performance',
    name: "⚡ 优化网站性能",
    description: "网站运行太慢想优化",
    command: "/improve",
    flags: ["--performance", "--think-hard", "--persona-performance", "--pup"],
    explanation: "性能优化 + 深度分析 + 性能专家 + 浏览器测试"
  },
  {
    id: 'add-feature',
    name: "✨ 添加新功能",
    description: "给现有项目加新功能",
    command: "/build",
    flags: ["--feature", "--tdd", "--validate", "--think"],
    explanation: "功能开发 + 测试驱动 + 验证 + 适度分析"
  },
  {
    id: 'security-check',
    name: "🔒 安全检查",
    description: "检查代码是否安全",
    command: "/scan",
    flags: ["--security", "--owasp", "--strict", "--persona-security"],
    explanation: "安全扫描 + OWASP标准 + 严格模式 + 安全专家"
  },
  {
    id: 'write-tests',
    name: "🧪 编写测试",
    description: "为代码编写测试用例",
    command: "/test",
    flags: ["--unit", "--coverage", "--tdd", "--persona-qa"],
    explanation: "单元测试 + 覆盖率 + 测试驱动 + QA专家"
  },
  {
    id: 'quick-prototype',
    name: "🎯 快速原型",
    description: "快速做个演示版本",
    command: "/build",
    flags: ["--init", "--uc", "--magic", "--plan"],
    explanation: "初始化 + 压缩模式(省钱) + UI生成 + 显示计划"
  }
];