import { translateENtoDE } from '../../../../functions/translator';

const regex = /^[0-9]+$/;
export const getCityName = (fullAddress = '', city = '') => {
  if (!fullAddress) return city;

  const split = fullAddress?.split(', ');
  if (regex.test(split[0])) return split[1];

  return split[0];
};

export const getTeacherLocations = (teacher) => {
  let cities = [];
  const studios = teacher?.locations?.studios;
  const studentPlace = teacher?.locations?.student_place;
  const teacherPlace = teacher?.locations?.teacher_place;

  if (teacherPlace?.checked) {
    cities.push({
      city: teacherPlace?.address?.city,
      lat: `${teacherPlace?.address?.latitude || '-'}`,
      lng: `${teacherPlace?.address?.longitude || '-'}`,
    });
  }

  if (studios?.checked) {
    cities.push(
      studios?.address_list?.map((item) => ({
        city: item?.city,
        lat: `${item?.latitude || '-'}`,
        lng: `${item?.longitude || '-'}`,
      }))
    );
  }

  if (studentPlace?.checked) {
    cities.push(
      studentPlace?.address_list?.map((item) => ({
        lat: `${item?.latitude || '-'}`,
        lng: `${item?.longitude || '-'}`,
        city: getCityName(item?.full_address, item?.city),
      }))
    );
  }

  cities = cities.flat();

  const _rankingLat = `${teacher?._rankingInfo?.matchedGeoLocation?.lat || ''}`;
  const _rankingLng = `${teacher?._rankingInfo?.matchedGeoLocation?.lng || ''}`;

  if (_rankingLat && _rankingLng) {
    cities = cities?.sort((a) => {
      if (a?.lat?.includes(_rankingLat) && a?.lng?.includes(_rankingLng)) {
        return -1;
      }
      // if (b?.lat?.includes(_rankingLat) && b?.lng?.includes(_rankingLng)) {
      //   return -1;
      // }
      return 1;
    });
  }

  cities = cities.map((item) => item?.city);

  return [...new Set(cities.flat())];
};

// Take guitar, drums, violin lessons with Elizabeth Sherwood in Zürich or Winterthur
// Lerne Gitarre, Schlagzeug, Violine mit Elizabeth Sherwood in Zürich oder Winterthur
export const getTeacherTitle = (teacher = {}, language) => {
  const isOnline = !!teacher?.locations?.online;

  // Extracting the unique instruments from the teacher object
  const uniqueInstruments = [
    ...new Set(teacher?.instruments?.map((item) => String(item[language === 'ch-en' ? 'en' : 'de']))),
  ];

  // Constructing the instruments string based on the number of unique instruments
  let instruments;
  if (uniqueInstruments.length > 1) {
    const lastInstrument = uniqueInstruments.pop(); // Remove the last instrument from the list
    instruments = `${uniqueInstruments.join(', ')} ${translateENtoDE('or', language)} ${lastInstrument}`;
  } else {
    instruments = uniqueInstruments[0] || ''; // Use the only instrument if there's one, or an empty string if none
  }

  const uniqueCities = getTeacherLocations(teacher);

  const orText = translateENtoDE('or', language);
  const orTextLast = isOnline ? ', ' : ` ${orText} `;

  let locationText = '';

  if (uniqueCities.length === 1) {
    locationText = `${translateENtoDE('in', language)} ${uniqueCities.join(' ')}`;
  }

  if (uniqueCities.length === 2) {
    locationText = `${translateENtoDE('in', language)} ${uniqueCities.join(uniqueCities.length > 1 ? orTextLast : '')}`;
  }

  if (uniqueCities.length >= 3) {
    locationText = `${translateENtoDE('in', language)} ${uniqueCities
      .slice(0, uniqueCities.length - 1)
      .join(', ')} ${orTextLast} ${uniqueCities[uniqueCities.length - 1]}`;
  }

  return `${translateENtoDE('Take', language)} ${instruments} ${language === 'ch-en' ? 'lessons with' : 'mit'} ${
    teacher?.name
  } ${!!uniqueCities?.length ? locationText : ''} ${
    isOnline ? `${!!uniqueCities?.length ? ` ${orText}` : ''} Online` : ''
  }`.replace('  ', ' ');
};

// Online and Visit lessons for Adults and Kids ages 5+
export const getTeacherSubTitle = (teacher = {}, language) => {
  const studios = teacher?.locations?.studios;
  const teacherPlace = teacher?.locations?.teacher_place;
  const studentPlace = teacher?.locations?.student_place;

  const isKids = !!teacher?.age_taught?.kids;
  const isAdult = !!teacher?.age_taught?.adults;
  const isOnline = !!teacher?.locations?.online;
  const isStudio =
    (!!studios?.checked && !!studios?.address_list?.length) ||
    (!!teacherPlace?.checked && !!+teacherPlace?.address?.latitude);
  const isVisit = !!studentPlace?.checked && !!studentPlace?.address_list?.length;

  if (language === 'ch-en') {
    return `Lessons for ${(isAdult && 'Adults') || ''}${(isKids && isAdult && ' and ') || ''}${
      (isKids && 'Kids') || ''
    }. ${(isOnline && 'Online') || ''}${(isOnline && isVisit && ', ') || ''}${(isVisit && 'Home Visits') || ''}${
      ((isOnline || isVisit) && (isVisit || isStudio) && ' or ') || ''
    }${((isStudio || isVisit) && ` ${!isOnline && !isVisit ? 'A' : 'a'}t the Studio`) || ''}`.replace('  ', ' ');
  }

  return `Unterricht für ${(isAdult && 'Erwachsene') || ''}${(isKids && isAdult && ' und ') || ''}${
    (isKids && 'Kinder') || ''
  }. ${(isOnline && 'Online') || ''}${(isOnline && isVisit && ', ') || ''}${(isVisit && 'Hausbesuche') || ''}${
    ((isOnline || isVisit) && (isVisit || isStudio) && ' oder ') || ''
  }${((isStudio || isVisit) && ` ${!isOnline && !isVisit ? 'I' : 'i'}m Studio`) || ''}`.replace('  ', ' ');
};

export const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};
