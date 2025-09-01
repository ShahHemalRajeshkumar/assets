import { storyblokEditable } from "@storyblok/react";

const DynamicComponent = dynamic(() => import('./DynamicComponent'));
import NotifyMeButton from '../components/searchPage/NotifyMeButton';
import { useRouter } from 'next/router';

import DialogComponent from './DialogComponent';
import NotifyMeForm from '../components/searchPage/NotifyMeForm';

import React, { useRef } from 'react';
import LinkRoute from '../utils/link-route';
import { extractClassValues } from '../utils/breakpoint';
import { addPrefix } from '../utils/text';
import dynamic from 'next/dynamic';

const replaceCommas = (string) => string?.replace(/-/g, ', ');

const capitalizeWords = (string) =>
  string?.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });

const getLanguage = (router) =>
  router?.query?.language ? router.query.language : router.pathname.slice(1, 6) || 'ch-de';

const ButtonComponent = ({ blok, instruments = {}, slug }) => {
  const router = useRouter();
  const ref = useRef();

  const { language } = router.query;

  const formattedSlug = capitalizeWords(replaceCommas(slug)) || '';

  const responsiveClasses = useRef(
    [
      blok.background_color,
      blok.border_radius,
      addPrefix('text-', blok.text_color),
      addPrefix('hover:', blok.hover_background_color),
      addPrefix('hover:text-', blok.hover_text_color),
      ...extractClassValues(blok),
      'focus:outline-none',
    ]
      .join(' ')
      .trim()
  );

  const modalShowHide = (flag) => (flag ? ref.current?.showModal() : ref.current?.close());

  const target = blok.new_window ? '_blank' : '_self';

  const buttonText = blok.components[0]?.text?.content[0]?.content[0]?.text;

  return (
    <div {...storyblokEditable(blok)}>
      {blok.open_modal === 'notification-form' ? (
        <NotifyMeButton
          sbText={buttonText}
          language={getLanguage(router)}
          sbClasses={responsiveClasses}
          onClick={() => modalShowHide(true)}
        />
      ) : (
        <a href={LinkRoute(blok) || '#'} target={target} className='flex'>
          <span className={responsiveClasses.current}>
            {blok.components.map((component) => (
              <DynamicComponent blok={component} key={component._uid} inline />
            ))}
          </span>
        </a>
      )}
      <DialogComponent ref={ref}>
        <NotifyMeForm ref={ref} language={getLanguage(router)} instruments={instruments} location={formattedSlug} />
      </DialogComponent>
      </div>
  );
};

export default ButtonComponent;
