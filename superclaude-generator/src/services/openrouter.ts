// OpenRouter API service for Gemini integration

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class OpenRouterService {
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
  constructor() {
    // 直接内置 API key（仅供个人使用）
    this.apiKey = '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';
  }
  
  async generateCommand(userInput: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API key not configured');
    }
    
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: this.getSystemPrompt()
      },
      {
        role: 'user',
        content: userInput
      }
    ];
    
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'SuperClaude Command Generator'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',  // Using the free Gemini 2.0 Flash model
          messages,
          temperature: 0.3,  // Lower temperature for more consistent outputs
          max_tokens: 500,
          top_p: 0.9,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
      }
      
      const data: OpenRouterResponse = await response.json();
      const generatedCommand = data.choices[0]?.message?.content || '';
      
      // Extract the command from the response (it might include explanation)
      const commandMatch = generatedCommand.match(/`([^`]+)`/);
      return commandMatch ? commandMatch[1] : generatedCommand.trim();
      
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw error;
    }
  }
  
  private getSystemPrompt(): string {
    return `You are a SuperClaude command generator expert. Your task is to convert natural language requests into precise SuperClaude commands.

SuperClaude Commands Reference:

**Development Commands:**
- /build: Create projects/features (flags: --init, --feature, --tdd, --react, --api, --fullstack, --mobile, --cli)
- /dev-setup: Setup dev environment (flags: --install, --ci, --monitor, --docker, --testing, --team, --standards)
- /test: Testing (flags: --e2e, --integration, --unit, --visual, --mutation, --performance, --accessibility, --parallel)

**Analysis Commands:**
- /review: Code review (flags: --files, --commit, --pr, --quality, --evidence, --fix, --summary)
- /analyze: Analysis (flags: --code, --architecture, --profile, --deps, --surface, --deep, --forensic)
- /troubleshoot: Debug issues (flags: --investigate, --five-whys, --prod, --perf, --fix, --hotfix, --rollback)
- /improve: Optimize (flags: --quality, --performance, --accessibility, --iterate, --threshold, --refactor, --modernize)
- /explain: Documentation (flags: --depth, --visual, --examples, --api, --architecture, --tutorial, --reference)

**Operations Commands:**
- /deploy: Deployment (flags: --env, --canary, --blue-green, --rolling, --checkpoint, --rollback, --monitor)
- /migrate: Migration (flags: --database, --code, --config, --dependencies, --backup, --rollback, --validate)
- /scan: Security scan (flags: --owasp, --secrets, --compliance, --quality, --automated)
- /estimate: Project estimation (flags: --detailed, --rough, --worst-case, --agile, --complexity, --resources, --timeline, --risk)
- /cleanup: Maintenance (flags: --code, --files, --deps, --git, --all, --aggressive, --conservative)
- /git: Git operations (flags: --status, --commit, --branch, --sync, --checkpoint, --merge, --history, --pre-commit)

**Design Commands:**
- /design: System design (flags: --api, --ddd, --microservices, --event-driven, --openapi, --graphql, --bounded-context, --integration)

**Workflow Commands:**
- /spawn: Spawn agents (flags: --task, --parallel, --specialized, --collaborative, --sync, --merge)
- /document: Create docs (flags: --user, --technical, --markdown, --interactive, --multilingual, --maintain)
- /load: Load project (flags: --depth, --context, --patterns, --relationships, --structure, --health, --standards)
- /task: Task management (flags: :create, :status, :resume, :update, :complete)

**Universal Flags (work with all commands):**
- Thinking: --think (multi-file), --think-hard (architecture), --ultrathink (critical)
- Token optimization: --uc or --ultracompressed
- MCP servers: --c7 (docs), --seq (reasoning), --magic (UI), --pup (browser), --all-mcp, --no-mcp
- Analysis: --introspect
- Planning: --plan, --dry-run, --watch, --interactive, --force
- Quality: --validate, --security, --coverage, --strict

**Personas (cognitive roles):**
--persona-architect, --persona-frontend, --persona-backend, --persona-analyzer, --persona-security, --persona-mentor, --persona-refactorer, --persona-performance, --persona-qa

**Response Format:**
Return ONLY the command in backticks, like: \`/command --flag1 --flag2\`

Examples:
- "create a react website" → \`/build --init --react --magic\`
- "help me fix a bug" → \`/troubleshoot --investigate --fix\`
- "review my code for security" → \`/review --security --persona-security\`
- "deploy to production safely" → \`/deploy --env prod --canary --validate\`
- "make my code faster" → \`/improve --performance --persona-performance\``;
  }
}

export const openRouterService = new OpenRouterService();