import cx from 'classnames';
import { useRef, useState, useCallback } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import ChevronDown from '../icons/ChevronDown.svg';
import GlobalIcon from '../icons/Global.svg';
import Checked from '../icons/Checked.svg';

const LangToggle = ({ language, isMobile, setLanguage }) => {
  const langRef = useRef();
  const [visible, setVisible] = useState(false);

  const onClose = useCallback(() => setVisible(false), []);
  const onToggle = useCallback(() => setVisible((value) => !value), []);

  useOutsideClick(langRef, onClose);

  const onChangeLang = useCallback(
    (value) => {
      if (language !== value) setLanguage(value);
      onClose();
    },
    [language, onClose, setLanguage]
  );

  return (
    <div
      ref={langRef}
      className={cx('lang-toggle-wrapper', {
        'lang-toggle-mobile': isMobile,
      })}>
      <div
        onClick={onToggle}
        className={cx('lang-toggle', {
          'lang-toggle-body-active': !!visible,
        })}>
        <GlobalIcon className='lang-svg-fill' />
        <div>{language === 'ch-en' ? 'EN' : 'DE'}</div>
        <div className='relative w-1'>
          <ChevronDown className='lang-toggle-svg-down' />
        </div>
      </div>
      {!!visible && (
        <div
          className={cx('lang-toggle-options', {
            'left-[0px] top-[28px]': !!isMobile,
            'right-[0px] top-[24px]': !isMobile,
          })}>
          <div
            onClick={() => onChangeLang('ch-en')}
            className={cx('lang-toggle-item mb-[4px]', {
              'lang-toggle-active': language === 'ch-en',
            })}>
            <div>EN</div>
            <div>English</div>
            <div>{language === 'ch-en' ? <Checked /> : <div className='w-[16px] h-[16px]' />}</div>
          </div>
          <div
            onClick={() => onChangeLang('ch-de')}
            className={cx('lang-toggle-item', {
              'lang-toggle-active': language === 'ch-de',
            })}>
            <div>DE</div>
            <div>Deutsch</div>
            <div>{language === 'ch-de' ? <Checked /> : <div className='w-[16px] h-[16px]' />}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LangToggle;
