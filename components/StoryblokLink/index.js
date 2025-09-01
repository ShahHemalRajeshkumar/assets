import Link from 'next/link';
import { Children, cloneElement, useRef } from 'react';

import { getStoryblokLink } from './getStoryblokLink';
import { extractClassValues } from '../../utils/breakpoint';

const StoryblokLink = ({ blok }) => {
  const ref = useRef();

  const { link, text, children } = blok

  const responsiveClasses = useRef([
    ...extractClassValues(blok),
  ].join(' ').trim());

  const href = getStoryblokLink(link);


  if (!link || (!link.cached_url && !link.url && !link.cachedUrl)) {
    return <></>
  }


  return (
    link.linktype === 'url' ? (
      <a className={responsiveClasses?.current} ref={ref} href={href} target="_blank" rel="noreferrer">
        {text}
      </a>
    ) : (
      <Link ref={ref} href={href}>
        <a className={responsiveClasses?.current}>
          {text}
        </a>
      </Link>
    )
  )

}

export default StoryblokLink
