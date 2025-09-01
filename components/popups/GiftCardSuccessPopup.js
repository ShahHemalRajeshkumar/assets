import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import TeacherPopup from '../TeacherInfoPage/TeacherPopup';

const GiftCardSuccessPopup = () => {
  const { query, pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const language = query?.language || 'ch-en';

  const hidePopup = useCallback(() => setIsOpen(false), []);
  const showPopup = useCallback(() => {
    setIsOpen(true);
    window.history.pushState(null, '', window.location.pathname);
  }, []);

  useEffect(() => {
    if (query?.['giftcard'] && query?.['giftcard'] === 'success') {
      showPopup(true);
    }
  }, [query, showPopup]);

  const title = language === 'ch-en' ? 'Many thanks for your purchase' : 'Vielen Dank für deinen Kauf';
  const message =
    language === 'ch-en'
      ? 'Please check your e-mail inbox (and your spam folder) for the confirmation of your purchase and all necessary instructions. A new musical journey begins!'
      : 'Bitte überprüfe deinen E-Mail-Posteingang (und den Spam-Ordner) für die Bestätigung des Kaufs und alle notwendigen Anweisungen. Eine neue musikalische Reise beginnt!';

  if (!isOpen || '/[language]' !== pathname) return null;

  return (
    <TeacherPopup name='gift-card-success' isFullViewModal={true} isFullModalStyle={true} onClose={hidePopup}>
      <div className='max-w-[400px] min-h-[140px] flex-col justify-center'>
        <div className='tx-primary text-[22px] font-[600] leading-[26px] mt-[30px] mb-[12px] text-center'>{title}</div>
        <div className='tx-secondary text-[16px] leading-[20px] text-center mx-[15px] mb-[30px]'>{message}</div>
      </div>
    </TeacherPopup>
  );
};

export default GiftCardSuccessPopup;
