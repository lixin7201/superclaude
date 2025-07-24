'use client';

import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">SuperClaude 使用指南</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* 快速入门 */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">🚀 快速入门（小白必看）</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="mb-3">如果你是编程新手，按照以下步骤操作：</p>
              <ol className="list-decimal ml-6 space-y-2">
                <li><strong>选择预设模板</strong> - 在页面顶部选择一个适合你的场景</li>
                <li><strong>查看生成的命令</strong> - 系统会自动选择最佳配置</li>
                <li><strong>复制命令</strong> - 点击"复制命令"按钮</li>
                <li><strong>在 Claude Code 中使用</strong> - 粘贴并执行</li>
              </ol>
            </div>
          </section>

          {/* 核心概念 */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📚 核心概念解释</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">命令 (Commands)</h4>
                <p className="text-gray-600">
                  命令就是告诉 AI 要做什么的指令。比如 /build 是创建项目，/review 是检查代码。
                  每个命令都有特定的用途，选择合适的命令是第一步。
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">标志 (Flags)</h4>
                <p className="text-gray-600">
                  标志是命令的修饰符，用来调整命令的行为。比如 --think 让 AI 思考更深入，
                  --interactive 让操作变成交互式的。可以组合多个标志。
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">角色 (Personas)</h4>
                <p className="text-gray-600">
                  角色让 AI 以特定专家的视角来帮助你。比如选择"前端专家"会让 AI 更关注用户界面，
                  选择"安全专家"会重点检查安全问题。
                </p>
              </div>
            </div>
          </section>

          {/* 常见问题 */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">❓ 常见问题</h3>
            
            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer">我应该什么时候用 --ultrathink？</summary>
                <p className="mt-2 text-gray-600">
                  只在处理特别复杂的问题时使用，比如：
                  - 调试很难找到原因的 bug
                  - 设计复杂的系统架构
                  - 优化关键性能问题
                  
                  平时用 --think 就够了，--ultrathink 会消耗更多资源。
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer">--uc (压缩模式) 是什么意思？</summary>
                <p className="mt-2 text-gray-600">
                  UltraCompressed 模式会让 AI 的回复更简洁，适合：
                  - 长时间的编程会话
                  - 处理大型项目
                  - 想要节省 API 使用量
                  
                  缺点是解释会变少，适合有一定基础的用户。
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer">MCP 服务器是什么？</summary>
                <p className="mt-2 text-gray-600">
                  MCP (Model Context Protocol) 服务器提供额外功能：
                  - --c7: 查找文档和 API 参考
                  - --seq: 逻辑分析和推理
                  - --magic: 生成 UI 组件
                  - --pup: 浏览器自动化
                  
                  根据任务需要选择开启。
                </p>
              </details>
            </div>
          </section>

          {/* 最佳实践 */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">✨ 最佳实践</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">推荐做法</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✅ 新手使用 --interactive 模式</li>
                  <li>✅ 重要操作前用 --dry-run 预览</li>
                  <li>✅ 不确定时选择 mentor 角色</li>
                  <li>✅ 从预设模板开始学习</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">避免做法</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>❌ 一开始就用 --ultrathink</li>
                  <li>❌ 同时选择太多标志</li>
                  <li>❌ 跳过 --validate 进行部署</li>
                  <li>❌ 忽略 AI 的警告提示</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 进阶技巧 */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">🎯 进阶技巧</h3>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                <div>
                  <strong>组合使用角色和标志</strong>
                  <p className="text-sm text-gray-600">
                    例如：/review --persona-security --strict 会进行最严格的安全审查
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                <div>
                  <strong>使用自定义参数</strong>
                  <p className="text-sm text-gray-600">
                    在自定义参数中详细描述你的需求，AI 会更准确地理解
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                <div>
                  <strong>渐进式使用思考深度</strong>
                  <p className="text-sm text-gray-600">
                    先用默认深度，如果结果不满意再加 --think 或 --think-hard
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            需要更多帮助？在 Claude Code 中输入 <code className="bg-gray-200 px-2 py-1 rounded">/help</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;