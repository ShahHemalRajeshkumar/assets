import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const Forms = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.forms_body.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Forms;
