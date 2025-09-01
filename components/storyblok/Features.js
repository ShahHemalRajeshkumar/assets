import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const Features = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.feature_body.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Features;
