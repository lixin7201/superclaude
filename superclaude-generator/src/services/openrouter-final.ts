// OpenRouter API 最终实现 - 包含所有必需的 headers

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
}

class OpenRouterService {
  private apiKey: string = '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';
  private baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
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
      console.log('Sending request to OpenRouter...');
      
      // OpenRouter 需要这些 headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'https://superclaude-generator.vercel.app', // 必需
        'X-Title': 'SuperClaude Generator' // 可选但推荐
      };
      
      // 如果在浏览器环境，使用实际的 URL
      if (typeof window !== 'undefined') {
        headers['HTTP-Referer'] = window.location.origin;
      }
      
      console.log('Request headers:', headers);
      
      const requestBody = {
        model: 'google/gemini-2.0-flash-exp:free',
        messages: messages,
        max_tokens: 500,
        temperature: 0.3
      };
      
      console.log('Request body:', requestBody);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
      });
      
      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response text:', responseText);
      
      if (!response.ok) {
        // 详细的错误信息
        console.error('API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: responseText
        });
        
        // 尝试解析错误信息
        try {
          const errorData = JSON.parse(responseText);
          const errorMessage = errorData.error?.message || errorData.message || responseText;
          throw new Error(`API request failed: ${response.status} - ${errorMessage}`);
        } catch (e) {
          throw new Error(`API request failed: ${response.status} - ${responseText}`);
        }
      }
      
      const data: OpenRouterResponse = JSON.parse(responseText);
      const content = data.choices?.[0]?.message?.content || '';
      
      console.log('AI response:', content);
      
      // 提取命令
      const commandMatch = content.match(/`([^`]+)`/);
      return commandMatch ? commandMatch[1] : content.trim();
      
    } catch (error) {
      console.error('OpenRouter API error:', error);
      
      // 如果是网络错误，提供更详细的信息
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('网络连接失败，请检查网络或稍后重试');
      }
      
      throw error;
    }
  }
  
  // 测试 API 连接
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://superclaude-generator.vercel.app',
          'X-Title': 'SuperClaude Generator'
        }
      });
      
      console.log('Test connection response:', response.status);
      return response.ok;
    } catch (error) {
      console.error('Test connection error:', error);
      return false;
    }
  }
  
  private getSystemPrompt(): string {
    return `You are a SuperClaude command generator expert. Your task is to convert natural language requests into precise SuperClaude commands.

SuperClaude Commands Reference:

**Development Commands:**
- /build: Create projects/features (flags: --init, --feature, --tdd, --react, --api, --fullstack)
- /test: Testing (flags: --e2e, --unit, --coverage)
- /dev-setup: Setup environment

**Analysis Commands:**
- /review: Code review (flags: --files, --quality, --security)
- /analyze: Analysis (flags: --code, --architecture, --deep)
- /troubleshoot: Debug (flags: --investigate, --fix)
- /improve: Optimize (flags: --performance, --quality)
- /explain: Documentation (flags: --visual, --examples)

**Operations Commands:**
- /deploy: Deployment (flags: --env, --canary, --validate)
- /git: Git operations
- /scan: Security scan

**Universal Flags:**
- Thinking: --think, --think-hard, --ultrathink
- Optimization: --uc (ultracompressed)
- MCP: --c7, --seq, --magic, --pup
- Quality: --validate, --strict

**Personas:**
--persona-architect, --persona-frontend, --persona-backend, --persona-security, --persona-mentor

**Response Format:**
Return ONLY the command in backticks, like: \`/command --flag1 --flag2\`

Examples:
- "创建一个React网站" → \`/build --init --react --magic\`
- "帮我修复bug" → \`/troubleshoot --investigate --fix\`
- "检查代码安全性" → \`/review --security --persona-security\`
- "部署到生产环境" → \`/deploy --env prod --validate\``;
  }
}

export const openRouterService = new OpenRouterService();