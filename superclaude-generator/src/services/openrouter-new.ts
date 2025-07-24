// 新的 OpenRouter API 实现，基于官方示例

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
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
      // 使用与 curl 示例相同的格式
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',
          messages: messages
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          error: errorText
        });
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      
      // 提取命令
      const commandMatch = content.match(/`([^`]+)`/);
      return commandMatch ? commandMatch[1] : content.trim();
      
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw error;
    }
  }
  
  private getSystemPrompt(): string {
    return `You are a SuperClaude command generator. Convert natural language to SuperClaude commands.

Commands: /build, /review, /analyze, /troubleshoot, /improve, /explain, /deploy, /test, etc.
Flags: --think, --uc, --c7, --seq, --magic, --pup, --validate, --plan, etc.
Personas: --persona-architect, --persona-frontend, --persona-security, etc.

Return ONLY the command in backticks, like: \`/command --flag1 --flag2\`

Examples:
"create a react website" → \`/build --init --react --magic\`
"fix a bug" → \`/troubleshoot --investigate --fix\`
"review code security" → \`/review --security --persona-security\``;
  }
}

export const openRouterService = new OpenRouterService();