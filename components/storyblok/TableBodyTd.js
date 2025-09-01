import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import SbEditable from 'storyblok-react';

const TableBodyTd = ({ blok }) => {
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div
        style={{
          width: blok.td_width ? `${blok.td_width}px` : '100%',
          paddingTop: `${blok.padding_top}px`,
          paddingLeft: `${blok.padding_left}px`,
          paddingRight: `${blok.padding_right}px`,
          paddingBottom: `${blok.padding_bottom}px`,
        }}
        {...storyblokEditable(blok)}>
        {blok.table_body_td.map((nestedBlok) => (
          <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </SbEditable>
  );
};

export default TableBodyTd;
