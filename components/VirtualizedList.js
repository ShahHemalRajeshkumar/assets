import { FixedSizeList as List } from 'react-window';
import { memo } from 'react';

const VirtualizedList = memo(({ items, itemHeight = 50, height = 400, renderItem }) => {
  const Row = memo(({ index, style }) => (
    <div style={style}>
      {renderItem(items[index], index)}
    </div>
  ));

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
});

export default VirtualizedList;