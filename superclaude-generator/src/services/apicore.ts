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
      
      console.log('AI raw response:', content);
      
      // 提取命令 - 尝试多种格式
      // 1. 首先尝试反引号格式 `command`
      const backtickMatch = content.match(/`([^`]+)`/);
      if (backtickMatch) {
        const command = backtickMatch[1].trim();
        console.log('Extracted command (backtick):', command);
        return command;
      }
      
      // 2. 尝试找到以 / 开头的命令
      const slashMatch = content.match(/(\/\w+[^\n]*)/);  
      if (slashMatch) {
        const command = slashMatch[1].trim();
        console.log('Extracted command (slash):', command);
        return command;
      }
      
      // 3. 如果都没找到，尝试智能提取
      const cleanedContent = content.replace(/\s+/g, ' ').trim();
      console.log('No command pattern found, attempting extraction from:', cleanedContent);
      
      // 尝试智能提取命令
      const extractedCommand = this.extractCommandFromText(cleanedContent);
      if (extractedCommand) {
        console.log('Successfully extracted command:', extractedCommand);
        return extractedCommand;
      }
      
      // 如果还是无法提取，返回一个默认的错误提示
      console.error('Failed to extract valid command from:', cleanedContent);
      throw new Error('AI 未能生成有效的命令格式，请尝试更具体地描述您的需求');
      
    } catch (error) {
      console.error('APICore API error:', error);
      throw error;
    }
  }
  
  private extractCommandFromText(text: string): string | null {
    // 尝试识别常见的命令模式
    const patterns = [
      /(?:命令|command)[：::：]?\s*([\\/\\\\][\w\-\s]+)/i,
      /(?:生成|generate|创建|create)[：::：]?\s*([\\/\\\\][\w\-\s]+)/i,
      /(?:使用|use|用)[：::：]?\s*([\\/\\\\][\w\-\s]+)/i,
      /^([\\/\\\\]\w+[\w\-\s]*)/,
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    // 尝试识别命令关键词并构建命令
    const commandKeywords = {
      'build': '/build',
      'test': '/test',
      'review': '/review',
      'analyze': '/analyze',
      'deploy': '/deploy',
      'troubleshoot': '/troubleshoot',
      'improve': '/improve',
      'explain': '/explain',
      '创建': '/build',
      '测试': '/test',
      '审查': '/review',
      '分析': '/analyze',
      '部署': '/deploy',
      '调试': '/troubleshoot',
      '优化': '/improve',
      '解释': '/explain'
    };
    
    const lowerText = text.toLowerCase();
    for (const [keyword, command] of Object.entries(commandKeywords)) {
      if (lowerText.includes(keyword)) {
        // 提取可能的标志
        const flags = [];
        if (lowerText.includes('react')) flags.push('--react');
        if (lowerText.includes('深入') || lowerText.includes('详细')) flags.push('--ultrathink');
        if (lowerText.includes('安全')) flags.push('--security');
        if (lowerText.includes('性能')) flags.push('--performance');
        if (lowerText.includes('单元测试')) flags.push('--unit');
        if (lowerText.includes('端到端') || lowerText.includes('e2e')) flags.push('--e2e');
        
        return `${command} ${flags.join(' ')}`.trim();
      }
    }
    
    return null;
  }
  
  private getSystemPrompt(): string {
    return `你是 SuperClaude 命令生成专家。将自然语言转换为精确的 SuperClaude 命令。

重要规则：
1. 必须返回以 / 开头的有效命令
2. 使用反引号包裹命令：\`/command --flags\`
3. 只返回命令，不要添加任何解释文字
4. 确保命令格式正确且可执行

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

**必须遵循的回复格式：**
只返回命令，使用反引号包裹：\`/command --flag1 --flag2\`
不要包含任何其他文字！

示例（注意格式）：
用户："创建一个React网站"
回复：\`/build --init --react --magic\`

用户："帮我修复bug"
回复：\`/troubleshoot --investigate --fix\`

用户："检查代码安全性"
回复：\`/review --security --persona-security\`

用户："部署到生产环境"
回复：\`/deploy --env prod --validate\`

用户："优化网站性能"
回复：\`/improve --performance --persona-performance\`

记住：只返回反引号中的命令，不要添加任何解释！`;
  }
}

export const apicoreService = new APICoreService();