import { useCallback, useMemo } from 'react';
import TeacherConfiguratorCheckbox from './TeacherConfiguratorCheckbox';
import { translateENtoDE } from '../../../functions/translator';
import ChevronLeft from '../../icons/ChevronLeft.svg';

const TeacherConfiguratorStepTwo = ({
  geoloc,
  teacher,
  language,
  setGeoLoc,
  setGeoType,
  setIsFinished,
  locations = [],
  setIsSecondStep,
}) => {
  const locationsList = useMemo(() => {
    const data = [];
    const studios = teacher?.locations?.studios;
    const teacherPlace = teacher?.locations?.teacher_place;

    if (studios?.checked && studios?.address_list?.length && locations.includes('studios')) {
      const address = studios?.address_list?.map((item) => ({ ...item, location: 'studios' }));
      data.push(...address);
    }

    if (teacherPlace?.checked && teacherPlace?.address && locations.includes('teacher_place')) {
      data.push({ ...teacherPlace?.address, location: 'teacher_place' });
    }

    return data;
  }, [teacher, locations]);

  const onBack = useCallback(() => {
    setIsSecondStep(false);
    setIsFinished(false);
  }, [setIsSecondStep, setIsFinished]);

  const onLocationSelect = useCallback(
    (item) => {
      setGeoLoc(`${item?.latitude},${item?.longitude}`);
      setGeoType(item?.location);
      setIsFinished(true);
    },
    [setGeoLoc, setGeoType, setIsFinished]
  );

  return (
    <div className='configurator-step-2'>
      <div className='configurator-step-2__back' onClick={onBack}>
        <ChevronLeft className='mr-3' />
        {translateENtoDE('Back', language)}
      </div>
      <div className='configurator-step-2__title'>{translateENtoDE('Select studio', language)}</div>
      <div className='configurator-step-2__subtitle'>
        {translateENtoDE('Choose your most convenient lesson location', language)}
      </div>
      {locationsList.map((item, index) => (
        <TeacherConfiguratorCheckbox
          key={index}
          item={item}
          index={index}
          geoloc={geoloc}
          language={language}
          onClick={() => onLocationSelect(item)}
        />
      ))}
      <div className='configurator-step-2__border' />
    </div>
  );
};

export default TeacherConfiguratorStepTwo;
