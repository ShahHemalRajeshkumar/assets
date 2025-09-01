import { translateENtoDE, translateFieldKeyToEN } from '../functions/translator';
import {
  getCityName,
  getTeacherLocations,
} from '../components/TeacherInfoPage/TeacherContent/TeacherContentHead/functions';

export const getTeacherGroupStrings = (data = [], instrument, lang, isLocation, isOnline, teacher) => {
  const formatted = data.map((item) => {
    if (isLocation) return getCityName(item?.full_address, item?.city);

    return translateENtoDE(`${item[0]}`.toUpperCase() + `${item}`.slice(1), lang);
  });

  let uniqueData = formatted;
  if (isLocation) uniqueData = getTeacherLocations(teacher);

  const isFull = !!uniqueData?.length;
  const groups =
    uniqueData.length > 2
      ? uniqueData.slice(0, uniqueData.length - 1).join(', ')
      : uniqueData.length === 2
      ? uniqueData.join(lang === 'ch-en' ? ' and ' : lang === 'ch-fr' ? ' et ' : ' und ')
      : uniqueData.join(', ');
  const isLastGroup = uniqueData.length >= 3 ? uniqueData[uniqueData.length - 1] : '';
  const online = isOnline ? ` ${isFull ? translateENtoDE('or', lang) : ''} Online` : '';

  if (isLocation) {
    return lang === 'ch-en'
      ? `Teaches ${isFull ? 'in' : ''} ${groups}${isLastGroup ? ` and ${isLastGroup}` : ''}${online}`
      : lang === 'ch-fr'
      ? `Enseigne ${isFull ? 'en' : ''} ${groups}${isLastGroup ? ` et ${isLastGroup}` : ''}${online}`
      : `Unterrichtet ${isFull ? 'in' : ''} ${groups}${isLastGroup ? ` und ${isLastGroup}` : ''}${online}`;
  }

  return lang === 'ch-en'
    ? `${instrument?.en} teacher for ${uniqueData[0]}${uniqueData[1] ? ` and ${uniqueData[1]}` : ''}`
    : lang === 'ch-fr'
    ? `${instrument?.de} enseignant pour ${uniqueData[0]}${uniqueData[1] ? ` et ${uniqueData[1]}` : ''}`
    : `${instrument?.de} für ${uniqueData[0]}${uniqueData[1] ? ` und ${uniqueData[1]}` : ''}`;
};

export const getTeacherAges = (data = [], lang) => {
  const formatted = data.map((item) => translateENtoDE(`${item[0]}`.toUpperCase() + `${item}`.slice(1), lang));

  return lang === 'ch-en'
    ? `Lessons for ${formatted[0]}${formatted[1] ? ` and ${formatted[1]}` : ''}`
    : lang === 'ch-fr'
    ? `Cours pour ${formatted[0]}${formatted[1] ? ` et ${formatted[1]}` : ''}`
    : `Unterricht für ${formatted[0]}${formatted[1] ? ` und ${formatted[1]}` : ''}`;
};

export const getLocationTypes = (locations, lang) => {
  const isOnline = locations?.online;
  const isTeacher = locations?.teacher_place?.checked && locations?.teacher_place?.address;
  const isStudio = locations?.studios?.checked && locations?.studios?.address_list?.length;
  const isHome = locations?.student_place?.checked && locations?.student_place?.address_list?.length;

  let types = [isHome ? 'home' : '', isStudio || isTeacher ? 'studio' : '', isOnline ? 'online' : ''].filter(
    (item) => !!item
  );

  if (types?.length === 3) {
    return lang === 'ch-en'
      ? `Home visit, at the Studio and Online`
      : lang === 'ch-fr'
      ? `À la maison, en studio et en ligne`
      : `Hausbesuche, im Studio und Online`;
  }

  if (types?.length === 2) {
    return `${translateFieldKeyToEN(types[0], lang)} ${translateENtoDE('and', lang)} ${translateFieldKeyToEN(
      types[1],
      lang
    )}`;
  }

  return translateFieldKeyToEN(types[0], lang) || '';
};

export const getLocationString = (teacher, instrument, lang, locationName, isOnline) => {
  const uniqueData = getTeacherLocations(teacher);
  const isInclude = uniqueData.includes(locationName);
  const plusString = uniqueData?.length > 1 ? `(+${uniqueData?.length - 1})` : '';

  const withOnline =
    isOnline && !uniqueData?.length
      ? `${translateENtoDE('Online', lang)}`
      : `${isInclude ? locationName : uniqueData[0]} ${plusString}`;

  return lang === 'ch-en'
    ? `${instrument?.en} teacher in ${withOnline}`
    : lang === 'ch-fr'
    ? `${instrument?.de} enseignant dans ${withOnline}`
    : `${instrument?.de} in ${withOnline}`;
};
