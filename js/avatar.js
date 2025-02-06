/**
 * 处理头像上传和预览功能
 */
class AvatarManager {
    constructor() {
        // 初始化头像相关元素
        this.myAvatarInput = document.getElementById('myAvatarInput');
        this.otherAvatarInput = document.getElementById('otherAvatarInput');
        this.myAvatarPreview = document.getElementById('myAvatar');
        this.otherAvatarPreview = document.getElementById('otherAvatar');

        // 绑定事件处理
        this.initEventListeners();
    }

    /**
     * 初始化事件监听器
     */
    initEventListeners() {
        this.myAvatarInput.addEventListener('change', (e) => this.handleAvatarUpload(e, this.myAvatarPreview));
        this.otherAvatarInput.addEventListener('change', (e) => this.handleAvatarUpload(e, this.otherAvatarPreview));
    }

    /**
     * 处理头像上传
     * @param {Event} event - 文件上传事件
     * @param {HTMLImageElement} previewElement - 预览图片元素
     */
    handleAvatarUpload(event, previewElement) {
        const file = event.target.files[0];
        if (!file) return;

        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            alert('请上传图片文件！');
            return;
        }

        // 验证文件大小（最大2MB）
        if (file.size > 2 * 1024 * 1024) {
            alert('图片大小不能超过2MB！');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            previewElement.src = e.target.result;
            // 触发自定义事件，通知其他组件头像已更新
            const avatarUpdateEvent = new CustomEvent('avatarUpdate', {
                detail: {
                    type: previewElement.id === 'myAvatar' ? 'self' : 'other',
                    dataUrl: e.target.result
                }
            });
            document.dispatchEvent(avatarUpdateEvent);
        };
        reader.readAsDataURL(file);
    }
}

// 初始化头像管理器
document.addEventListener('DOMContentLoaded', () => {
    window.avatarManager = new AvatarManager();
}); 