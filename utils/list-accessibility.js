// List accessibility utility to fix improper list structures
export const fixListStructure = () => {
  if (typeof window === 'undefined') return;

  // Find ul elements containing div children
  const improperLists = document.querySelectorAll('ul > div');
  
  improperLists.forEach(div => {
    const ul = div.parentElement;
    const li = document.createElement('li');
    
    // Copy all attributes from div to li
    Array.from(div.attributes).forEach(attr => {
      li.setAttribute(attr.name, attr.value);
    });
    
    // Move all children from div to li
    while (div.firstChild) {
      li.appendChild(div.firstChild);
    }
    
    // Replace div with li
    ul.replaceChild(li, div);
  });

  // Add role="list" to ul elements that don't have proper list styling
  const lists = document.querySelectorAll('ul.grid, ul.flex');
  lists.forEach(list => {
    if (!list.hasAttribute('role')) {
      list.setAttribute('role', 'list');
    }
  });
};

// Auto-run on DOM changes
export const initListAccessibility = () => {
  if (typeof window === 'undefined') return;
  
  // Run initially
  fixListStructure();
  
  // Run on DOM mutations
  const observer = new MutationObserver(() => {
    fixListStructure();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  return observer;
};