import LandingPage from './components/LandingPage.js';
import CustomizerPage from './components/CustomizerPage.js';
import { state } from './utils/state.js';

class App {
    constructor() {
        this.appElement = document.getElementById('app');
        this.currentPage = 'landing';
        
        // Set up routing
        this.setupRouting();
        
        // Initial render
        this.render();
    }
    
    setupRouting() {
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
    }
    
    handleRoute() {
        const path = window.location.pathname;
        if (path.includes('customizer')) {
            this.currentPage = 'customizer';
        } else {
            this.currentPage = 'landing';
        }
        this.render();
    }
    
    navigateTo(page) {
        this.currentPage = page;
        window.history.pushState({}, '', `/${page}`);
        this.render();
    }
    
    render() {
        this.appElement.innerHTML = '';
        
        let component;
        if (this.currentPage === 'landing') {
            component = new LandingPage(this.navigateTo.bind(this));
        } else if (this.currentPage === 'customizer') {
            component = new CustomizerPage();
        }
        
        if (component) {
            this.appElement.appendChild(component.render());
        }
    }
}

// Initialize app
new App();