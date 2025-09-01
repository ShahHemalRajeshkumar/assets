import { extractClassValues, extractResponsiveValues } from '@/utils/breakpoint';
import { addPrefix } from '@/utils/text';
import { storyblokEditable } from '@storyblok/react';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';

const Text = ({ blok }) => {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  // Destructure with defaults
  const {
    text = '',
    sep_position,
    custom_class = '',
    line_height = 1.5,
    hover_color = { color: '#000' },

    font_size_desktop = 16, // default font size
    font_weight_desktop = 400, // default font weight
    font_color_desktop = { color: '#000' }, // default color
    padding_top_desktop = 0,
    padding_left_desktop = 0,
    padding_right_desktop = 0,
    padding_bottom_desktop = 0,
    margin_top_desktop = 0,
    margin_left_desktop = 0,
    margin_right_desktop = 0,
    margin_bottom_desktop = 0,
    text_align_desktop,

    font_size_tablet = 14, // default font size
    font_weight_tablet = 400, // default font weight
    font_color_tablet = { color: '#000' }, // default color
    padding_top_tablet = 0,
    padding_left_tablet = 0,
    padding_right_tablet = 0,
    padding_bottom_tablet = 0,
    margin_top_tablet = 0,
    margin_left_tablet = 0,
    margin_right_tablet = 0,
    margin_bottom_tablet = 0,
    text_align_tablet,

    font_size_mobile = 12, // default font size
    font_weight_mobile = 400, // default font weight
    font_color_mobile = { color: '#000' }, // default color
    padding_top_mobile = 0,
    padding_left_mobile = 0,
    padding_right_mobile = 0,
    padding_bottom_mobile = 0,
    margin_top_mobile = 0,
    margin_left_mobile = 0,
    margin_right_mobile = 0,
    margin_bottom_mobile = 0,
    text_align_mobile,
  } = blok;

  // Generate style object
  const desktopStyle = {
    lineHeight: `${line_height}`,
    textAlign: text_align_desktop,
    fontSize: `${font_size_desktop}px`,
    fontWeight: font_weight_desktop,
    color: font_color_desktop.color || 'transparent',
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
    lineHeight: `${line_height}`,
    textAlign: text_align_tablet,
    fontSize: `${font_size_tablet}px`,
    fontWeight: font_weight_tablet,
    color: font_color_tablet.color || 'transparent',
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
    lineHeight: `${line_height}`,
    textAlign: text_align_mobile,
    fontSize: `${font_size_mobile}px`,
    fontWeight: font_weight_mobile,
    color: font_color_mobile.color || 'transparent',
    paddingTop: `${padding_top_mobile}px`,
    paddingLeft: `${padding_left_mobile}px`,
    paddingRight: `${padding_right_mobile}px`,
    paddingBottom: `${padding_bottom_mobile}px`,
    marginTop: `${margin_top_mobile}px`,
    marginLeft: `${margin_left_mobile}px`,
    marginRight: `${margin_right_mobile}px`,
    marginBottom: `${margin_bottom_mobile}px`,
  };

  const iconStyle = {
    width: `${blok.icon_width}px`,
    height: `${blok.icon_height}px`,
    marginLeft: `${blok.icon_margin_left}px`,
    marginRight: `${blok.icon_margin_right}px`,
    marginTop: `${blok.icon_margin_top}px`,
    marginBottom: `${blok.icon_margin_bottom}px`,
  };

  const Separator = () => {
    return (
      <hr
        className={`${sep_position} w-[108px] h-[4px] mx-auto bg-[#21697c] border-0 rounded dark:bg-[#21697c] mt-2 mb-4`}
      />
    );
  };

  const ICON = () => <img className='inline' src={image} alt='Icon' style={iconStyle} />;

  const image = blok.text_icon?.filename;

  const h_color = hover_color?.color || 'transparent';

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div style={desktopStyle} {...storyblokEditable(blok)}>
            <div class={`${blok?.custom_class} inline-block`}>
              {image && blok.icon_position == 0 && <ICON />}
              <span className={`${custom_class}  hover:text-[${h_color}]`}>{text}</span>
              {image && blok.icon_position == 1 && <ICON />}
            </div>
            {blok.separator ? <Separator /> : null}
          </div>
        </SbEditable>
      )}
      {TabletSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div style={tabletStyle} {...storyblokEditable(blok)}>
            <div class='inline-block'>
              {image && blok.icon_position == 0 && <ICON />}
              <span className={`${custom_class} leading-${line_height} inline hover:text-[${h_color}]`}>{text}</span>
              {image && blok.icon_position == 1 && <ICON />}
            </div>
            {blok.separator ? <Separator /> : null}
          </div>
        </SbEditable>
      )}
      {MobileSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div style={mobileStyle} {...storyblokEditable(blok)}>
            <div class='inline-block'>
              {image && blok.icon_position == 0 && <ICON />}
              <span className={`${custom_class} leading-${line_height} inline hover:text-[${h_color}]`}>{text}</span>
              {image && blok.icon_position == 1 && <ICON />}
            </div>
            {blok.separator ? <Separator /> : null}
          </div>
        </SbEditable>
      )}
    </>
  );
};

export default Text;
