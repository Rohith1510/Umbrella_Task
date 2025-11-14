import { state } from '../utils/state.js';

export default class UmbrellaCanvas {
    constructor() {
        this.canvas = null;
        this.drawer = null;
        this.unsubscribe = null;
        this.umbrellaImg = null;
        this.logoOverlay = null;
    }
    
    componentDidMount() {
        // Initial render based on current state
        this.updateImages();

        // Subscribe to state changes
        this.unsubscribe = state.subscribe(() => {
            this.updateImages();
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    updateImages() {
        // Map color to image filename (files are "Pink umbrella.png", etc.)
        const colorName = state.currentColor || 'pink';
        const capitalized = colorName.charAt(0).toUpperCase() + colorName.slice(1);
        const umbrellaPath = `images/${capitalized} umbrella.png`;

        if (this.umbrellaImg) {
            this.umbrellaImg.src = umbrellaPath;
        }

        // Show or hide uploaded logo overlay
        if (state.uploadedLogo && this.logoOverlay) {
            // state.uploadedLogo is an Image object set by UploadSection
            this.logoOverlay.src = state.uploadedLogo.src;
            this.logoOverlay.style.display = 'block';
        } else if (this.logoOverlay) {
            this.logoOverlay.style.display = 'none';
            this.logoOverlay.src = '';
        }
    }
    
    render() {
        const container = document.createElement('div');
        container.className = 'umbrella-container';

        // Umbrella image
        this.umbrellaImg = document.createElement('img');
        this.umbrellaImg.id = 'umbrellaImage';
        this.umbrellaImg.alt = 'Umbrella';

        // Logo overlay (positioned absolutely over the umbrella image)
        this.logoOverlay = document.createElement('img');
        this.logoOverlay.id = 'logoOverlay';
        this.logoOverlay.alt = 'Uploaded logo overlay';
        this.logoOverlay.style.display = 'none';

        container.appendChild(this.umbrellaImg);
        container.appendChild(this.logoOverlay);

        // Call componentDidMount after render
        setTimeout(() => this.componentDidMount(), 0);

        return container;
    }
}