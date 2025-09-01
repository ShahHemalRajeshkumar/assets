import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const CheckboxOptions = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.checkbox_option_title.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
      {blok.checkbox_value}
    </div>
  );
};

export default CheckboxOptions;
