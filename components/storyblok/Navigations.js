import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const Navigations = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.navigation_items.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Navigations;
