import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const RadioButtonOptions = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.radio_option_title.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
      {blok.radio_button_value}
    </div>
  );
};

export default RadioButtonOptions;
