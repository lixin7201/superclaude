// APICore API 实现 - 替代 OpenRouter

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{ type: string; text?: string; file?: any }>;
}

export interface APICoreResponse {
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

class APICoreService {
  private apiKey: string = 'sk-SNe5Lv6M42J1S2wGcyEMMXwaRTnihcnpsHr17eQyhSoHYFYN';
  private baseUrl = 'https://api.apicore.ai/v1/chat/completions';
  
  async generateCommand(userInput: string): Promise<string> {
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
      console.log('Sending request to APICore...');
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gemini-2.5-pro-preview-05-06',
          messages: messages,
          max_tokens: 500,
          temperature: 0.3,
          stream: false
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
      
      const data: APICoreResponse = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      
      console.log('AI response:', content);
      
      // 提取命令
      const commandMatch = content.match(/`([^`]+)`/);
      return commandMatch ? commandMatch[1] : content.trim();
      
    } catch (error) {
      console.error('APICore API error:', error);
      throw error;
    }
  }
  
  private getSystemPrompt(): string {
    return `你是 SuperClaude 命令生成专家。将自然语言转换为精确的 SuperClaude 命令。

SuperClaude 命令参考：

**开发命令：**
- /build: 创建项目/功能 (标志: --init, --feature, --tdd, --react, --api, --fullstack)
- /test: 测试 (标志: --e2e, --unit, --coverage)
- /dev-setup: 设置环境

**分析命令：**
- /review: 代码审查 (标志: --files, --quality, --security)
- /analyze: 分析 (标志: --code, --architecture, --deep)
- /troubleshoot: 调试 (标志: --investigate, --fix)
- /improve: 优化 (标志: --performance, --quality)
- /explain: 文档 (标志: --visual, --examples)

**运维命令：**
- /deploy: 部署 (标志: --env, --canary, --validate)
- /git: Git 操作
- /scan: 安全扫描

**通用标志：**
- 思考深度: --think, --think-hard, --ultrathink
- 优化: --uc (超压缩模式)
- MCP: --c7, --seq, --magic, --pup
- 质量: --validate, --strict

**角色：**
--persona-architect, --persona-frontend, --persona-backend, --persona-security, --persona-mentor

**回复格式：**
只返回反引号中的命令，如: \`/command --flag1 --flag2\`

示例：
- "创建一个React网站" → \`/build --init --react --magic\`
- "帮我修复bug" → \`/troubleshoot --investigate --fix\`
- "检查代码安全性" → \`/review --security --persona-security\`
- "部署到生产环境" → \`/deploy --env prod --validate\`
- "优化网站性能" → \`/improve --performance --persona-performance\``;
  }
}

export const apicoreService = new APICoreService();