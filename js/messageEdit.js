/**
 * 消息编辑管理类
 */
class MessageEditor {
    constructor() {
        // 初始化DOM元素
        this.messageList = document.getElementById('messageList');
        this.chatPreview = document.getElementById('chatPreview');
        this.addTextMsgBtn = document.getElementById('addTextMsg');
        this.chatTitle = document.getElementById('chatTitle');

        // 消息列表数据
        this.messages = [];

        // 绑定事件
        this.initEventListeners();

        // 添加昵称输入框
        const nicknameInput = document.createElement('input');
        nicknameInput.type = 'text';
        nicknameInput.className = 'nickname-input';
        nicknameInput.placeholder = '输入对方昵称...';
        nicknameInput.value = '好友昵称';
        
        // 将昵称输入框添加到头像设置区域
        document.querySelector('.avatar-group:nth-child(2)').appendChild(nicknameInput);
        
        // 监听昵称变化
        nicknameInput.addEventListener('input', (e) => {
            this.chatTitle.textContent = e.target.value || '好友昵称';
        });
    }

    /**
     * 初始化事件监听器
     */
    initEventListeners() {
        // 添加文本消息按钮点击事件
        this.addTextMsgBtn.addEventListener('click', () => this.addNewMessage());

        // 监听消息内容变化
        this.messageList.addEventListener('input', (e) => {
            if (e.target.classList.contains('message-input')) {
                this.updatePreview();
            }
        });

        // 监听消息方向切换
        this.messageList.addEventListener('click', (e) => {
            if (e.target.classList.contains('direction-toggle')) {
                const messageItem = e.target.closest('.message-item');
                if (messageItem) {
                    const index = Array.from(this.messageList.children).indexOf(messageItem);
                    this.toggleMessageDirection(index);
                }
            }
        });
    }

    /**
     * 添加新消息
     */
    addNewMessage() {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.innerHTML = `
            <div class="message-controls">
                <button class="direction-toggle">切换方向</button>
                <button class="delete-msg">删除</button>
            </div>
            <textarea class="message-input" placeholder="输入消息内容..."></textarea>
        `;

        // 添加到编辑列表
        this.messageList.appendChild(messageItem);
        
        // 添加到消息数据
        this.messages.push({
            content: '',
            isSelf: true
        });

        // 更新预览
        this.updatePreview();

        // 获取焦点
        messageItem.querySelector('.message-input').focus();
    }

    /**
     * 切换消息方向
     * @param {number} index - 消息索引
     */
    toggleMessageDirection(index) {
        if (this.messages[index]) {
            this.messages[index].isSelf = !this.messages[index].isSelf;
            this.updatePreview();
        }
    }

    /**
     * 更新预览区域
     */
    updatePreview() {
        this.chatPreview.innerHTML = this.messages.map((msg, index) => {
            const input = this.messageList.children[index]?.querySelector('.message-input');
            const content = input ? input.value : msg.content;
            
            return `
                <div class="chat-message ${msg.isSelf ? 'self' : 'other'}">
                    <img class="chat-avatar" src="${msg.isSelf ? 
                        document.getElementById('myAvatar').src : 
                        document.getElementById('otherAvatar').src
                    }" alt="头像">
                    <div class="message-bubble">${content || '空消息'}</div>
                </div>
            `;
        }).join('');
    }
}

// 初始化消息编辑器
document.addEventListener('DOMContentLoaded', () => {
    window.messageEditor = new MessageEditor();
}); 