import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';

const ListItems = ({ blok }) => {
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div {...storyblokEditable(blok)}>
        {blok.list_items_body.map((nestedBlok) => (
          <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </SbEditable>
  );
};

export default ListItems;
