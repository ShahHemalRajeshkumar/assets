import { StoryblokComponent } from '@storyblok/react';
import { storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const Checkbox = ({ blok }) => {
  return (
    <div
      className={`${blok.custom_class}`}
      style={{
        paddingTop: `${blok.padding_top}px`,
        paddingLeft: `${blok.padding_left}px`,
        paddingRight: `${blok.padding_right}px`,
        paddingBottom: `${blok.padding_bottom}px`,
        marginTop: `${blok.margin_top}px`,
        marginLeft: `${blok.margin_left}px`,
        marginRight: `${blok.margin_right}px`,
        marginBottom: `${blok.margin_bottom}px`,
      }}>
      {blok.checkbox_title.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}

      {blok.checkbox_options.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Checkbox;