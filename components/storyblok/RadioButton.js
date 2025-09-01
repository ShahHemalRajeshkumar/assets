import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const Radio_Button = ({ blok }) => {
  return (
    <div
      className={`${blok.custom_class}`}
      style={{
        paddingTop: `${blok.padding_top}`,
        paddingLeft: `${blok.padding_left}`,
        paddingRight: `${blok.padding_right}`,
        paddingBottom: `${blok.padding_bottom}`,
        marginTop: `${blok.margin_top}`,
        marginLeft: `${blok.margin_left}`,
        marginRight: `${blok.margin_right}`,
        marginBottom: `${blok.margin_bottom}`,
      }}
      {...storyblokEditable}>
      {blok.radio_button_title.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok} />
      ))}
      {blok.radio_options.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok} />
      ))}
    </div>
  );
};

export default Radio_Button;