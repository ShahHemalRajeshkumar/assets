import { storyblokEditable } from '@storyblok/react';

const AccordionView = ({ blok }) => {
  return (
    <div
      className={`${blok.custom_class}`}
      style={{
        paddingTop: `${blok?.padding_top}px`,
        paddingLeft: `${blok?.padding_left}px`,
        paddingRight: `${blok?.padding_right}px`,
        paddingBottom: `${blok?.padding_bottom}px`,
        marginTop: `${blok?.margin_top}px`,
        marginLeft: `${blok?.margin_left}px`,
        marginRight: `${blok?.margin_right}px`,
        marginBottom: `${blok?.margin_bottom}px`,
        backgroundColor: blok?.bg_color?.color,
        borderColor: blok?.border_color?.color,
        borderWidth: `${blok?.border_width}px`,
        borderRadius: `${blok?.border_radius}px`,
      }}
      {...storyblokEditable(blok)}>
   
      
    </div>
  );
};

export default AccordionView;
