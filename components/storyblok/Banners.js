import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const Banners = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.banners_body.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Banners;
