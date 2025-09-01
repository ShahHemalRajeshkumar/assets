import { StoryblokComponent } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';

const Grid = ({ blok, register }) => {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  const {
    gap_desktop,
    gap_tablet,
    gap_mobile,

    align_items,

    bg_color_desktop = '#0000',
    padding_top_desktop = 0,
    padding_left_desktop = 0,
    padding_right_desktop = 0,
    padding_bottom_desktop = 0,
    margin_top_desktop = 0,
    margin_left_desktop = 0,
    margin_right_desktop = 0,
    margin_bottom_desktop = 0,

    bg_color_tablet = '#0000',
    padding_top_tablet = 0,
    padding_left_tablet = 0,
    padding_right_tablet = 0,
    padding_bottom_tablet = 0,
    margin_top_tablet = 0,
    margin_left_tablet = 0,
    margin_right_tablet = 0,
    margin_bottom_tablet = 0,

    bg_color_mobile = '#0000',
    padding_top_mobile = 0,
    padding_left_mobile = 0,
    padding_right_mobile = 0,
    padding_bottom_mobile = 0,
    margin_top_mobile = 0,
    margin_left_mobile = 0,
    margin_right_mobile = 0,
    margin_bottom_mobile = 0,
  } = blok;

  const desktopStyle = {
    alignItems: align_items,
    backgroundColor: bg_color_desktop?.color || 'transparent',

    paddingTop: `${padding_top_desktop}px`,
    paddingLeft: `${padding_left_desktop}px`,
    paddingRight: `${padding_right_desktop}px`,
    paddingBottom: `${padding_bottom_desktop}px`,
    marginTop: `${margin_top_desktop}px`,
    marginLeft: `${margin_left_desktop}px`,
    marginRight: `${margin_right_desktop}px`,
    marginBottom: `${margin_bottom_desktop}px`,
  };

  const tabletStyle = {
    alignItems: align_items,
    backgroundColor: bg_color_tablet?.color || 'transparent',

    paddingTop: `${padding_top_tablet}px`,
    paddingLeft: `${padding_left_tablet}px`,
    paddingRight: `${padding_right_tablet}px`,
    paddingBottom: `${padding_bottom_tablet}px`,
    marginTop: `${margin_top_tablet}px`,
    marginLeft: `${margin_left_tablet}px`,
    marginRight: `${margin_right_tablet}px`,
    marginBottom: `${margin_bottom_tablet}px`,
  };

  const mobileStyle = {
    alignItems: align_items,
    backgroundColor: bg_color_mobile?.color || 'transparent',

    paddingTop: `${padding_top_mobile}px`,
    paddingLeft: `${padding_left_mobile}px`,
    paddingRight: `${padding_right_mobile}px`,
    paddingBottom: `${padding_bottom_mobile}px`,
    marginTop: `${margin_top_mobile}px`,
    marginLeft: `${margin_left_mobile}px`,
    marginRight: `${margin_right_mobile}px`,
    marginBottom: `${margin_bottom_mobile}px`,
  };

  let columnsClass;

  switch (parseInt(blok.no_of_columns)) {
    case 1:
      columnsClass = 'grid-cols-1';
      break;
    case 2:
      columnsClass = 'grid-cols-1 sm:grid-cols-2'; // 1 column on mobile, 2 on small screens and up
      break;
    case 3:
      columnsClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'; // 1 on mobile, 2 on small, 3 on medium and up
      break;
    case 4:
      columnsClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'; // 1 on mobile, 2 on small, 3 on medium, 4 on large
      break;
    case 5:
      columnsClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'; // 1 on mobile, 2 on small, 3 on medium, 4 on large, 5 on extra large
      break;
    default:
      columnsClass = 'grid-cols-6'; // fallback to 1 column
  }

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div
            className={`grid ${blok.no_of_columns_desktop} gap-${gap_desktop} ${blok.custom_class} justify-items-${blok.align_items}`}
            style={desktopStyle}>
            {blok.grid_body.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} register={register} key={nestedBlok._uid} />
            ))}
          </div>
        </SbEditable>
      )}

      {TabletSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div
            className={`grid ${blok.no_of_columns_tablet} gap-${gap_tablet} ${blok.custom_class} justify-items-${blok.align_items}`}
            style={tabletStyle}>
            {blok.grid_body.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} register={register} key={nestedBlok._uid} />
            ))}
          </div>
        </SbEditable>
      )}

      {MobileSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div
            className={`grid ${blok.no_of_columns_mobile} ${blok.custom_class_mobile} gap-${gap_mobile} justify-items-${blok.align_items}`}
            style={mobileStyle}>
            {blok.grid_body.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} register={register} key={nestedBlok._uid} />
            ))}
          </div>
        </SbEditable>
      )}
    </>
  );
};

export default Grid;
