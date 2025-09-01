import { StoryblokComponent } from '@storyblok/react';
import { storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const CarouselItems = ({ blok }) => {
  //console.log("CAROUSEL ITEMS: ",blok);
  return (
    <div {...storyblokEditable(blok)}>
      
      {blok.carousel_item_body.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default CarouselItems;