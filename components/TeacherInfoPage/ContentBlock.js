import cx from 'classnames';
import { translateENtoDE } from '../../functions/translator';

const ContentBlock = ({
  name,
  children,
  language,
  data = [],
  label = '',
  onShowPopup,
  popupLabel = '',
  withPopup = true,
  maxItemsVisible = 5,
}) => {
  const showPopupHandle = () => {
    if (onShowPopup && name) {
      onShowPopup(name, { title: popupLabel || label });
    }
  };

  const isVisibleButton = withPopup && !!data.length && data.length > maxItemsVisible;

  return (
    <div
      className={cx('teacher-content-block px-[16px] py-[20px] sm:p-[20px]', {
        'pb-[20px]': isVisibleButton,
      })}>
      <h2 className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto mb-3 sm:mb-5'>{label}</h2>
      <div className={cx({ 'mb-4': isVisibleButton })}>{children}</div>
      {isVisibleButton && (
        <button
          type='button'
          onClick={showPopupHandle}
          className='flex text-primary cursor-pointer mx-auto uppercase font-medium text-14px'>
          {`${translateENtoDE('View all', language)} (${data.length})`}
        </button>
      )}
    </div>
  );
};

export default ContentBlock;
