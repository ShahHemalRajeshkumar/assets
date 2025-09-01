import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';

const Banner = ({ blok }) => {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  const backgroundImage = blok.bg_image_desktop?.filename;

  const {
    banner_body = [],
    align_items = 'center',
    custom_class = '',
    bg_color_desktop = '#0000',
    padding_top_desktop = 0,
    padding_left_desktop = 0,
    padding_right_desktop = 0,
    padding_bottom_desktop = 0,
    margin_top_desktop = 0,
    margin_left_desktop = 0,
    margin_right_desktop = 0,
    margin_bottom_desktop = 0,
    banner_height_desktop = 0,

    bg_color_tablet = '#0000',
    padding_top_tablet = 0,
    padding_left_tablet = 0,
    padding_right_tablet = 0,
    padding_bottom_tablet = 0,
    margin_top_tablet = 0,
    margin_left_tablet = 0,
    margin_right_tablet = 0,
    margin_bottom_tablet = 0,
    banner_height_tablet = 0,

    bg_color_mobile = '#0000',
    padding_top_mobile = 0,
    padding_left_mobile = 0,
    padding_right_mobile = 0,
    padding_bottom_mobile = 0,
    margin_top_mobile = 0,
    margin_left_mobile = 0,
    margin_right_mobile = 0,
    margin_bottom_mobile = 0,
    banner_height_mobile = 0,
  } = blok;

  const desktopStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: align_items,
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: bg_color_desktop?.color || 'transparent',
    backgroundSize: 'cover',
    paddingTop: `${padding_top_desktop}px`,
    paddingLeft: `${padding_left_desktop}px`,
    paddingRight: `${padding_right_desktop}px`,
    paddingBottom: `${padding_bottom_desktop}px`,
    marginTop: `${margin_top_desktop}px`,
    marginLeft: `${margin_left_desktop}px`,
    marginRight: `${margin_right_desktop}px`,
    marginBottom: `${margin_bottom_desktop}px`,
    height: banner_height_desktop == 0 ? '100vh' : `${banner_height_desktop}px`,
  };

  const tabletStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: align_items,
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: bg_color_tablet?.color || 'transparent',
    backgroundSize: 'cover',
    paddingTop: `${padding_top_tablet}px`,
    paddingLeft: `${padding_left_tablet}px`,
    paddingRight: `${padding_right_tablet}px`,
    paddingBottom: `${padding_bottom_tablet}px`,
    marginTop: `${margin_top_tablet}px`,
    marginLeft: `${margin_left_tablet}px`,
    marginRight: `${margin_right_tablet}px`,
    marginBottom: `${margin_bottom_tablet}px`,
    height: banner_height_tablet == 0 ? '100vh' : `${banner_height_tablet}px`,
  };

  const mobileStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: align_items,
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: bg_color_mobile?.color || 'transparent',
    backgroundSize: 'cover',
    paddingTop: `${padding_top_mobile}px`,
    paddingLeft: `${padding_left_mobile}px`,
    paddingRight: `${padding_right_mobile}px`,
    paddingBottom: `${padding_bottom_mobile}px`,
    marginTop: `${margin_top_mobile}px`,
    marginLeft: `${margin_left_mobile}px`,
    marginRight: `${margin_right_mobile}px`,
    marginBottom: `${margin_bottom_mobile}px`,
    height: banner_height_mobile == 0 ? '100vh' : `${banner_height_mobile}px`,
  };

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div
            className={`${custom_class} bg-contain bg-center h-screen relative`}
            style={desktopStyle}
            {...storyblokEditable(blok)}>
            <div className='absolute inset-0 bg-black opacity-50 filter brightness-50'></div>
            <div className='relative z-10'>
              {banner_body.map((nestedBlok) => (
                <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
              ))}
            </div>
          </div>
        </SbEditable>
      )}

      {TabletSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div
            className={`${custom_class} bg-contain bg-center h-screen relative`}
            style={tabletStyle}
            {...storyblokEditable(blok)}>
            <div className='absolute inset-0 bg-black opacity-50 filter brightness-50'></div>
            <div className='relative z-10'>
              {banner_body.map((nestedBlok) => (
                <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
              ))}
            </div>
          </div>
        </SbEditable>
      )}

      {MobileSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div
            className={`${custom_class} bg-contain bg-center h-screen relative`}
            style={mobileStyle}
            {...storyblokEditable(blok)}>
            <div className='absolute inset-0 bg-black opacity-50 filter brightness-50'></div>
            <div className='relative z-10'>
              {banner_body.map((nestedBlok) => (
                <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
              ))}
            </div>
          </div>
        </SbEditable>
      )}
    </>
  );
};

export default Banner;
