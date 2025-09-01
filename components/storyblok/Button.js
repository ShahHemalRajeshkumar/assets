import { storyblokEditable } from '@storyblok/react';
import DynamicComponent from '../DynamicComponent';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';
import { adjust } from 'ramda';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Button = ({ blok }) => {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  const [bgColor, setBgColor] = useState('');
  const [borderColor, setBorderColor] = useState('');

  useEffect(() => {
    if (bg_color?.color && border_color?.color) {
      setBgColor(bg_color?.color);
      setBorderColor(border_color?.color);
    }
  }, [blok]);

  const {
    custom_class,
    hover_border_color,
    bg_color,
    border_radius,
    button_text,
    icon_position,
    button_Icon,
    button_link,
    open_new_window,
    border_color,
    border_width,
    button_height,
    button_width,
    icon_width,
    icon_height,
    icon_margin_left,
    icon_margin_right,
    bg_transparent,
    button_width_desktop,
    button_height_desktop,
    button_width_tablet,
    button_height_tablet,
    button_width_mobile,
    button_height_mobile,
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
    hover_bg,
    hover_text,
  } = blok;

  const desktopStyle = {
    backgroundColor: bgColor,
    borderColor: borderColor,
    paddingTop: `${padding_top_desktop}px`,
    paddingLeft: `${padding_left_desktop}px`,
    paddingRight: `${padding_right_desktop}px`,
    paddingBottom: `${padding_bottom_desktop}px`,
    marginTop: `${margin_top_desktop}px`,
    marginLeft: `${margin_left_desktop}px`,
    marginRight: `${margin_right_desktop}px`,
    marginBottom: `${margin_bottom_desktop}px`,
    borderRadius: `${border_radius}px`,
  };

  const tabletStyle = {
    backgroundColor: bgColor,
    borderColor: borderColor,
    borderRadius: `${border_radius}px`,
    borderColor: border_color?.color,
    borderWidth: `${border_width}px`,
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
    backgroundColor: bgColor,
    borderColor: borderColor,
    borderRadius: `${border_radius}px`,
    paddingTop: `${padding_top_mobile}px`,
    paddingLeft: `${padding_left_mobile}px`,
    paddingRight: `${padding_right_mobile}px`,
    paddingBottom: `${padding_bottom_mobile}px`,
    marginTop: `${margin_top_mobile}px`,
    marginLeft: `${margin_left_mobile}px`,
    marginRight: `${margin_right_mobile}px`,
    marginBottom: `${margin_bottom_mobile}px`,
  };

  const IconStyle = {
    width: `${icon_width}px`,
    height: `${icon_height}px`,
    marginLeft: `${icon_margin_left}px`,
    marginRight: `${icon_margin_right}px`,
  };

  const image = button_Icon?.filename;

  const ICON = () => (
    <div>
      <Image src={image} alt='Icon' style={IconStyle} />{' '}
    </div>
  );

  const hover = (hover_bg, bg_transparent, border_width, hover_text) => {
    if (bg_transparent && border_width) {
      return 'hover:border-[#004252] hover:bg-[#004252]';
    }
    if (!bg_transparent) {
      return `hover:border-[${hover_bg?.color}] hover:bg-[${hover_bg?.color}]`;
    } else {
      return '';
    }
  };

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok._uid}>
          <a
            rel='noreferrer'
            href={button_link.url}
            target={open_new_window ? '_blank' : '_self'}
            className={`${custom_class} flex items-center justify-center w-auto h-auto border-2`}
            style={desktopStyle}
            onMouseEnter={() => {
              setBgColor(hover_bg?.color);
              setBorderColor(hover_border_color?.color);
            }}
            onMouseLeave={() => {
              setBgColor(bg_color?.color);
              setBorderColor(border_color?.color);
            }}
            {...storyblokEditable(blok)}>
            {image && icon_position == 0 && <ICON />}

            {button_text.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
            {image && icon_position == 1 && <ICON />}
          </a>
        </SbEditable>
      )}

      {TabletSize && (
        <SbEditable content={blok} key={blok._uid}>
          <a
            rel='noreferrer'
            href={button_link.url}
            target={open_new_window ? '_blank' : '_self'}
            className={`${custom_class} flex items-center justify-center w-auto h-auto`}
            style={tabletStyle}
            {...storyblokEditable(blok)}>
            {image && icon_position == 0 && <ICON />}

            {button_text.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
            {image && icon_position == 1 && <ICON />}
          </a>
        </SbEditable>
      )}

      {MobileSize && (
        <SbEditable content={blok} key={blok._uid}>
          <a
            rel='noreferrer'
            href={button_link.url}
            target={open_new_window ? '_blank' : '_self'}
            className={`${custom_class} flex items-center justify-center w-auto h-auto border-2`}
            style={mobileStyle}
            onMouseEnter={() => {
              setBgColor(hover_bg?.color);
              setBorderColor(hover_border_color?.color);
            }}
            onMouseLeave={() => {
              setBgColor(bg_color?.color);
              setBorderColor(border_color?.color);
            }}
            {...storyblokEditable(blok)}>
            {image && icon_position == 0 && <ICON />}

            {button_text.map((nestedBlok) => (
              <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
            {image && icon_position == 1 && <ICON />}
          </a>
        </SbEditable>
      )}
    </>
  );
};

export default Button;
