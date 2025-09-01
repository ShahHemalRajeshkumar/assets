import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';
import EmailIcon from '../../icons/EmailCircle.svg';
import TwitterIcon from '../../icons/TwitterCircle.svg';
import FacebookIcon from '../../icons/FacebookCircle.svg';
import ShareLinkIcon from '../../icons/ShareLinkCircle.svg';
import WhatsAppCircle from '../../icons/WhatsAppCircle.svg';
import LinkedinCircle from '../../icons/LinkedinCircle.svg';
import { translateENtoDE } from '../../../functions/translator';
import { getTeacherTitle } from '../TeacherContent/TeacherContentHead/functions';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'next-share';

const TeacherPopupShareLinks = ({ teacher, onCopyLink, language, seoActions }) => {
  const { asPath } = useRouter();
  const title = translateENtoDE('MatchSpace', language);
  const pageUrl = useMemo(() => {
    return `${window?.location?.origin}${asPath.split('?')[0]}`;
  }, [asPath]);

  const updateShareSeo = useCallback(
    (type, name) => {
      if (seoActions?.share) {
        seoActions?.share(type, name);
      }
    },
    [seoActions]
  );
  const emailLink = useMemo(() => {
    let subject = `Music lessons by ${teacher?.name}`;
    let body = `Learn more about music lessons by ${
      teacher?.name
    } on Matchspace Music, the largest platform for music teachers in Switzerland. Click on the link below and have a look at the profile of ${
      teacher?.name?.split(' ')[0]
    }.\n\n${window?.location?.href}`;

    if (language === 'ch-de') {
      subject = `Musikunterricht von ${teacher?.name}`;
      body = `Erfahre mehr über den Musikunterricht von ${
        teacher?.name
      } auf Matchspace Music, der grössten Plattform für Musiklehrer*innen in der Schweiz. Klicke auf den Link, um dir das Profil von ${
        teacher?.name?.split(' ')[0]
      } anzuschauen.\n\n${window?.location?.href}`;
    }

    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [teacher, language]);

  return (
    <div id='share-modal' className='teacher-page-popup-share-links'>
      <div
        id='share-modal-link'
        onClick={() => {
          onCopyLink('url');
          updateShareSeo('link', 'page_teacher');
        }}
        className='cursor-pointer'>
        <ShareLinkIcon />
      </div>
      <a
        target='_blank'
        rel='noreferrer'
        href={emailLink}
        id='share-modal-email'
        className='cursor-pointer'
        onClick={() => updateShareSeo('email', 'page_teacher')}>
        <EmailIcon />
      </a>
      <WhatsappShareButton url={pageUrl} blankTarget={true} onClick={() => updateShareSeo('whatsapp', 'page_teacher')}>
        <WhatsAppCircle />
      </WhatsappShareButton>
      <FacebookShareButton
        url={pageUrl}
        title={title}
        blankTarget={true}
        id='share-modal-facebook'
        className='cursor-pointer'
        onClick={() => updateShareSeo('facebook', 'page_teacher')}>
        <FacebookIcon />
      </FacebookShareButton>
      <LinkedinShareButton
        url={pageUrl}
        blankTarget={true}
        id='share-modal-linkedin'
        className='cursor-pointer'
        title={getTeacherTitle(teacher, language)}
        onClick={() => updateShareSeo('linkedin', 'page_teacher')}>
        <LinkedinCircle />
      </LinkedinShareButton>
      <TwitterShareButton
        url={pageUrl}
        title={title}
        blankTarget={true}
        id='share-modal-twitter'
        className='cursor-pointer'
        onClick={() => updateShareSeo('twitter', 'page_teacher')}>
        <TwitterIcon />
      </TwitterShareButton>
    </div>
  );
};

export default TeacherPopupShareLinks;
