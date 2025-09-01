import cx from 'classnames';
import { translateENtoDE } from '../../functions/translator';

const SchoolContentBlock = ({
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
            className={cx('teacher-content-block p-5', {
                'pb-5': isVisibleButton,
            })}>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto '>{label}</h2>
                <div className={cx({ 'mb-4': isVisibleButton })}>{children}</div>
            </div>
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

export default SchoolContentBlock;
