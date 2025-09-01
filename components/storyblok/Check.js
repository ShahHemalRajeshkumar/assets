import { StoryblokComponent } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const Check = ({ blok }) => {
 
  return (
    <div
      className={`grid grid-cols-${blok.no_of_columns} gap-${blok.gap} ${blok.custom_class} justify-items-${blok.align_items}`}
      style={{
        marginTop: `${blok?.margin_top}px`,
        marginLeft: `${blok?.margin_left}px`,
        marginRight: `${blok?.margin_right}px`,
        marginBottom: `${blok?.margin_bottom}px`,
        paddingTop: `${blok?.padding_top}px`,
        paddingLeft: `${blok?.padding_left}px`,
        paddingRight: `${blok?.padding_right}px`,
        paddingBottom: `${blok?.padding_bottom}px`,
        borderWidth: 1,
        borderColor: 'black',
        height: 20
      }}>
      {blok.check_body.map((nestedBlok) => (
        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Check;
