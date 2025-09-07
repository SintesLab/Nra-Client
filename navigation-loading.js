class NavigationLoader {
  constructor() {
    this.overlay = null;
    this.isNavigating = false;
    this.navigationTimeout = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready before creating overlay
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.createOverlay();
        this.attachAllNavigationListeners();
      });
    } else {
      // DOM is already ready
      this.createOverlay();
      this.attachAllNavigationListeners();
    }
  }

  createOverlay() {
    // Make sure document.body exists
    if (!document.body) {
      console.error('NavigationLoader: document.body not available');
      return;
    }

    // Create overlay element
    this.overlay = document.createElement('div');
    this.overlay.id = 'navigationLoadingOverlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      z-index: 9999;
      display: none;
      justify-content: center;
      align-items: center;
      opacity: 0;
    `;

    // Create loading content
    const loadingContent = document.createElement('div');
    loadingContent.style.cssText = `
      text-align: center;
      color: var(--text-color, #333);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Create spinner
    const spinner = document.createElement('div');
    spinner.style.cssText = `
      width: 40px;
      height: 40px;
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-top: 3px solid var(--primary-color, #3498db);
      border-radius: 50%;
      animation: navigationSpin 1s linear infinite;
      margin: 0 auto 1rem auto;
    `;

    // Create loading text
    const loadingText = document.createElement('div');
    loadingText.textContent = getTranslatedText("loading_message") || 'Зарежда...'; // Fallback to Bulgarian if translation not found
    loadingText.style.cssText = `
      font-size: 1rem;
      font-weight: 500;
      opacity: 0.8;
    `;

    // Add CSS animation for spinner (only add once)
    if (!document.getElementById('navigationLoadingStyles')) {
      const style = document.createElement('style');
      style.id = 'navigationLoadingStyles';
      style.textContent = `
        @keyframes navigationSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Dark mode support */
        :root.dark-mode #navigationLoadingOverlay {
          background: rgba(0, 0, 0, 0.8);
        }
        
        /* iOS Safari specific optimizations */
        @supports (-webkit-backdrop-filter: blur(8px)) {
          #navigationLoadingOverlay {
            -webkit-backdrop-filter: blur(8px);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Assemble the overlay
    loadingContent.appendChild(spinner);
    loadingContent.appendChild(loadingText);
    this.overlay.appendChild(loadingContent);
    
    // Add to document
    document.body.appendChild(this.overlay);
  }

  showLoading() {
    if (this.overlay && !this.isNavigating) {
      this.isNavigating = true;
      this.overlay.style.display = 'flex';
      this.overlay.style.opacity = '1';
      // Force reflow to ensure display change takes effect immediately
      this.overlay.offsetHeight;
      
      // Set a timeout to hide loading if navigation takes too long or fails
      this.navigationTimeout = setTimeout(() => {
        this.hideLoading();
      }, 10000); // 10 second timeout
    }
  }

  hideLoading() {
    if (this.overlay) {
      this.isNavigating = false;
      if (this.navigationTimeout) {
        clearTimeout(this.navigationTimeout);
        this.navigationTimeout = null;
      }
      this.overlay.style.opacity = '0';
      this.overlay.style.display = 'none';
    }
  }

  isNavigationUrl(url) {
    if (!url || typeof url !== 'string') return false;
    
    // Check if it's a navigation to an HTML page
    return (url.endsWith('.html') || url.includes('.html?')) &&
           !url.startsWith('javascript:') && 
           !url.startsWith('#') &&
           !url.startsWith('mailto:') &&
           !url.startsWith('tel:') &&
           !url.startsWith('data:');
  }

  attachAllNavigationListeners() {
    // 1. Listen for ALL clicks on the document (catches any link clicks)
    document.addEventListener('click', (e) => {
      // Check if clicked element or any parent is a link
      let element = e.target;
      while (element && element !== document) {
        if (element.tagName === 'A' && element.href) {
          if (this.isNavigationUrl(element.href) && element.target !== '_blank') {
            this.showLoading();
            
            // For iOS Safari, add a small delay to ensure the overlay shows
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            if (isIOS) {
              e.preventDefault();
              setTimeout(() => {
                window.location.href = element.href;
              }, 50);
            }
          }
          break;
        }
        element = element.parentElement;
      }
    }, true); // Use capture phase to catch it early

    // 2. Listen for form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.tagName === 'FORM') {
        // Check if form action leads to HTML page
        const action = form.action || window.location.href;
        if (this.isNavigationUrl(action)) {
          this.showLoading();
        }
      }
    }, true);

    // 3. Listen for beforeunload (catches ANY navigation away from page)
    window.addEventListener('beforeunload', () => {
      this.showLoading();
    });

    // 4. Listen for popstate (back/forward button navigation)
    window.addEventListener('popstate', () => {
      this.showLoading();
    });

    // 5. Listen for hashchange (in case it triggers navigation)
    window.addEventListener('hashchange', (e) => {
      // Only show loading if the new URL is different page
      if (this.isNavigationUrl(e.newURL)) {
        this.showLoading();
      }
    });

    // 6. Intercept common navigation methods (non-invasive approach)
    this.interceptNavigationMethods();

    // 7. Watch for dynamically added elements that might navigate
    this.observeNewElements();

    // 8. Listen for keyboard shortcuts that might navigate
    document.addEventListener('keydown', (e) => {
      // Ctrl+R (refresh), F5 (refresh), Ctrl+L (address bar), etc.
      if ((e.ctrlKey && e.key === 'r') || 
          e.key === 'F5' || 
          (e.ctrlKey && e.key === 'l')) {
        this.showLoading();
      }
    });

    // 9. Handle page visibility changes (for when user comes back to tab)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.hideLoading();
      }
    });

    // 10. Hide loading on page show (back/forward navigation)
    window.addEventListener('pageshow', () => {
      this.hideLoading();
    });

    // 11. Hide loading when page is fully loaded
    window.addEventListener('load', () => {
      this.hideLoading();
    });
  }

  interceptNavigationMethods() {
    // The direct reassignment of window.location methods is problematic in modern browsers
    // due to security restrictions and read-only properties.
    // Modern browsers also have better native handling of navigation events.
    // The existing event listeners (click, submit, beforeunload, popstate, hashchange)
    // are generally sufficient to cover most navigation scenarios.
    // Therefore, this method is being refactored to remove direct property reassignment.

    // Removed problematic direct reassignment of window.location.assign, replace, reload, open.
    // Removed setInterval for window.location.href as it's part of the problematic interception strategy.
    // The other event listeners are sufficient.
  }

  observeNewElements() {
    // Watch for new elements being added to the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the new element is a link or contains links
            const links = node.tagName === 'A' ? [node] : node.querySelectorAll ? node.querySelectorAll('a') : [];
            links.forEach((link) => {
              if (link.href && this.isNavigationUrl(link.href) && link.target !== '_blank') {
                link.addEventListener('click', () => {
                  this.showLoading();
                });
              }
            });

            // Check for forms
            const forms = node.tagName === 'FORM' ? [node] : node.querySelectorAll ? node.querySelectorAll('form') : [];
            forms.forEach((form) => {
              form.addEventListener('submit', () => {
                const action = form.action || window.location.href;
                if (this.isNavigationUrl(action)) {
                  this.showLoading();
                }
              });
            });

            // Check for buttons with navigation onclick
            const buttons = node.tagName === 'BUTTON' ? [node] : node.querySelectorAll ? node.querySelectorAll('button') : [];
            buttons.forEach((button) => {
              button.addEventListener('click', () => {
                const onclickStr = button.getAttribute('onclick') || '';
                if (onclickStr.includes('window.location') || onclickStr.includes('.html')) {
                  this.showLoading();
                }
              });
            });
          }
        });
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Initialize the navigation loader when the script loads
const navigationLoader = new NavigationLoader();

// Export for potential manual use
window.NavigationLoader = navigationLoader; 