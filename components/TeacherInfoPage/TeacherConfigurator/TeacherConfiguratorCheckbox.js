import cx from 'classnames';
import { translateENtoDE } from '../../../functions/translator';
import { getPinFullAddress } from '../../TeachersSearchMap/mapboxInfo';

const TeacherConfiguratorCheckbox = ({ item, geoloc, language, index, onClick }) => {
  return (
    <div
      onClick={onClick}
      data-test={`configurator-location-step2-${getPinFullAddress(item, item?.location === 'teacher_place')}`}
      className='configurator-checkbox-wrapper'>
      <div
        className={cx('configurator-checkbox', {
          'bg-primary': `${item?.latitude},${item?.longitude}` === geoloc,
        })}>
        <div className='configurator-checkbox-inner' />
      </div>
      <div className='text-14px'>
        <div className='font-semibold'>{`${translateENtoDE('Studio', language)} ${index + 1}`}</div>
        <div>{getPinFullAddress(item, item?.location === 'teacher_place')}</div>
      </div>
    </div>
  );
};

export default TeacherConfiguratorCheckbox;
