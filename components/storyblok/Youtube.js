import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';

const Youtube = ({ blok }) => {
 const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  const {
    custom_class = '',
    youtube_url = '',

    width_desktop = 0,
    height_desktop = 0,
    padding_top_desktop = 0,
    padding_left_desktop = 0,
    padding_right_desktop = 0,
    padding_bottom_desktop = 0,
    margin_top_desktop = 0,
    margin_bottom_desktop = 0,
    margin_left_desktop = 0,
    margin_right_desktop = 0,

    width_mobile = 0,
    height_mobile = 0,
    padding_top_mobile = 0,
    padding_left_mobile = 0,
    padding_right_mobile = 0,
    padding_bottom_mobile = 0,
    margin_top_mobile = 0,
    margin_bottom_mobile = 0,
    margin_left_mobile = 0,
    margin_right_mobile = 0,

    width_tablet = 0,
    height_tablet = 0,
    padding_top_tablet = 0,
    padding_left_tablet = 0,
    padding_right_tablet = 0,
    padding_bottom_tablet = 0,
    margin_top_tablet = 0,
    margin_bottom_tablet = 0,
    margin_left_tablet = 0,
    margin_right_tablet = 0,
  } = blok;

  const desktopStyle = {
    paddingTop: `${padding_top_desktop}px`,
    paddingLeft: `${padding_left_desktop}px`,
    paddingRight: `${padding_right_desktop}px`,
    paddingBottom: `${padding_bottom_desktop}px`,
    marginTop: `${margin_top_desktop}px`,
    marginLeft: `${margin_left_desktop}px`,
    marginRight: `${margin_right_desktop}px`,
    marginBottom: `${margin_bottom_desktop}px`,
    width: `${width_desktop}px`,
    height: `${height_desktop}px`,
  };

  const mobileStyle = {
    paddingTop: `${padding_top_mobile}px`,
    paddingLeft: `${padding_left_mobile}px`,
    paddingRight: `${padding_right_mobile}px`,
    paddingBottom: `${padding_bottom_mobile}px`,
    marginTop: `${margin_top_mobile}px`,
    marginLeft: `${margin_left_mobile}px`,
    marginRight: `${margin_right_mobile}px`,
    marginBottom: `${margin_bottom_mobile}px`,
    width: `${width_mobile}px`,
    height: `${height_mobile}px`,
  };

  const tabletStyle = {
    paddingTop: `${padding_top_tablet}px`,
    paddingLeft: `${padding_left_tablet}px`,
    paddingRight: `${padding_right_tablet}px`,
    paddingBottom: `${padding_bottom_tablet}px`,
    marginTop: `${margin_top_tablet}px`,
    marginLeft: `${margin_left_tablet}px`,
    marginRight: `${margin_right_tablet}px`,
    marginBottom: `${margin_bottom_tablet}px`,
    width: `${width_tablet}px`,
    height: `${height_tablet}px`,
  };

  const videoString = youtube_url || null;
  const valueAfterEquals = videoString?.includes('=') ? videoString.split('=')[1] : null;
  const src = `https://www.youtube.com/embed/${valueAfterEquals}`;

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div style={{ width: !blok?.full_width ? `${blok?.width_desktop}px` : '100%', height: desktopStyle?.height }}  {...storyblokEditable(blok)}>
            <iframe
              className={custom_class}
              style={{ position: "relative",
                height: "100%",
                width: "100%" }}
              //style={desktopStyle}
              src={src}
              width={desktopStyle.width}
              height={desktopStyle.height}
              loading='lazy'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen='true'></iframe>
          </div>
        </SbEditable>
      )}

      {TabletSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div style={{width: tabletStyle?.width, height: tabletStyle?.height}} {...storyblokEditable(blok)}>
            <iframe
              className={custom_class}
              style={{ position: "relative",
                height: "100%",
                width: "100%" }}
              src={src}
              width={tabletStyle.width}
              height={tabletStyle.height}
              loading='lazy'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen='true'></iframe>
          </div>
        </SbEditable>
      )}

      {MobileSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div style={{width: "100%" , height: mobileStyle?.height }} {...storyblokEditable(blok)}>
            <iframe
            style={{ position: "relative",
              height: "100%",
              width: "100%" }}
              src={src}
              loading='lazy'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen='true'></iframe>
          </div>
        </SbEditable>
      )}
    </>
  );
};

export default Youtube;