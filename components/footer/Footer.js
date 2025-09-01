import React from 'react';
import cx from 'classnames';
import FooterTopBar from './FooterTopBar/FooterTopBar';
import FooterBottomBar from './FooterBottomBar/FooterBottomBar';

const Footer = ({ story, isTeacherInfoPage }) => {
  const blok =
    story?.body?.find((comp) => comp.component === 'global_reference')?.reference || {};

  let language = blok?.full_slug || 'ch-en';

  if (language.includes('ch-de')) {
    language = 'ch-de';
  } else {
    language = 'ch-en';
  }
  return (
    <footer
      className={cx(
        'flex flex-col px-6 bg-light-grey-200 lg:px-20 border-t-2 border-transparent',
        {
          'mt-[64px] border-t-border-disable': !isTeacherInfoPage,
        }
      )}
    >
      <div className="min-h-[120px]">
        <FooterTopBar
          language={language}
          isTeacherInfoPage={isTeacherInfoPage}
          footerData={blok?.content?.footer}
          blok={blok}
        />
      </div>
      <div className="min-h-[60px]">
        <FooterBottomBar blok={blok} />
      </div>
    </footer>
  );
};
Footer.displayName = 'Footer';
export default Footer;
