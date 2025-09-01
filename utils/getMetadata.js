export const getMetadata = (widgets) =>
  widgets
    .filter((widget) => widget.getMetadata)
    .map((widget) => {
      return widget.getMetadata(widget.props, widget.searchState);
    });
