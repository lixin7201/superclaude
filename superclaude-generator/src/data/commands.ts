import { Command, UniversalFlag, Persona, MCPServer } from '@/types';

export const commands: Command[] = [
  // Development Commands
  {
    id: 'build',
    name: '/build',
    description: 'Universal Project Builder - Build projects, features, and components using modern stack templates',
    category: 'Development',
    flags: ['--init', '--feature', '--tdd', '--react', '--api', '--fullstack', '--mobile', '--cli'],
    examples: [
      '/build --init --react --magic --tdd',
      '/build --feature "auth system" --tdd',
      '/build --api --openapi --seq'
    ]
  },
  {
    id: 'dev-setup',
    name: '/dev-setup',
    description: 'Development Environment - Configure professional development environments with CI/CD and monitoring',
    category: 'Development',
    flags: ['--install', '--ci', '--monitor', '--docker', '--testing', '--team', '--standards'],
    examples: [
      '/dev-setup --install --ci --monitor',
      '/dev-setup --team --standards --docs'
    ]
  },
  {
    id: 'test',
    name: '/test',
    description: 'Comprehensive Testing Framework - Create, run, and maintain testing strategies across the stack',
    category: 'Development',
    flags: ['--e2e', '--integration', '--unit', '--visual', '--mutation', '--performance', '--accessibility', '--parallel'],
    examples: [
      '/test --coverage --e2e --pup',
      '/test --mutation --strict'
    ]
  },
  // Analysis & Improvement Commands
  {
    id: 'review',
    name: '/review',
    description: 'AI-Powered Code Review - Comprehensive code review and quality analysis with evidence-based recommendations',
    category: 'Analysis',
    flags: ['--files', '--commit', '--pr', '--quality', '--evidence', '--fix', '--summary'],
    examples: [
      '/review --files src/auth.ts --persona-security',
      '/review --commit HEAD --quality --evidence',
      '/review --pr 123 --all --interactive'
    ]
  },
  {
    id: 'analyze',
    name: '/analyze',
    description: 'Multi-Dimensional Analysis - Comprehensive analysis of code, architecture, performance, and security',
    category: 'Analysis',
    flags: ['--code', '--architecture', '--profile', '--deps', '--surface', '--deep', '--forensic'],
    examples: [
      '/analyze --code --architecture --seq',
      '/analyze --profile --deep --persona-performance'
    ]
  },
  {
    id: 'troubleshoot',
    name: '/troubleshoot',
    description: 'Professional Debugging - Systematic debugging and issue resolution',
    category: 'Analysis',
    flags: ['--investigate', '--five-whys', '--prod', '--perf', '--fix', '--hotfix', '--rollback'],
    examples: [
      '/troubleshoot --prod --five-whys --seq',
      '/troubleshoot --perf --fix --pup'
    ]
  },
  {
    id: 'improve',
    name: '/improve',
    description: 'Enhancement & Optimization - Evidence-based improvements with measurable outcomes',
    category: 'Analysis',
    flags: ['--quality', '--performance', '--accessibility', '--iterate', '--threshold', '--refactor', '--modernize'],
    examples: [
      '/improve --quality --iterate --threshold 95%',
      '/improve --performance --cache --pup'
    ]
  },
  {
    id: 'explain',
    name: '/explain',
    description: 'Technical Documentation - Generate comprehensive explanations and documentation',
    category: 'Analysis',
    flags: ['--depth', '--visual', '--examples', '--api', '--architecture', '--tutorial', '--reference'],
    examples: [
      '/explain --depth expert --visual --seq',
      '/explain --api --examples --c7'
    ]
  },
  // Operations Commands
  {
    id: 'deploy',
    name: '/deploy',
    description: 'Application Deployment - Safe deployment with rollback capabilities',
    category: 'Operations',
    flags: ['--env', '--canary', '--blue-green', '--rolling', '--checkpoint', '--rollback', '--monitor'],
    examples: [
      '/deploy --env prod --canary --monitor',
      '/deploy --rollback --env prod'
    ]
  },
  {
    id: 'migrate',
    name: '/migrate',
    description: 'Database & Code Migration - Safe migrations with rollback capabilities',
    category: 'Operations',
    flags: ['--database', '--code', '--config', '--dependencies', '--backup', '--rollback', '--validate'],
    examples: [
      '/migrate --database --backup --validate',
      '/migrate --code --dry-run'
    ]
  },
  {
    id: 'scan',
    name: '/scan',
    description: 'Security & Validation - Comprehensive security auditing and compliance',
    category: 'Operations',
    flags: ['--owasp', '--secrets', '--compliance', '--quality', '--automated'],
    examples: [
      '/scan --security --owasp --deps',
      '/scan --compliance --gdpr --strict'
    ]
  },
  {
    id: 'estimate',
    name: '/estimate',
    description: 'Project Estimation - Professional estimation with risk assessment',
    category: 'Operations',
    flags: ['--detailed', '--rough', '--worst-case', '--agile', '--complexity', '--resources', '--timeline', '--risk'],
    examples: [
      '/estimate --detailed --complexity --risk',
      '/estimate --agile --story-points'
    ]
  },
  {
    id: 'cleanup',
    name: '/cleanup',
    description: 'Project Maintenance - Professional cleanup with safety validations',
    category: 'Operations',
    flags: ['--code', '--files', '--deps', '--git', '--all', '--aggressive', '--conservative'],
    examples: [
      '/cleanup --all --dry-run',
      '/cleanup --code --deps --validate'
    ]
  },
  {
    id: 'git',
    name: '/git',
    description: 'Git Workflow Management - Professional Git operations with safety features',
    category: 'Operations',
    flags: ['--status', '--commit', '--branch', '--sync', '--checkpoint', '--merge', '--history', '--pre-commit'],
    examples: [
      '/git --checkpoint "before refactor"',
      '/git --commit --validate --test'
    ]
  },
  // Design & Architecture Commands
  {
    id: 'design',
    name: '/design',
    description: 'System Architecture - Professional system design with specifications',
    category: 'Design',
    flags: ['--api', '--ddd', '--microservices', '--event-driven', '--openapi', '--graphql', '--bounded-context', '--integration'],
    examples: [
      '/design --api --ddd --openapi --seq',
      '/design --microservices --event-driven'
    ]
  },
  // Workflow Commands
  {
    id: 'spawn',
    name: '/spawn',
    description: 'Specialized Agents - Spawn focused agents for parallel tasks',
    category: 'Workflow',
    flags: ['--task', '--parallel', '--specialized', '--collaborative', '--sync', '--merge'],
    examples: [
      '/spawn --task "frontend tests" --parallel',
      '/spawn --collaborative --sync'
    ]
  },
  {
    id: 'document',
    name: '/document',
    description: 'Documentation Creation - Professional documentation in multiple formats',
    category: 'Workflow',
    flags: ['--user', '--technical', '--markdown', '--interactive', '--multilingual', '--maintain'],
    examples: [
      '/document --api --interactive --examples',
      '/document --user --visual --multilingual'
    ]
  },
  {
    id: 'load',
    name: '/load',
    description: 'Project Context Loading - Load and analyze project context',
    category: 'Workflow',
    flags: ['--depth', '--context', '--patterns', '--relationships', '--structure', '--health', '--standards'],
    examples: [
      '/load --depth deep --patterns --seq',
      '/load --structure --health --standards'
    ]
  },
  {
    id: 'task',
    name: '/task',
    description: 'Task Management - Complex feature management across sessions with automatic breakdown and recovery',
    category: 'Workflow',
    flags: [':create', ':status', ':resume', ':update', ':complete'],
    examples: [
      '/task:create "Implement OAuth 2.0 authentication system"',
      '/task:status oauth-task-id',
      '/task:resume oauth-task-id'
    ]
  }
];

export const universalFlags: UniversalFlag[] = [
  // Thinking Depth Control
  { flag: '--think', description: 'Multi-file analysis with expanded context (~4K tokens)', category: 'Thinking' },
  { flag: '--think-hard', description: 'Architecture-level depth analysis (~10K tokens)', category: 'Thinking' },
  { flag: '--ultrathink', description: 'Critical system analysis with maximum depth (~32K tokens)', category: 'Thinking' },
  
  // Token Optimization
  { flag: '--uc', alias: '--ultracompressed', description: 'Activate UltraCompressed mode (huge token reduction)', category: 'Token' },
  
  // MCP Server Control
  { flag: '--c7', description: 'Enable Context7 documentation lookup', category: 'MCP' },
  { flag: '--seq', description: 'Enable Sequential thinking analysis', category: 'MCP' },
  { flag: '--magic', description: 'Enable Magic UI component generation', category: 'MCP' },
  { flag: '--pup', description: 'Enable Puppeteer browser automation', category: 'MCP' },
  { flag: '--all-mcp', description: 'Enable all MCP servers for maximum capability', category: 'MCP' },
  { flag: '--no-mcp', description: 'Disable all MCP servers (native tools only)', category: 'MCP' },
  
  // Analysis & Introspection
  { flag: '--introspect', description: 'Enable self-aware analysis with cognitive transparency', category: 'Analysis' },
  
  // Planning & Execution
  { flag: '--plan', description: 'Show detailed execution plan before running', category: 'Planning' },
  { flag: '--dry-run', description: 'Preview changes without execution', category: 'Planning' },
  { flag: '--watch', description: 'Continuous monitoring with real-time feedback', category: 'Planning' },
  { flag: '--interactive', description: 'Step-by-step guided process', category: 'Planning' },
  { flag: '--force', description: 'Override safety checks (use with caution)', category: 'Planning' },
  
  // Quality & Validation
  { flag: '--validate', description: 'Enhanced pre-execution safety checks', category: 'Quality' },
  { flag: '--security', description: 'Security-focused analysis and validation', category: 'Quality' },
  { flag: '--coverage', description: 'Generate comprehensive coverage analysis', category: 'Quality' },
  { flag: '--strict', description: 'Zero-tolerance mode with enhanced validation', category: 'Quality' }
];

export const personas: Persona[] = [
  {
    id: 'architect',
    flag: '--persona-architect',
    name: 'System Architect',
    expertise: 'Systems thinking, scalability, patterns',
    bestFor: 'Architecture decisions, system design',
    description: 'Expert in designing scalable, maintainable systems with deep understanding of architectural patterns'
  },
  {
    id: 'frontend',
    flag: '--persona-frontend',
    name: 'Frontend Expert',
    expertise: 'UI/UX obsessed, accessibility-first',
    bestFor: 'User interfaces, component design',
    description: 'Specialized in creating beautiful, accessible, and performant user interfaces'
  },
  {
    id: 'backend',
    flag: '--persona-backend',
    name: 'Backend Expert',
    expertise: 'APIs, databases, reliability',
    bestFor: 'Server architecture, data modeling',
    description: 'Expert in building robust, scalable server-side applications and APIs'
  },
  {
    id: 'analyzer',
    flag: '--persona-analyzer',
    name: 'Code Analyzer',
    expertise: 'Root cause analysis, evidence-based',
    bestFor: 'Complex debugging, investigations',
    description: 'Specializes in systematic analysis and evidence-based problem solving'
  },
  {
    id: 'security',
    flag: '--persona-security',
    name: 'Security Expert',
    expertise: 'Threat modeling, zero-trust, OWASP',
    bestFor: 'Security audits, vulnerability assessment',
    description: 'Expert in security best practices, threat modeling, and vulnerability assessment'
  },
  {
    id: 'mentor',
    flag: '--persona-mentor',
    name: 'Code Mentor',
    expertise: 'Teaching, guided learning, clarity',
    bestFor: 'Documentation, knowledge transfer',
    description: 'Focused on clear explanations and educational content for developers'
  },
  {
    id: 'refactorer',
    flag: '--persona-refactorer',
    name: 'Code Refactorer',
    expertise: 'Code quality, maintainability',
    bestFor: 'Code cleanup, technical debt',
    description: 'Specializes in improving code quality and reducing technical debt'
  },
  {
    id: 'performance',
    flag: '--persona-performance',
    name: 'Performance Expert',
    expertise: 'Optimization, profiling, efficiency',
    bestFor: 'Performance tuning, bottlenecks',
    description: 'Expert in identifying and resolving performance bottlenecks'
  },
  {
    id: 'qa',
    flag: '--persona-qa',
    name: 'QA Expert',
    expertise: 'Testing, edge cases, validation',
    bestFor: 'Quality assurance, test coverage',
    description: 'Specializes in comprehensive testing strategies and quality assurance'
  }
];

export const mcpServers: MCPServer[] = [
  {
    id: 'c7',
    flag: '--c7',
    name: 'Context7',
    description: 'Documentation lookup and context management'
  },
  {
    id: 'seq',
    flag: '--seq',
    name: 'Sequential',
    description: 'Sequential thinking and reasoning analysis'
  },
  {
    id: 'magic',
    flag: '--magic',
    name: 'Magic UI',
    description: 'AI-powered UI component generation'
  },
  {
    id: 'pup',
    flag: '--pup',
    name: 'Puppeteer',
    description: 'Browser automation and testing'
  }
];