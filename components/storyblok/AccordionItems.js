import { StoryblokComponent } from '@storyblok/react';
import { storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const AccordionItems = ({ blok }) => {
  //console.log("CAROUSEL ITEMS: ",blok);
  return (
    <div {...storyblokEditable(blok)}>
  
    </div>
  );
};

export default AccordionItems;
