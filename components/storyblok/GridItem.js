import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import SbEditable from 'storyblok-react';
import { useMediaQuery } from 'react-responsive';

const GridItem = ({ blok, register }) => {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div
            className={`col-span-${blok.column_size} ${blok.custom_class} flex justify-between`}
            {...storyblokEditable(blok)}
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              justifyContent: blok.justify_content ? blok.justify_content : null,
              alignItems: blok.align_items ? blok.align_items : null,
            }}>
            {blok.grid_item_body.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} register={register} key={nestedBlok._uid} />
            ))}
          </div>
        </SbEditable>
      )}

      {TabletSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div
            className={`col-span-${blok.column_size} ${blok.custom_class} flex justify-between ${
              blok?.order ? 'order-[-1]' : ' '
            }`}
            {...storyblokEditable(blok)}
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              justifyContent: blok.justify_content ? blok.justify_content : null,
              alignItems: blok.align_items_tablet ? blok.align_items_tablet : null,
            }}>
            {blok.grid_item_body.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} register={register} key={nestedBlok._uid} />
            ))}
          </div>
        </SbEditable>
      )}

      {MobileSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div
            className={`col-span-${blok.column_size} ${blok.custom_class} flex justify-between ${
              blok?.order ? 'order-[-1]' : ' '
            }`}
            {...storyblokEditable(blok)}
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              justifyContent: blok.justify_content ? blok.justify_content : null,
              alignItems: blok.align_items_mobile ? blok.align_items_mobile : null,
            }}>
            {blok.grid_item_body.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} register={register} key={nestedBlok._uid} />
            ))}
          </div>
        </SbEditable>
      )}
    </>
  );
};

export default GridItem;
