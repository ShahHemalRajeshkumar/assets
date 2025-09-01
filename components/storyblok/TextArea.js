import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import SbEditable from 'storyblok-react';

const TestArea = ({ blok }) => {
  return (
    <SbEditable content={blok} key={blok._uid}>
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
          borderWidth: `${blok.border_width}px`,
          borderColor: blok.border_color.color,
        }}
        {...storyblokEditable(blok)}>
        {blok.input_icon.map((nestedBlok) => (
          <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
        {blok.input_label.map((nestedBlok) => (
          <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </SbEditable>
  );
};

export default TestArea;
