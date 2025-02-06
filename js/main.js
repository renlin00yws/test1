/**
 * 主题切换功能
 */
document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeBtn = document.getElementById('toggleTheme');
    
    toggleThemeBtn.addEventListener('click', () => {
        document.body.setAttribute(
            'data-theme',
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        );
    });
}); 