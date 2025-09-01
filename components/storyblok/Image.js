import { storyblokEditable } from '@storyblok/react';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';
import NextImage from 'next/image';
import { useState } from 'react';

//'flex justify-center w-full'
const Image = ({ blok }) => {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  const DesktopImage = blok.image?.filename;
  const TabletImage = blok.image?.filename;
  const MobileImage = blok.image?.filename;

  const {
    opacity = true,
    centered_image,
    image_align,
    custom_class = '',

    image_width_desktop,
    image_height_desktop,
    padding_top_desktop = 0,
    padding_left_desktop = 0,
    padding_right_desktop = 0,
    padding_bottom_desktop = 0,
    margin_top_desktop = 0,
    margin_left_desktop = 0,
    margin_right_desktop = 0,
    margin_bottom_desktop = 0,
    border_radius_desktop,

    image_width_tablet,
    image_height_tablet,
    padding_top_tablet = 0,
    padding_left_tablet = 0,
    padding_right_tablet = 0,
    padding_bottom_tablet = 0,
    margin_top_tablet = 0,
    margin_left_tablet = 0,
    margin_right_tablet = 0,
    margin_bottom_tablet = 0,
    border_radius_tablet,

    image_width_mobile,
    image_height_mobile,
    padding_top_mobile = 0,
    padding_left_mobile = 0,
    padding_right_mobile = 0,
    padding_bottom_mobile = 0,
    margin_top_mobile = 0,
    margin_left_mobile = 0,
    margin_right_mobile = 0,
    margin_bottom_mobile = 0,
    border_radius_mobile,
  } = blok;

  const desktopStyle = {
    alignItems: 'center',
    width: `${image_width_desktop}px`,
    height: `${image_height_desktop}px`,
    justifySelf: image_align,

    paddingTop: `${padding_top_desktop}px`,
    paddingLeft: `${padding_left_desktop}px`,
    paddingRight: `${padding_right_desktop}px`,
    paddingBottom: `${padding_bottom_desktop}px`,
    marginTop: `${margin_top_desktop}px`,
    marginLeft: `${margin_left_desktop}px`,
    marginRight: `${margin_right_desktop}px`,
    marginBottom: `${margin_bottom_desktop}px`,
    borderRadius: `${border_radius_desktop}px`,
  };
  const tabletStyle = {
    alignItems: 'center',
    width: `${image_width_tablet}px`,
    height: `${image_height_tablet}px`,
    justifySelf: image_align,

    paddingTop: `${padding_top_tablet}px`,
    paddingLeft: `${padding_left_tablet}px`,
    paddingRight: `${padding_right_tablet}px`,
    paddingBottom: `${padding_bottom_tablet}px`,
    marginTop: `${margin_top_tablet}px`,
    marginLeft: `${margin_left_tablet}px`,
    marginRight: `${margin_right_tablet}px`,
    marginBottom: `${margin_bottom_tablet}px`,
    borderRadius: `${border_radius_tablet}px`,
  };

  const mobileStyle = {
    alignItems: 'center',
    width: `${image_width_mobile}px`,
    height: `${image_height_mobile}px`,
    justifySelf: image_align,

    paddingTop: `${padding_top_mobile}px`,
    paddingLeft: `${padding_left_mobile}px`,
    paddingRight: `${padding_right_mobile}px`,
    paddingBottom: `${padding_bottom_mobile}px`,
    marginTop: `${margin_top_mobile}px`,
    marginLeft: `${margin_left_mobile}px`,
    marginRight: `${margin_right_mobile}px`,
    marginBottom: `${margin_bottom_mobile}px`,
    borderRadius: `${border_radius_mobile}px`,
  };

  const image = blok.image?.filename;
  const icon = blok?.icon?.filename;

  const ICON = () => (
    <div className='absolute bottom-0 -right-6 bg-transparent'>
      <a rel='noreferrer' href={blok.link?.url} target='_blank'>
        <img src={icon} className='cursor-pointer' alt='image' style={{ width: '60px', height: '60px' }} />
      </a>
    </div>
  );

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok._uid}>
          <a
            {...(blok.link_image?.url ? {href:blok.link_image?.url}: {})}
            //href={blok.link_image?.url}
            rel='noreferrer'
            target={blok?.open_new_window ? '_blank' : '_self'}
            className={`${blok?.link_image?.url ? 'cursor-pointer' : 'cursor-default'}`}>
            <div className={`${blok.centered_image_desktop ? 'flex justify-center w-full' : null}`}>
              <div className='relative inline-block'>
                <NextImage
                  src={DesktopImage}
                  className={`${blok.custom_class}`}
                  style={desktopStyle}
                  {...storyblokEditable(blok)}
                  alt='image'
                  width={image_width_desktop || 1440}
                  height={image_height_desktop || 280}
                  priority={true}
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp/9k="
                />
                {blok.linkdin_icon && <ICON />}
              </div>
            </div>
          </a>
        </SbEditable>
      )}

      {TabletSize && (
        <SbEditable content={blok} key={blok._uid}>
          <a
            {...(blok.link_image?.url ? {href:blok.link_image?.url}: {})}
            //href={blok.link_image?.url}
            rel='noreferrer'
            target={blok?.open_new_window ? '_blank' : '_self'}
            className={`${blok?.link_image?.url ? 'cursor-pointer' : 'cursor-default'}`}>
            <div className={`${blok.centered_image_tablet ? 'flex justify-center w-full relative' : null}`}>
              <div className='relative inline-block'>
                <NextImage
                  src={TabletImage}
                  className={`${blok.custom_class} `}
                  style={tabletStyle}
                  {...storyblokEditable(blok)}
                  alt='image'
                  width={image_width_tablet || 1024}
                  height={image_height_tablet || 280}
                  priority={false}
                  quality={75}
                  loading="lazy"
                />
                {blok.linkdin_icon && <ICON />}
              </div>
            </div>
          </a>
        </SbEditable>
      )}

      {MobileSize && (
        <SbEditable content={blok} key={blok._uid}>
          <a
          {...(blok.link_image?.url ? {href:blok.link_image?.url}: {})}
          //  href={blok.link_image?.url}
            rel='noreferrer'
            target={blok?.open_new_window ? '_blank' : '_self'}
            className={`${blok?.link_image?.url ? 'cursor-pointer' : 'cursor-default'}`}>
            <div className={`${blok.centered_image_mobile ? 'flex justify-center w-full relative' : null}`}>
              <div className='relative inline-block'>
                <NextImage
                  src={MobileImage}
                  className={`${blok.custom_class} `}
                  style={mobileStyle}
                  {...storyblokEditable(blok)}
                  alt='image'
                  width={image_width_mobile || 375}
                  height={image_height_mobile || 130}
                  priority={false}
                  quality={75}
                  loading="lazy"
                />
                {blok.linkdin_icon && <ICON />}
              </div>
            </div>
          </a>
        </SbEditable>
      )}
    </>
  );
};

export default Image;
