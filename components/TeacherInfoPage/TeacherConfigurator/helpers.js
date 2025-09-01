import { translateFieldKeyToEN } from '../../../functions/translator';

export const filteredByParams = (data, queries) => {
  let courses = [];
  const location =
    queries?.location === 'online'
      ? 'online'
      : queries?.location === 'home'
      ? 'student_place'
      : queries?.location === 'studio'
      ? 'studios'
      : queries?.location;

  const withInstrument = data?.filter(
    (item) => !!item?.instruments?.filter((i) => i?.key === queries?.instrument)?.length
  );

  if (queries?.age && queries?.location) {
    const filtered = withInstrument.filter((item) => {
      const isAge = item?.ages?.includes(queries?.age);

      const isLocation =
        location === 'studios'
          ? item?.locations?.includes('studios') || item?.locations?.includes('teacher_place')
          : item?.locations?.includes(queries?.location);

      return isAge && isLocation;
    });

    courses = [...filtered];
  }

  if (queries?.age) {
    const filtered = withInstrument.filter((item) => item?.ages?.includes(queries?.age));
    courses = [...courses, ...filtered];
  }

  if (queries?.location) {
    const filtered = withInstrument.filter((item) =>
      location === 'studios'
        ? item?.locations?.includes('studios') || item?.locations?.includes('studios')
        : item?.locations?.includes(queries?.location)
    );
    courses = [...courses, ...filtered];
  }
  const uniqueIds = new Set();
  courses = courses?.filter((obj) => {
    if (!uniqueIds.has(obj.id)) {
      uniqueIds.add(obj.id);
      return true;
    }
    return false;
  });

  return courses[0] || withInstrument[0] || data[0];
};

export const getLessonInfo = ({ course, courses, lesson, query }) => {
  if (course) return course;
  if (lesson) return courses?.filter((item) => item?.id === lesson)[0];
  if (query?.instrument || query?.age || query?.location) {
    return filteredByParams(courses, query);
  }

  return {};
};

export const getLessonParams = ({ course, courses = [], query, lesson, language, locations }) => {
  const lessonInfo = getLessonInfo({ course, courses, lesson, query });

  const _locations = lessonInfo?.locations
    ?.filter((item) => {
      if (item === 'online' && locations[item]) return true;
      if (locations[item]) return !!locations[item]?.checked;

      return true;
    })
    .map((item) => (item === 'teacher_place' ? 'studios' : item));

  const locationsData = [...new Set(_locations || [])];

  return {
    lessonInfo,
    lessonOptions: courses
      ?.filter((item) => !item?.is_full)
      .map((item) => ({ label: `${item?.name}`, value: item?.id })),
    ageOptions:
      lessonInfo?.ages?.map((item) => ({
        value: item,
        label: translateFieldKeyToEN(item, language),
      })) || [],
    locationOptions:
      locationsData?.map((item) => ({
        value: item,
        label: translateFieldKeyToEN(item, language),
      })) || [],
  };
};

export const getLessonPriceInfo = (lessonInfo, { lessons, duration, ageGroupeValue }) => {
  const prices = { 3: [], 5: [], 10: [], 20: [] };

  let lessonPrices = [];

  if (ageGroupeValue && duration) {
    lessonPrices =
      lessonInfo?.prices?.filter((item) => {
        return item?.age_taught === ageGroupeValue && item?.duration === duration;
      }) || [];

    lessonPrices.map((item) => {
      prices[item?.product_quantity].push(item);
      return item;
    });
  }

  let lessonPrice = null;

  if (lessons) {
    lessonPrice = lessonPrices.filter((item) => item?.product_quantity === lessons)[0];
  }

  const kidsDuration = lessonInfo?.prices?.filter((item) => item?.age_taught === 'kids').map((item) => item?.duration);
  const adultsDuration = lessonInfo?.prices
    ?.filter((item) => item?.age_taught === 'adults')
    .map((item) => item?.duration);

  return {
    prices,
    lessonPrice: lessonPrice || null,
    lessonsDuration:
      ageGroupeValue === 'kids'
        ? [...new Set(kidsDuration)]
        : ageGroupeValue === 'adults'
        ? [...new Set(adultsDuration)]
        : lessonInfo?.durations || ['30', '45', '60', '90'],
  };
};

export const getLessonCalculation = (lessonPrice, lessons = 0) => {
  const discount = lessonPrice?.discount ? (lessonPrice?.discount * 100).toFixed(0) : 0;
  const totalPrice = Math.floor(lessons * +lessonPrice?.raw_original_amount);
  const lessonDiscount = (totalPrice * (lessonPrice?.discount || 0)).toFixed(0);
  const totalPriceWithoutDiscount = +lessonPrice?.amount || +lessonPrice?.duration_amount;

  return { discount, totalPrice, lessonDiscount, totalPriceWithoutDiscount };
};

export const getLessonPrice = (prices = [], duration, isLesson) => {
  if (prices?.length) {
    const currentPrice = prices?.filter((item) => item.duration === duration)[0];

    if (isLesson) {
      return +currentPrice?.amount || +currentPrice?.duration_amount || 0;
    }

    return currentPrice?.raw_amount * currentPrice?.product_quantity || 0;
  }

  return 0;
};
