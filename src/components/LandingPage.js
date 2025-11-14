export default class LandingPage {
    constructor(onNavigate) {
        this.onNavigate = onNavigate;
    }
    
    render() {
        const container = document.createElement('div');
        container.className = 'landing-container';
        container.innerHTML = `
            <div class="landing-content">
                <div class="content">
                    <h1 class="title">Custom <span class="title-umbrella">Umbrella</span> Designer</h1>
                    <p class="subtitle">Create your perfect <span class="subtitle-umbrella">branded</span> umbrella in seconds</p>
                   
                    <button class="cta-button" id="getStartedBtn">
                        Get Started
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener
        setTimeout(() => {
            const btn = document.getElementById('getStartedBtn');
            if (btn) {
                btn.addEventListener('click', () => this.onNavigate('customizer'));
            }
        }, 0);
        
        return container;
    }
}