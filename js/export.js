/**
 * 导出功能管理类
 */
class ExportManager {
    constructor() {
        // 初始化导出按钮
        this.exportBtn = document.getElementById('exportImage');
        this.chatPreviewWrapper = document.querySelector('.chat-preview-wrapper');
        
        // 绑定导出事件
        this.initEventListeners();
    }

    /**
     * 初始化事件监听器
     */
    initEventListeners() {
        this.exportBtn.addEventListener('click', () => this.exportImage());
    }

    /**
     * 创建纯色背景的头像
     */
    createDefaultAvatar() {
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        const ctx = canvas.getContext('2d');
        
        // 绘制圆形头像
        ctx.beginPath();
        ctx.arc(20, 20, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#cccccc';
        ctx.fill();
        
        return canvas.toDataURL();
    }

    /**
     * 创建纯色图标
     */
    createIcon(color = '#666666') {
        const canvas = document.createElement('canvas');
        canvas.width = 24;
        canvas.height = 24;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 24, 24);
        
        return canvas.toDataURL();
    }

    /**
     * 准备导出内容
     */
    prepareContent() {
        // 创建新的容器
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.backgroundColor = '#ebebeb';
        
        // 复制聊天内容的HTML
        container.innerHTML = this.chatPreviewWrapper.innerHTML;
        
        // 替换所有图片为纯色背景
        const defaultAvatar = this.createDefaultAvatar();
        const defaultIcon = this.createIcon();
        
        const images = container.getElementsByTagName('img');
        Array.from(images).forEach(img => {
            img.src = defaultAvatar;
        });
        
        // 替换按钮背景
        const buttons = container.querySelectorAll('.voice-btn, .emoji-btn, .more-functions-btn');
        buttons.forEach(btn => {
            btn.style.backgroundImage = `url(${defaultIcon})`;
        });
        
        return container;
    }

    /**
     * 导出图片
     */
    async exportImage() {
        try {
            this.exportBtn.textContent = '正在导出...';
            this.exportBtn.disabled = true;

            // 准备导出内容
            const container = this.prepareContent();
            document.body.appendChild(container);

            // 调整容器尺寸
            const chatContainer = container.querySelector('.chat-container');
            const header = container.querySelector('.wechat-header');
            const inputArea = container.querySelector('.chat-input-area');
            
            if (chatContainer) {
                chatContainer.style.height = 'auto';
                chatContainer.style.overflow = 'visible';
            }

            // 计算总高度
            const totalHeight = 
                (chatContainer ? chatContainer.scrollHeight : 0) +
                (header ? header.offsetHeight : 0) +
                (inputArea ? inputArea.offsetHeight : 0);

            // 设置容器尺寸
            container.style.width = `${this.chatPreviewWrapper.offsetWidth}px`;
            container.style.height = `${totalHeight}px`;

            // 创建 canvas
            const canvas = await html2canvas(container, {
                backgroundColor: '#ebebeb',
                scale: 2,
                logging: false,
                useCORS: false,
                allowTaint: false,
                foreignObjectRendering: false
            });

            // 清理临时元素
            document.body.removeChild(container);

            // 下载图片
            const link = document.createElement('a');
            const timestamp = new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }).replace(/[/:]/g, '-');
            
            link.download = `微信聊天记录_${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

        } catch (error) {
            console.error('导出错误:', error);
            alert('导出失败，请重试\n' + error.message);
        } finally {
            this.exportBtn.textContent = '导出图片';
            this.exportBtn.disabled = false;
        }
    }
}

// 初始化导出管理器
document.addEventListener('DOMContentLoaded', () => {
    window.exportManager = new ExportManager();
}); 