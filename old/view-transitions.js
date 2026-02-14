// View Transitions API integration
// Progressive enhancement - works with fallback for unsupported browsers

(function() {
    'use strict';

    // Check if View Transitions API is supported
    const supportsViewTransitions = 'startViewTransition' in document;

    // Enhanced navigation with View Transitions
    function initViewTransitions() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (!targetSection) return;

                // If View Transitions not supported, use regular smooth scroll
                if (!supportsViewTransitions) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    return;
                }

                // Use View Transitions API
                const transition = document.startViewTransition(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
                
                // Debug logging
                transition.ready.then(() => {
                    console.log('🎬 View Transition started for:', targetId);
                });
                
                transition.finished.then(() => {
                    console.log('✅ View Transition finished for:', targetId);
                });
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initViewTransitions);
    } else {
        initViewTransitions();
    }

    // Log support status (for debugging)
    console.log('View Transitions API:', supportsViewTransitions ? '✅ Supported' : '❌ Not supported (using fallback)');
})();
