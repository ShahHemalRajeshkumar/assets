import React, { useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';

const DynamicComponent = dynamic(() => import('./DynamicComponent'));
import { extractClassValues } from '../utils/breakpoint';
import LinkRoute from '../utils/link-route';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const LinkComponent = ({ blok }) => {
  const responsiveClasses = useRef([...extractClassValues(blok)].join(' ').trim());

  const target = blok.new_window ? '_blank' : '_self';
  const path = LinkRoute(blok);

  return (
    <>
      {blok.components.length ? (
        <>
          {path !== undefined ? (
            <Link href={path} passHref>
              <a {...storyblokEditable(blok)} target={target}>
                <div className={responsiveClasses.current}>
                  <DynamicComponent blok={blok.components[0]} />
                </div>
              </a>
            </Link>
          ) : (
            <></>
          )}
        </>
      ) : (
        
          <div {...storyblokEditable(blok)}>
            {path[0] === 'h' ? (
              <Link href={path}>
                <a target={target} />
              </Link>
            ) : (
              <a href={path} target={target} />
            )}
          </div>
        
      )}
    </>
  );
};

export default LinkComponent;
