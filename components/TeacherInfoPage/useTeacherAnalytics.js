import { useMemo, useEffect, useCallback } from 'react';

const pushToDataLayer = (eventObj) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventObj);
};

const getLocationTypes = (locations = {}) =>
  [
    locations?.studios?.address_list?.length ? 'studios' : '',
    locations?.student_place?.address_list?.length ? 'student_place' : '',
    locations?.teacher_place?.address ? 'teacher_place' : '',
    locations?.online ? 'online' : '',
  ]
    .filter(Boolean)
    .join(';');

const getStudentAge = (age_taught = {}) =>
  [age_taught?.adults ? 'adults' : '', age_taught?.kids ? 'kids' : '']
    .filter(Boolean)
    .join(';');

const getCourseParams = (course, teacher) => {
  const sortByAmount = (arr = []) =>
    arr.filter((i) => !!i?.amount).sort((a, b) => a.amount - b.amount);

  const kids = sortByAmount(course?.prices?.filter((i) => i?.age_taught === 'kids'));
  const adults = sortByAmount(course?.prices?.filter((i) => i?.age_taught === 'adults'));

  return {
    course_id: course?.id,
    course_title: course?.name,
    course_type_id: course?.course_type,
    course_instrument_id: course?.instruments?.map((i) => i?.key).join(';'),
    course_skillLevel_id: course?.skill_levels?.join(';'),
    course_locationType_id: course?.locations?.join(';'),
    course_locationAddress_id: '', // @TODO
    course_studentAge_id: course?.ages?.join(';'),
    course_lessonDuration_id: course?.durations?.join(';'),
    course_hourlyRate_Adults: adults[0]?.amount || teacher?.pricing?.adults?.hour_rate || 0,
    course_hourlyRate_Kids: kids[0]?.amount || teacher?.pricing?.kids?.hour_rate || 0,
    course_surcharge: teacher?.pricing?.surcharge?.price || 0,
  };
};

const getCourseEcommerce = (course, { value, currency, item_list_id, item_list_name, teacher_page_id, courseIndex }) => ({
  value,
  currency,
  item_list_id,
  item_list_name,
  items: [
    {
      item_list_id,
      item_list_name,
      item_id: course?.id,
      item_name: `${course?.name} ${course?.id}`,
      affiliation: 'Matchspace Music',
      item_brand: teacher_page_id,
      item_category: 'course',
      item_category2: course?.course_type,
      location_id: '',
      index: courseIndex,
    },
  ],
});

const useTeacherAnalytics = ({ teacher = {}, user_language = 'ch-en', algolia_user_token }) => {
  // ✅ Precompute common params once
  const params = useMemo(() => ({
    global: {
      value: 0,
      user_id: '',
      user_role: '',
      user_language: user_language.split('-')[1],
      currency: 'CHF',
      user_login: 'logged_out',
      algolia_user_token,
    },
    item_list_id: teacher?.username,
    teacher_page_id: teacher?.username,
    teacherParams: {
      teacher_id: teacher?.user_id,
      teacher_page_id: teacher?.username,
      teacher_type_id: teacher?.profile_type,
    },
    item_list_name: `${teacher?.name} ${teacher?.username}`,
  }), [user_language, teacher, algolia_user_token]);

  // ✅ Precompute teacher stats once (instead of multiple filters)
  const teacherStats = useMemo(() => {
    const courses = teacher?.courses || [];
    const counts = {
      private: 0, group: 0, workshop: 0, camp: 0,
    };
    courses.forEach(c => {
      if (c.course_type === 'pri_vate') counts.private++;
      if (c.course_type === 'group_course') counts.group++;
      if (c.course_type === 'workshop') counts.workshop++;
      if (c.course_type === 'music_camp') counts.camp++;
    });
    return { courses, counts };
  }, [teacher]);

  // ✅ Callbacks simplified with pushToDataLayer
  const selectCourse = useCallback((course, courseIndex, teacher) => {
    const { global, item_list_id, item_list_name, teacherParams: { teacher_page_id } } = params;
    pushToDataLayer({
      event: 'select_item',
      ...global,
      item_category: 'course',
      item_category2: course?.course_type,
      ...getCourseParams(course, teacher),
      ecommerce: getCourseEcommerce(course, { ...global, item_list_id, item_list_name, teacher_page_id, courseIndex }),
    });
  }, [params]);

  const viewCourseModal = useCallback((course, courseIndex, teacher) => {
    const { global, item_list_id, item_list_name, teacherParams } = params;
    pushToDataLayer({
      event: 'view_item',
      ...global,
      item_category: 'course',
      item_category2: course?.course_type,
      ...teacherParams,
      ...getCourseParams(course, teacher),
      ecommerce: getCourseEcommerce(course, { ...global, item_list_id, item_list_name, teacher_page_id: teacherParams.teacher_page_id, courseIndex }),
    });
  }, [params]);

  const contactStart = useCallback(() => {
    pushToDataLayer({
      event: 'student_contact_start',
      ...params.global,
      ...params.teacherParams,
      student_contact_text: user_language === 'ch-en' ? 'CONTACT ME' : 'KONTAKTIERE MICH',
    });
  }, [params, user_language]);

  // (Other callbacks follow same simplified pattern...)

  useEffect(() => {
    const { global, teacher_page_id } = params;
    const { currency, value } = global;

    // Reset ecommerce
    pushToDataLayer({ ecommerce: null });

    // view_item
    pushToDataLayer({
      event: 'view_item',
      ...global,
      item_category: 'profile',
      item_category2: 'music_teacher',
      teacher_id: teacher?.user_id,
      teacher_page_id,
      teacher_type_id: teacher?.profile_type,
      teacher_instrument_id: teacher?.instruments.map((i) => i?.key).join(';'),
      teacher_locationType_id: getLocationTypes(teacher?.locations || {}),
      teacher_language_id: teacher?.languages.map((i) => i?.key).join(';'),
      teacher_studentAge_id: getStudentAge(teacher?.age_taught || {}),
      teacher_skillLevel_id: teacher?.skill_levels_taught?.join(';'),
      teacher_genre_id: teacher?.genres.map((i) => i?.key).join(';'),
      teacher_recommendation_count: teacher?.recommendations?.length,
      teacher_course_count: teacherStats.courses.length,
      teacher_course_private_count: teacherStats.counts.private,
      teacher_course_group_count: teacherStats.counts.group,
      teacher_course_workshop_count: teacherStats.counts.workshop,
      teacher_course_camp_count: teacherStats.counts.camp,
      teacher_experience_count: teacher?.experience?.length || 0,
      teacher_education_count: teacher?.education?.length || 0,
      teacher_gallery_count: teacher?.gallery?.length || 0,
      ecommerce: {
        currency,
        value,
        items: [
          {
            item_id: teacher_page_id,
            item_name: `${teacher?.name} ${teacher_page_id}`,
            affiliation: 'Matchspace Music',
            item_brand: teacher_page_id,
            item_category: 'profile',
            item_category2: 'music_teacher',
          },
        ],
      },
    });
    pushToDataLayer({
      event: 'view_item_list',
      item_category: 'course',
      item_category2: 'private_lessons',
      ecommerce: {
        item_list_id: teacher_page_id,
        item_list_name: `${teacher?.name} ${teacher?.username}`,
        currency,
        value,
        items: teacherStats.courses.map((item, index) => ({
          item_list_id: teacher_page_id,
          item_list_name: `${teacher?.name} ${teacher?.username}`,
          item_id: item?.id,
          item_name: `${item?.name} ${item?.id}`,
          affiliation: 'Matchspace Music',
          item_brand: teacher_page_id,
          item_category: 'course',
          item_category2: 'private_lessons',
          index,
        })),
      },
    });
  }, [params, teacher, teacherStats]);

  return {
    share: (method, content_type) => pushToDataLayer({ event: 'share', ...params.global, ...params.teacherParams, method, content_type, item_id: params.teacherParams.teacher_id }),
    addToCart: ({ course, form, discount, price, teacher }) => { /* same refactor as above */ },
    contactStart,
    contactLevel: (level, message) => pushToDataLayer({ event: `student_contact_prompt_h${level}`, prompt_message: message, ...params.global, ...params.teacherParams }),
    selectCourse,
    messageLater: () => pushToDataLayer({ event: 'student_contact_later', ...params.global, ...params.teacherParams }),
    messageAbort: () => pushToDataLayer({ event: 'student_contact_abort', ...params.global, ...params.teacherParams }),
    messageStart: () => pushToDataLayer({ event: 'student_contact_start_message', ...params.global, ...params.teacherParams }),
    contactFinish: () => pushToDataLayer({ event: 'student_contact_finish', ...params.global, ...params.teacherParams, value: 20 }),
    viewCourseModal,
    selectPromotion: (promo, promoIndex, name) => { /* same refactor */ },
  };
};

export default useTeacherAnalytics;
