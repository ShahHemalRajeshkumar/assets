import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';
import Image from 'next/image';

const HorizontalCard = ({ blok }) => {
  const ICON = () => (
    <div
      className='
     bg-gray-300 h-full flex items-center px-4 rounded-tl-md rounded-bl-md
  '>
      <Image
       alt="image"
        src={image}
        style={{
          width: `${blok.icon_width}px`,
          height: `${blok.icon_height}px`,
          marginLeft: `${blok.icon_margin_left}px`,
          marginRight: `${blok.icon_margin_right}px`,
          marginTop: `${blok.icon_margin_top}px`,
          marginBottom: `${blok.icon_margin_bottom}px`,
        }}
      />
    </div>
  );

  const image = blok.icon?.filename;

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div
        className='flex items-center justify-between h-full relative bg-white border rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out outline-visible'
        {...storyblokEditable(blok)}>
        {blok.show_icon && <ICON />}
        <span className='flex-grow py-2 pl-4 pr-12 rounded-tr-md rounded-br-md border-2 border-t-gray-300 h-full flex flex-col justify-center'>
          {blok.horizontal_card_body.map((nestedBlok) => (
            <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </span>
      </div>
    </SbEditable>
  );
};

export default HorizontalCard;
