export const limitDOMNodes = (items, maxItems = 50) => {
  return items.slice(0, maxItems);
};

export const lazyRenderItems = (items, visibleCount = 10) => {
  return items.slice(0, visibleCount);
};

export const optimizeSVG = (svgElement) => {
  // Remove unnecessary attributes and optimize SVG
  if (svgElement && svgElement.children) {
    const children = Array.from(svgElement.children);
    if (children.length > 100) {
      // Limit SVG complexity
      children.slice(100).forEach(child => child.remove());
    }
  }
};