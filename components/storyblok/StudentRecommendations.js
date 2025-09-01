import { storyblokEditable } from '@storyblok/react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';

const StudentRecommendations = ({ blok }) => {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  const router = useRouter();

  const currentUrl = router.asPath; // Gets the current path including query parameters

  let language;
  let ClassNames;

  if (currentUrl.includes('ch-de')) {
    language = 'ch-de';
  } else currentUrl = 'ch-en';

  if (language === 'ch-de') {
    ClassNames = 'elfsight-app-edd672e9-da4b-417f-bc55-d953c937b96b';
  } else ClassNames = 'elfsight-app-14c20c44-6945-494c-a6ed-3afe4743fa2f';

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok}>
          <div {...storyblokEditable(blok)}>
            <div className={ClassNames} data-elfsight-app-lazy></div>
          </div>
          <Script src='https://static.elfsight.com/platform/platform.js' async />
        </SbEditable>
      )}

      {TabletSize && (
        <SbEditable content={blok} key={blok}>
          <div {...storyblokEditable(blok)}>
            <div className={ClassNames} data-elfsight-app-lazy></div>
          </div>
          <Script src='https://static.elfsight.com/platform/platform.js' async />
        </SbEditable>
      )}

      {MobileSize && (
        <SbEditable content={blok} key={blok}>
          <div {...storyblokEditable(blok)}>
            <div className={ClassNames} data-elfsight-app-lazy></div>
          </div>
          <Script src='https://static.elfsight.com/platform/platform.js' async />
        </SbEditable>
      )}
    </>
  );
};

export default StudentRecommendations;
