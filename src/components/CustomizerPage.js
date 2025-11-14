import UmbrellaCanvas from './UmbrellaCanvas.js';
import ColorSwatches from './ColorSwatches.js';
import UploadSection from './UploadSection.js';
import { state } from '../utils/state.js';

export default class CustomizerPage {
    constructor() {
        this.umbrellaCanvas = null;
        this.colorSwatches = null;
        this.uploadSection = null;
        
        // Set initial theme
        document.body.className = state.colorConfig[state.currentColor].theme;
    }
    
    render() {
        const container = document.createElement('div');
        container.className = 'customizer-container';
        
        // Create preview section
        const previewSection = document.createElement('div');
        previewSection.className = 'preview-section';
        
        // Create and append canvas component
        this.umbrellaCanvas = new UmbrellaCanvas();
        previewSection.appendChild(this.umbrellaCanvas.render());
        
        
        // Create customization panel
        const customizationPanel = document.createElement('div');
        customizationPanel.className = 'customization-panel';
        
        const panelTitle = document.createElement('h1');
        panelTitle.className = 'panel-title';
        panelTitle.textContent = 'Custom Umbrella';
        customizationPanel.appendChild(panelTitle);
        
        // Create and append color swatches component
        this.colorSwatches = new ColorSwatches();
        customizationPanel.appendChild(this.colorSwatches.render());
        
        // Create and append upload section component
        this.uploadSection = new UploadSection();
        customizationPanel.appendChild(this.uploadSection.render());
        
        // Append sections to container
        container.appendChild(previewSection);
        container.appendChild(customizationPanel);
        
        return container;
    }
}