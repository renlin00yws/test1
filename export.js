// 直接在代码中使用 Base64 格式的默认头像
const DEFAULT_AVATAR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...';

class ExportManager {
    constructor() {
        this.defaultAvatar = DEFAULT_AVATAR;
    }
    // ... 其他代码 ...

    async exportImage() {
        try {
            // 1. 确保所有图片加载时都添加 crossOrigin 属性
            const loadImage = (url) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                    img.src = url;
                });
            };

            // 2. 使用这个函数加载头像
            const avatar1 = await loadImage('path/to/avatar1.png');
            const avatar2 = await loadImage('path/to/avatar2.png');

            // ... 后续代码 ...
        } catch (error) {
            console.error('导出错误:', error);
        }
    }
} 