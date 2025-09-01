import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import { Element } from 'react-scroll';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';

const Container = ({ blok }) => {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  const backgroundDesktop = blok.bg_image_desktop?.filename;
  const backgroundTablet = blok.bg_image_tablet?.filename;
  const backgroundMobile = blok.bg_image_mobile?.filename;

  const {
    opacity = true,

    align_items = 'center',
    custom_class = '',
    justify_content = 'center',

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
    align_items_tablet = 'center',

    bg_color_mobile = '#0000',
    padding_top_mobile = 0,
    padding_left_mobile = 0,
    padding_right_mobile = 0,
    padding_bottom_mobile = 0,
    margin_top_mobile = 0,
    margin_left_mobile = 0,
    margin_right_mobile = 0,
    margin_bottom_mobile = 0,
    align_items_mobile = 'center',
  } = blok;

  const desktopStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: justify_content,
    alignItems: align_items,
    backgroundImage: `url(${backgroundDesktop})`,
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
  };

  const tabletStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: justify_content,
    alignItems: align_items_tablet,
    backgroundImage: `url(${backgroundTablet})`,
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
  };

  const mobileStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: justify_content,
    alignItems: align_items_mobile,
    backgroundImage: `url(${backgroundMobile})`,
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
  };

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok._uid}>
          <Element id={blok.reference_id} name={blok.reference_id}>
            <div
              id={blok.container_id}
              className={`${blok.custom_class} grid items-center`}
              style={desktopStyle}
              {...storyblokEditable(blok)}>
              <div className='max-w-[1440px]'>
                {blok.container_body.map((nestedBlok) => (
                  <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
                ))}
              </div>
            </div>
          </Element>
        </SbEditable>
      )}

      {TabletSize && (
        <SbEditable content={blok} key={blok._uid}>
          <Element id={blok.reference_id} name={blok.reference_id}>
            <div
              id={blok.container_id}
              className={`${blok.custom_class}`}
              style={tabletStyle}
              {...storyblokEditable(blok)}>
              {blok.container_body.map((nestedBlok) => (
                <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
              ))}
            </div>
          </Element>
        </SbEditable>
      )}

      {MobileSize && (
        <SbEditable content={blok} key={blok._uid}>
          <Element id={blok.reference_id} name={blok.reference_id}>
            <div
              id={blok.container_id}
              className={`${blok.custom_class} `}
              style={mobileStyle}
              {...storyblokEditable(blok)}>
              {blok.container_body.map((nestedBlok) => (
                <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
              ))}
            </div>
          </Element>
        </SbEditable>
      )}
    </>
  );
};

export default Container;
