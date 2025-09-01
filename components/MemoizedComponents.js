import { memo } from 'react';

export const MemoizedTeacherCard = memo(({ teacher, ...props }) => {
  // Only re-render if teacher data changes
  return <div {...props}>{/* Teacher card content */}</div>;
}, (prevProps, nextProps) => {
  return prevProps.teacher?.id === nextProps.teacher?.id;
});

export const MemoizedGalleryItem = memo(({ item, index, ...props }) => {
  return <div {...props}>{/* Gallery item content */}</div>;
}, (prevProps, nextProps) => {
  return prevProps.item?.id === nextProps.item?.id && prevProps.index === nextProps.index;
});

export const MemoizedListItem = memo(({ item, ...props }) => {
  return <div {...props}>{/* List item content */}</div>;
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item);
});