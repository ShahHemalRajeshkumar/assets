export const event = ({ action, params }) => {
  window.gtag('event', action, {
    event_category: 'app',
    event_action: action,
    event_label: params,
  });
};
