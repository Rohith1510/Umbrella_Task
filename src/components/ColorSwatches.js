import { state } from '../utils/state.js';

export default class ColorSwatches {
    constructor() {
        this.colors = ['pink', 'blue', 'yellow'];
    }
    
    handleColorClick(color) {
        state.setColor(color);
        this.updateActiveState();
    }
    
    updateActiveState() {
        const swatches = document.querySelectorAll('.color-swatch');
        swatches.forEach(swatch => {
            if (swatch.dataset.color === state.currentColor) {
                swatch.classList.add('active');
            } else {
                swatch.classList.remove('active');
            }
        });
    }
    
    render() {
        const container = document.createElement('div');
        container.className = 'color-swatches';
        
        this.colors.forEach(color => {
            const button = document.createElement('button');
            button.className = 'color-swatch';
            button.dataset.color = color;
            button.setAttribute('aria-label', color.charAt(0).toUpperCase() + color.slice(1));
            
            if (color === state.currentColor) {
                button.classList.add('active');
            }
            
            button.addEventListener('click', () => this.handleColorClick(color));
            
            container.appendChild(button);
        });
        
        return container;
    }
}