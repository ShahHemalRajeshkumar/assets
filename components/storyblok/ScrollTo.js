import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import { Link } from 'react-scroll';
import SbEditable from 'storyblok-react';

const ScrollTo = ({ blok }) => {
  const bg_image = blok.bg_image.filename;

  return (
    <SbEditable content={blok} key={blok._uid}>
      <Link offset={-100} to={blok.reference_id} spy={true} smooth={true}>
        <div
          className={`${blok.custom_class} cursor-pointer`}
          style={{
            backgroundImage: `url(${bg_image})`,
            backgroundColor: blok.bg_color.color,
            paddingTop: `${blok.padding_top}px`,
            paddingLeft: `${blok.padding_left}px`,
            paddingRight: `${blok.padding_right}px`,
            paddingBottom: `${blok.padding_bottom}px`,
            marginTop: `${blok.margin_top}px`,
            marginLeft: `${blok.margin_left}px`,
            marginRight: `${blok.margin_right}px`,
            marginBottom: `${blok.margin_bottom}px`,
            borderColor: blok?.border_color?.color,
            borderWidth: `${blok.border_width}px`,
            borderRadius: `${blok.border_radius}px`,
            display: 'flex', // Add this line
            width: '100%',
            flexDirection: 'column', // Optional, to stack items vertically
            alignItems: blok.align_items, // Center items horizontally
            justifyContent: blok.justify_content, // Center items vertically
          }}
          {...storyblokEditable(blok)}>
          {blok.scroll_body.map((nestedBlok) => (
            <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </Link>
    </SbEditable>
  );
};

export default ScrollTo;
