// Button accessibility utility to add missing ARIA labels
export const addButtonAccessibility = () => {
  if (typeof window === 'undefined') return;

  // Find buttons without accessible names
  const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby]):not([title])');
  
  buttons.forEach(button => {
    // Skip if button has text content
    if (button.textContent.trim()) return;
    
    // Add appropriate aria-label based on context
    const classes = button.className;
    
    if (classes.includes('text-gray-600') && classes.includes('hover:text-red-500')) {
      button.setAttribute('aria-label', 'Close');
      button.setAttribute('title', 'Close');
    } else if (classes.includes('text-gray-500')) {
      button.setAttribute('aria-label', 'Action button');
      button.setAttribute('title', 'Action button');
    } else if (button.querySelector('svg')) {
      // Button contains an icon
      const svg = button.querySelector('svg');
      const title = svg.querySelector('title');
      if (title) {
        button.setAttribute('aria-label', title.textContent);
      } else {
        button.setAttribute('aria-label', 'Icon button');
      }
    } else {
      button.setAttribute('aria-label', 'Button');
    }
  });
};

// Auto-run on DOM changes
export const initButtonAccessibility = () => {
  if (typeof window === 'undefined') return;
  
  // Run initially
  addButtonAccessibility();
  
  // Run on DOM mutations
  const observer = new MutationObserver(() => {
    addButtonAccessibility();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  return observer;
};