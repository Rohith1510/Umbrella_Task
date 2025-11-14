import { state } from '../utils/state.js';

export default class UploadSection {
    constructor() {
        this.fileInput = null;
        this.logoPreview = null;
        this.logoImage = null;
    }
    
    handleFileUpload(event) {
        const file = event.target.files[0];
        
        if (!file) return;
        
        // Validate file type
        if (!file.type.match('image/(png|jpeg|jpg)')) {
            alert('Please upload a .png or .jpg file only.');
            return;
        }
        
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB.');
            return;
        }
        
        // Read and display file
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                state.setLogo(img);
                
                // Show preview
                if (this.logoImage && this.logoPreview) {
                    this.logoImage.src = e.target.result;
                    this.logoPreview.style.display = 'block';
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    handleRemoveLogo() {
        state.removeLogo();
        if (this.logoPreview) {
            this.logoPreview.style.display = 'none';
        }
        if (this.fileInput) {
            this.fileInput.value = '';
        }
    }
    
    render() {
        const container = document.createElement('div');
        container.className = 'upload-section';
        
        container.innerHTML = `
            <h2 class="section-title">Customize your umbrella</h2>
            <p class="upload-description">Upload a logo for an instant preview.</p>
            <p class="upload-specs">.png and .jpg files only. Max file size is 5MB.</p>
            
            <label for="logoUpload" class="upload-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                UPLOAD LOGO
            </label>
            <input type="file" id="logoUpload" accept=".png,.jpg,.jpeg" hidden>
            
            <div id="logoPreview" class="logo-preview" style="display: none;">
                <img id="logoImage" src="" alt="Logo preview">
                <button id="removeLogo" class="remove-logo">×</button>
            </div>
        `;
        
        // Get references after render
        setTimeout(() => {
            this.fileInput = document.getElementById('logoUpload');
            this.logoPreview = document.getElementById('logoPreview');
            this.logoImage = document.getElementById('logoImage');
            const removeBtn = document.getElementById('removeLogo');
            
            if (this.fileInput) {
                this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
            }
            
            if (removeBtn) {
                removeBtn.addEventListener('click', () => this.handleRemoveLogo());
            }
        }, 0);
        
        return container;
    }
}