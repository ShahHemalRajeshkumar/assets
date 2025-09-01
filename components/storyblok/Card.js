import cx from 'classnames';
import SbEditable from 'storyblok-react';
import { useMediaQuery } from 'react-responsive';
import { storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';

const Card = ({ blok }) => {
  const handleClick = (e) => {
    if (blok?.card_link?.url === undefined) {
      return;
    } else {
      e?.preventDefault();
    }
  };

  const MobileSize = useMediaQuery({ maxWidth: 599 });
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });

  const backgroundTablet = blok?.bg_image_tablet?.filename;
  const backgroundMobile = blok?.bg_image_mobile?.filename;
  const backgroundDesktop = blok?.bg_image_desktop?.filename;

  const {
    align_items = 'center',
    custom_class = '',
    justify_content,
    card_link,
    open_new_window,

    bg_color_desktop = '#0000',
    padding_top_desktop = 0,
    padding_left_desktop = 0,
    padding_right_desktop = 0,
    padding_bottom_desktop = 0,
    margin_top_desktop = 0,
    margin_left_desktop = 0,
    margin_right_desktop = 0,
    margin_bottom_desktop = 0,
    border_radius_desktop,
    border_color_desktop,
    border_width_desktop,

    bg_color_tablet = '#0000',
    padding_top_tablet = 0,
    padding_left_tablet = 0,
    padding_right_tablet = 0,
    padding_bottom_tablet = 0,
    margin_top_tablet = 0,
    margin_left_tablet = 0,
    margin_right_tablet = 0,
    margin_bottom_tablet = 0,
    border_radius_tablet,
    border_color_tablet,
    border_width_tablet,

    bg_color_mobile = '#0000',
    padding_top_mobile = 0,
    padding_left_mobile = 0,
    padding_right_mobile = 0,
    padding_bottom_mobile = 0,
    margin_top_mobile = 0,
    margin_left_mobile = 0,
    margin_right_mobile = 0,
    margin_bottom_mobile = 0,
    border_radius_mobile,
    border_color_mobile,
    border_width_mobile,
  } = blok;

  const desktopStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    backgroundSize: 'cover',
    justifyContent: justify_content,
    alignItems: align_items,
    backgroundImage: `url(${backgroundDesktop})`,
    backgroundColor: bg_color_desktop?.color || 'transparent',
    paddingTop: `${padding_top_desktop}px`,
    paddingLeft: `${padding_left_desktop}px`,
    paddingRight: `${padding_right_desktop}px`,
    paddingBottom: `${padding_bottom_desktop}px`,
    marginTop: `${margin_top_desktop}px`,
    marginLeft: `${margin_left_desktop}px`,
    marginRight: `${margin_right_desktop}px`,
    marginBottom: `${margin_bottom_desktop}px`,
    borderRadius: `${border_radius_desktop}px`,
    borderColor: border_color_desktop?.color || 'transparent',
    borderWidth: `${border_width_desktop}px`,
  };

  const tabletStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    backgroundSize: 'cover',
    justifyContent: justify_content,
    alignItems: align_items,
    backgroundImage: `url(${backgroundTablet})`,
    backgroundColor: bg_color_tablet?.color || 'transparent',
    paddingTop: `${padding_top_tablet}px`,
    paddingLeft: `${padding_left_tablet}px`,
    paddingRight: `${padding_right_tablet}px`,
    paddingBottom: `${padding_bottom_tablet}px`,
    marginTop: `${margin_top_tablet}px`,
    marginLeft: `${margin_left_tablet}px`,
    marginRight: `${margin_right_tablet}px`,
    marginBottom: `${margin_bottom_tablet}px`,
    borderRadius: `${border_radius_tablet}px`,
    borderColor: border_color_tablet?.color || 'transparent',
    borderWidth: `${border_width_tablet}px`,
  };

  const mobileStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',

    backgroundImage: `url(${backgroundMobile})`,
    backgroundColor: bg_color_mobile?.color || 'transparent',
    backgroundSize: 'cover',
    justifyContent: justify_content,
    alignItems: align_items,
    paddingTop: `${padding_top_mobile}px`,
    paddingLeft: `${padding_left_mobile}px`,
    paddingRight: `${padding_right_mobile}px`,
    paddingBottom: `${padding_bottom_mobile}px`,
    marginTop: `${margin_top_mobile}px`,
    marginLeft: `${margin_left_mobile}px`,
    marginRight: `${margin_right_mobile}px`,
    marginBottom: `${margin_bottom_mobile}px`,
    borderRadius: `${border_radius_mobile}px`,
    borderColor: border_color_mobile?.color || 'transparent',
    borderWidth: `${border_width_mobile}px`,
  };

  const target = open_new_window ? { rel: 'noreferrer', target: '_blank' } : { target: '_self' };
  const linkClassName = cx(`${blok?.custom_class} shadow-${blok?.shadow ? 'lg' : ''}`, {
    'cursor-pointer': card_link?.url,
    'cursor-default': !card_link?.url,
  });

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok._uid}>
          <a
            {...target}
            style={desktopStyle}
            href={card_link?.url}
            className={linkClassName}
            onClick={!card_link?.url ? handleClick : undefined}
            {...storyblokEditable(blok)}>
            {blok.card_body.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </a>
        </SbEditable>
      )}
      {TabletSize && (
        <SbEditable content={blok} key={blok._uid}>
          <a
            {...target}
            style={tabletStyle}
            href={card_link?.url}
            className={linkClassName}
            onClick={!card_link?.url ? handleClick : undefined}
            {...storyblokEditable(blok)}>
            {blok.card_body.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </a>
        </SbEditable>
      )}
      {MobileSize && (
        <SbEditable content={blok} key={blok._uid}>
          <a
            {...target}
            style={mobileStyle}
            href={card_link?.url}
            className={linkClassName}
            onClick={!card_link?.url ? handleClick : undefined}
            {...storyblokEditable(blok)}>
            {blok.card_body.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </a>
        </SbEditable>
      )}
    </>
  );
};

export default Card;
