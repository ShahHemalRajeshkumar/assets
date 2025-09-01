import cx from 'classnames';
import { useMemo } from 'react';
import { getLessonPrice } from './helpers';
import { translateENtoDE } from '../../../functions/translator';

const TeacherConfiguratorLesson = ({ lessons, language, ageGroupe, errors, setValue, prices, lessonPrice }) => {
  const options = useMemo(() => {
    if (ageGroupe === 'kids') return [10, 20];

    return [5, 10, 20];
  }, [ageGroupe]);

  return (
    <>
      <p
        className={cx('mb-1 text-14px font-medium tx-secondary', {
          'text-rose-600': !!errors?.lessons?.type && !lessons,
        })}>
        {translateENtoDE('Select lesson subscription:', language)}
      </p>
      <div className='grid mb-1 bg-[#fff] min-h-[120px] overflow-hidden'>
        {options.map((item, index) => {
          const price = +getLessonPrice(prices[item], lessonPrice?.duration, true);

          return (
            <div
              key={index}
              name='lessons'
              data-test={`configurator-lesson-${item}`}
              onClick={() => setValue('lessons', item)}
              className={cx(`configurator-lesson`, {
                [`configurator-lesson-${ageGroupe === 'kids' && item === 10 ? 5 : item}`]: item,
                'configurator-lesson-active': item === lessons,
              })}>
              <div className='flex'>
                <div className='configurator-lesson-amount min-w-[22px]'>{item}</div>
                <div
                  className={cx('configurator-lesson-text', { 'configurator-lesson-text-active': item === lessons })}>
                  {translateENtoDE('lessons', language)}
                </div>
              </div>
              <div className='flex items-center justify-between w-[120px]'>
                {!!prices[item][0]?.discount ? (
                  <div className='configurator-lesson-discount'>-{(prices[item][0]?.discount * 100).toFixed(0)}%</div>
                ) : (
                  <div />
                )}
                {!!price && <div className='configurator-lesson-price'>CHF {price}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TeacherConfiguratorLesson;
