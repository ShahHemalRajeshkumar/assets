import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import SbEditable from 'storyblok-react';

const Infos = ({ blok }) => {
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div {...storyblokEditable(blok)}>
        {blok.infos_body.map((nestedBlok) => (
          <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </SbEditable>
  );
};

export default Infos;
