// Accessibility helper functions

export const getButtonAriaLabel = (context, language = 'en') => {
  const labels = {
    close: {
      en: 'Close',
      de: 'Schließen'
    },
    menu: {
      en: 'Menu',
      de: 'Menü'
    },
    search: {
      en: 'Search',
      de: 'Suchen'
    },
    filter: {
      en: 'Filter',
      de: 'Filter'
    },
    next: {
      en: 'Next',
      de: 'Weiter'
    },
    previous: {
      en: 'Previous',
      de: 'Zurück'
    },
    play: {
      en: 'Play',
      de: 'Abspielen'
    },
    pause: {
      en: 'Pause',
      de: 'Pause'
    },
    like: {
      en: 'Like',
      de: 'Gefällt mir'
    },
    share: {
      en: 'Share',
      de: 'Teilen'
    },
    expand: {
      en: 'Expand',
      de: 'Erweitern'
    },
    collapse: {
      en: 'Collapse',
      de: 'Einklappen'
    }
  };

  const lang = language.includes('de') ? 'de' : 'en';
  return labels[context]?.[lang] || labels[context]?.en || context;
};

export const addAccessibilityProps = (element, context, language) => {
  if (!element) return {};
  
  return {
    'aria-label': getButtonAriaLabel(context, language),
    'title': getButtonAriaLabel(context, language)
  };
};