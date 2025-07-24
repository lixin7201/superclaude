// 示例命令的中文解释

export const exampleExplanations: Record<string, string> = {
  // /build 命令示例
  '/build --init --react --magic --tdd': '创建一个新的 React 项目，包含 UI 组件生成器，并使用测试驱动开发',
  '/build --feature "auth system" --tdd': '为现有项目添加"认证系统"功能，同时编写测试',
  '/build --api --openapi --seq': '创建 API 项目，自动生成 OpenAPI 文档，使用顺序思考分析',
  
  // /review 命令示例
  '/review --files src/auth.ts --persona-security': '检查 auth.ts 文件，使用安全专家角色重点关注安全问题',
  '/review --commit HEAD --quality --evidence': '检查最新提交的代码质量，并提供证据支持',
  '/review --pr 123 --all --interactive': '审查第 123 号 PR，检查所有方面，交互式进行',
  
  // /analyze 命令示例
  '/analyze --code --architecture --seq': '分析代码和架构，使用顺序思考工具',
  '/analyze --profile --deep --persona-performance': '深度性能分析，使用性能专家角色',
  
  // /troubleshoot 命令示例
  '/troubleshoot --prod --five-whys --seq': '生产环境问题排查，使用五个为什么方法和顺序思考',
  '/troubleshoot --perf --fix --pup': '性能问题排查并修复，使用 Puppeteer 浏览器自动化',
  
  // /improve 命令示例
  '/improve --quality --iterate --threshold 95%': '迭代提升代码质量，目标达到 95% 的质量阈值',
  '/improve --performance --cache --pup': '优化性能，重点优化缓存，使用 Puppeteer 测试',
  
  // /explain 命令示例
  '/explain --depth expert --visual --seq': '专家级深度解释，包含可视化图表，使用顺序思考',
  '/explain --api --examples --c7': '解释 API，提供使用示例，使用 Context7 文档查询',
  
  // /deploy 命令示例
  '/deploy --env prod --canary --monitor': '部署到生产环境，使用金丝雀发布，启用监控',
  '/deploy --rollback --env prod': '回滚生产环境到上一个版本',
  
  // /migrate 命令示例
  '/migrate --database --backup --validate': '数据库迁移，先备份，执行验证',
  '/migrate --code --dry-run': '代码迁移，只预览不执行',
  
  // /scan 命令示例
  '/scan --security --owasp --deps': '安全扫描，检查 OWASP 标准和依赖项',
  '/scan --compliance --gdpr --strict': '合规性扫描，检查 GDPR 要求，严格模式',
  
  // /estimate 命令示例
  '/estimate --detailed --complexity --risk': '详细估算，包含复杂度分析和风险评估',
  '/estimate --agile --story-points': '敏捷估算，使用故事点',
  
  // /cleanup 命令示例
  '/cleanup --all --dry-run': '清理所有内容，只预览不执行',
  '/cleanup --code --deps --validate': '清理代码和依赖，执行验证',
  
  // /git 命令示例
  '/git --checkpoint "before refactor"': '创建检查点"重构前"，方便以后恢复',
  '/git --commit --validate --test': '提交代码，先验证并运行测试',
  
  // /design 命令示例
  '/design --api --ddd --openapi --seq': '设计 API，使用领域驱动设计，生成 OpenAPI 规范',
  '/design --microservices --event-driven': '设计微服务架构，使用事件驱动模式',
  
  // /spawn 命令示例
  '/spawn --task "frontend tests" --parallel': '创建专门处理"前端测试"的并行任务',
  '/spawn --collaborative --sync': '创建协作任务，保持同步',
  
  // /document 命令示例
  '/document --api --interactive --examples': '创建 API 文档，交互式，包含示例',
  '/document --user --visual --multilingual': '创建用户文档，包含图表，多语言支持',
  
  // /load 命令示例
  '/load --depth deep --patterns --seq': '深度加载项目，分析模式，使用顺序思考',
  '/load --structure --health --standards': '加载项目结构，检查健康状态和标准',
  
  // /task 命令示例
  '/task:create "Implement OAuth 2.0 authentication system"': '创建任务：实现 OAuth 2.0 认证系统',
  '/task:status oauth-task-id': '查看 oauth-task-id 任务的状态',
  '/task:resume oauth-task-id': '恢复 oauth-task-id 任务的执行',
  
  // /test 命令示例
  '/test --coverage --e2e --pup': '运行端到端测试，生成覆盖率报告，使用 Puppeteer',
  '/test --mutation --strict': '运行变异测试，严格模式',
  
  // /dev-setup 命令示例
  '/dev-setup --install --ci --monitor': '安装开发环境，配置 CI/CD，设置监控',
  '/dev-setup --team --standards --docs': '配置团队开发环境，设定标准，生成文档'
};

// 标志的中文解释
export const flagChineseExplanations: Record<string, string> = {
  // 通用标志
  '--think': '深度思考（多文件分析）',
  '--think-hard': '架构级深度思考',
  '--ultrathink': '最深层次思考（关键问题）',
  '--uc': '压缩模式（节省 token）',
  '--c7': 'Context7 文档查询',
  '--seq': '顺序思考分析',
  '--magic': 'Magic UI 组件生成',
  '--pup': 'Puppeteer 浏览器自动化',
  '--all-mcp': '启用所有 MCP 服务器',
  '--no-mcp': '禁用所有 MCP 服务器',
  '--introspect': '自省分析模式',
  '--plan': '显示执行计划',
  '--dry-run': '预览（不执行）',
  '--watch': '持续监控',
  '--interactive': '交互式操作',
  '--force': '强制执行（慎用）',
  '--validate': '增强验证',
  '--security': '安全检查',
  '--coverage': '覆盖率分析',
  '--strict': '严格模式',
  
  // 命令专用标志
  '--init': '初始化新项目',
  '--feature': '添加新功能',
  '--tdd': '测试驱动开发',
  '--react': 'React 框架',
  '--api': 'API 开发',
  '--fullstack': '全栈开发',
  '--mobile': '移动端开发',
  '--cli': '命令行工具',
  '--files': '指定文件',
  '--commit': '指定提交',
  '--pr': '拉取请求',
  '--quality': '质量检查',
  '--evidence': '提供证据',
  '--fix': '自动修复',
  '--summary': '生成摘要',
  '--code': '代码分析',
  '--architecture': '架构分析',
  '--profile': '性能分析',
  '--deps': '依赖分析',
  '--surface': '表层分析',
  '--deep': '深度分析',
  '--forensic': '取证分析',
  '--investigate': '调查问题',
  '--five-whys': '五个为什么方法',
  '--prod': '生产环境',
  '--perf': '性能相关',
  '--hotfix': '热修复',
  '--rollback': '回滚',
  '--performance': '性能优化',
  '--accessibility': '无障碍优化',
  '--iterate': '迭代改进',
  '--threshold': '阈值设定',
  '--refactor': '重构代码',
  '--modernize': '现代化升级',
  '--depth': '深度级别',
  '--visual': '可视化',
  '--examples': '包含示例',
  '--tutorial': '教程模式',
  '--reference': '参考文档',
  '--env': '环境设置',
  '--canary': '金丝雀发布',
  '--blue-green': '蓝绿部署',
  '--rolling': '滚动更新',
  '--checkpoint': '创建检查点',
  '--monitor': '启用监控',
  '--database': '数据库相关',
  '--config': '配置相关',
  '--dependencies': '依赖项',
  '--backup': '备份',
  '--owasp': 'OWASP 标准',
  '--secrets': '密钥检查',
  '--compliance': '合规性',
  '--automated': '自动化',
  '--detailed': '详细估算',
  '--rough': '粗略估算',
  '--worst-case': '最坏情况',
  '--agile': '敏捷方法',
  '--complexity': '复杂度',
  '--resources': '资源需求',
  '--timeline': '时间线',
  '--risk': '风险评估',
  '--all': '全部',
  '--aggressive': '激进模式',
  '--conservative': '保守模式',
  '--status': '状态',
  '--branch': '分支操作',
  '--sync': '同步',
  '--merge': '合并',
  '--history': '历史记录',
  '--pre-commit': '提交前检查',
  '--ddd': '领域驱动设计',
  '--microservices': '微服务',
  '--event-driven': '事件驱动',
  '--openapi': 'OpenAPI 规范',
  '--graphql': 'GraphQL',
  '--bounded-context': '限界上下文',
  '--integration': '集成',
  '--task': '任务',
  '--parallel': '并行执行',
  '--specialized': '专门化',
  '--collaborative': '协作式',
  '--user': '用户文档',
  '--technical': '技术文档',
  '--markdown': 'Markdown 格式',
  '--multilingual': '多语言',
  '--maintain': '维护',
  '--context': '上下文',
  '--patterns': '模式',
  '--relationships': '关系',
  '--structure': '结构',
  '--health': '健康检查',
  '--standards': '标准',
  ':create': '创建',
  ':status': '状态',
  ':resume': '恢复',
  ':update': '更新',
  ':complete': '完成',
  '--install': '安装',
  '--ci': 'CI/CD 配置',
  '--docker': 'Docker 配置',
  '--testing': '测试配置',
  '--team': '团队配置',
  '--docs': '文档',
  '--e2e': '端到端测试',
  '--integration': '集成测试',
  '--unit': '单元测试',
  '--mutation': '变异测试',
  '--story-points': '故事点'
};