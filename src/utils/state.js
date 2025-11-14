// Global state management
export const state = {
    currentColor: 'pink',
    uploadedLogo: null,
    listeners: [],
    
    // Color configurations
    colorConfig: {
        pink: {
            color: '#ff1493',
            theme: 'theme-pink'
        },
        blue: {
            color: '#00bfff',
            theme: 'theme-blue'
        },
        yellow: {
            color: '#ffd700',
            theme: 'theme-yellow'
        }
    },
    
    // Set current color
    setColor(color) {
        this.currentColor = color;
        document.body.className = this.colorConfig[color].theme;
        this.notify();
    },
    
    // Set uploaded logo
    setLogo(logo) {
        this.uploadedLogo = logo;
        this.notify();
    },
    
    // Remove logo
    removeLogo() {
        this.uploadedLogo = null;
        this.notify();
    },
    
    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    },
    
    // Notify all listeners
    notify() {
        this.listeners.forEach(listener => listener(this));
    }
};