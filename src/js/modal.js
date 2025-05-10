/**
 * Modal window utilities for handling positioning, scrolling, and animations
 */

/**
 * Centers the modal content vertically in the viewport
 * @param {HTMLElement} modalContent - The modal content element to center
 */
export const centerModal = (modalContent) => {
  if (!modalContent) return;
  
  const viewportHeight = window.innerHeight;
  const modalHeight = modalContent.offsetHeight;
  
  // Center vertically only if modal is smaller than viewport
  if (modalHeight < viewportHeight) {
    modalContent.style.marginTop = `${Math.max(0, (viewportHeight - modalHeight) / 2)}px`;
  } else {
    modalContent.style.marginTop = '2rem';
  }
};

/**
 * Locks page scrolling when modal is open
 * Adds padding to prevent layout shift from scrollbar removal
 */
export const lockScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
};

/**
 * Unlocks page scrolling when modal is closed
 * Removes padding added by lockScroll
 */
export const unlockScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

/**
 * Handles modal opening and closing animations
 * @param {HTMLElement} modalOverlay - The modal overlay element
 * @param {HTMLElement} modalContent - The modal content element
 * @param {boolean} isOpening - Whether the modal is opening or closing
 */
export const animateModal = (modalOverlay, modalContent, isOpening = true) => {
  if (isOpening) {
    // Set initial state for opening animation
    modalOverlay.style.opacity = '0';
    modalContent.style.transform = 'scale(0.8) translateY(20px)';
    
    // Trigger opening animation
    requestAnimationFrame(() => {
      modalOverlay.style.opacity = '1';
      modalContent.style.transform = 'scale(1) translateY(0)';
    });
  } else {
    // Trigger closing animation
    modalOverlay.style.opacity = '0';
    modalContent.style.transform = 'scale(0.8) translateY(20px)';
  }
};