/**
 * Navigation utilities for handling page transitions and history
 */

/**
 * Updates the current view and manages browser history
 * @param {string} view - The view to navigate to
 * @param {Object} [data] - Optional data to pass to the view
 */
export const navigateTo = (view, data = null) => {
  // Create a new history entry
  window.history.pushState({ view, data }, '', `#${view}`);
  
  // Dispatch a custom event for React to handle
  window.dispatchEvent(new CustomEvent('navigationChange', {
    detail: { view, data }
  }));
};

/**
 * Handles browser back/forward navigation
 * @param {PopStateEvent} event - The popstate event
 */
export const handlePopState = (event) => {
  if (event.state) {
    window.dispatchEvent(new CustomEvent('navigationChange', {
      detail: event.state
    }));
  }
};

// Initialize navigation handling
window.addEventListener('popstate', handlePopState);

/**
 * Returns to the previous page
 */
export const goBack = () => {
  window.history.back();
};