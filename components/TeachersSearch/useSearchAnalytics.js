import { useMemo, useState, useCallback, useEffect } from 'react';

const searchQuality = (teachers = []) => {
  const length = teachers.length;

  if (!length) return 'noresult';
  if (length >= 3) return 'high';
  if (length === 2) return 'medium';

  return 'low';
};

const useSearchAnalytics = ({
  search = [],
  location_id,
  location_name,
  instrument_key,
  instrument_name,
  algolia_user_token,
  user_language = 'ch-en',
}) => {
  const params = useMemo(
    () => ({
      global: {
        value: 0,
        user_id: '',
        user_role: '',
        user_language: user_language?.split('-')[1],
        currency: 'CHF',
        user_login: 'logged_out',
        search_instrument_id: instrument_key,
        search_instrument_name: instrument_name,
        search_location_id: location_id,
        search_location_name: location_name,
        search_quality: searchQuality(search),
        search_url: typeof window !== 'undefined' ? window?.location?.href : '',
        search_term: `${instrument_key};${location_id}`,
        algolia_user_token,
      },
      item_list_id: `${instrument_key};${location_id}`,
      item_list_name: `${instrument_name};${location_name}`,
    }),
    [instrument_name, location_id, instrument_key, location_name, search, user_language, algolia_user_token]
  );

  const selectPromotion = useCallback(
    (promo, promoIndex) => {
      window.dataLayer = window?.dataLayer || [];

      const {
        item_list_id,
        item_list_name,
        global: { value, currency, user_login, user_id, user_role, user_language, algolia_user_token },
      } = params;

      window?.dataLayer.push({
        event: 'select_promotion',
        currency,
        value,
        user_language,
        user_login,
        user_id,
        user_role,
        algolia_user_token,

        ecommerce: {
          item_list_id,
          item_list_name,
          currency,
          value,
          creative_name: promo?.creative_name,
          creative_slot: promo?.creative_slot,
          promotion_id: promo?.promotion_id,
          promotion_name: promo?.promotion_name,
          items: [
            {
              item_list_id,
              item_list_name,
              item_id: promo?.promotion_id,
              item_name: promo?.promotion_name,
              affiliation: 'Matchspace Music',
              item_brand: promo?.promotion_brand,
              item_category: 'promotion',
              item_category2: '',
              location_id: '', // @TODO
              index: promoIndex,
            },
          ],
        },
      });
    },
    [params]
  );

  const selectTeacher = useCallback(
    (teacher, teacherIndex) => {
      window.dataLayer = window?.dataLayer || [];

      const {
        item_list_id,
        item_list_name,
        global: { value, currency, user_login, user_id, user_role, user_language, algolia_user_token },
      } = params;

      window?.dataLayer.push({
        event: 'select_item',
        currency,
        value,
        user_language,
        user_login,
        user_id,
        user_role,
        algolia_user_token,
        ecommerce: {
          item_list_id,
          item_list_name,
          currency,
          value,
          items: [
            {
              item_list_id,
              item_list_name,
              item_id: teacher?.username,
              item_name: `${teacher?.name} ${teacher?.username}`.replace('  ', ' '),
              affiliation: 'Matchspace Music',
              item_brand: teacher?.username,
              item_category: 'profile',
              item_category2: 'music_teacher',
              location_id: '', // @TODO [[emptyForNow]]
              index: teacherIndex,
            },
          ],
        },
      });
    },
    [params]
  );

  const applyFilter = useCallback(
    ({ ages, locations, genres, skills, durations, languages }) => {
      window.dataLayer = window?.dataLayer || [];

      window?.dataLayer.push({
        event: 'search_filter_apply',
        ...params.global,
        search_filter_lessonDuration_id: durations || '',
        search_filter_locationType_id: locations || '',
        search_filter_language_id: languages || '',
        search_filter_skillLevel_id: skills || '',
        search_filter_studentAge_id: ages || '',
        search_filter_course_type_id: '',
        search_filter_genre_id: genres || '',
      });
    },
    [params]
  );

  const showMapView = useCallback(
    (search_map_status) => {
      window.dataLayer = window?.dataLayer || [];

      window?.dataLayer.push({
        event: 'search_map_view',
        ...params.global,
        search_map_status, // map, list
      });
    },
    [params]
  );

  const mapSearchArea = useCallback(
    (search_map_searcharea) => {
      window.dataLayer = window?.dataLayer || [];

      window?.dataLayer.push({
        event: 'search_map_searcharea',
        ...params.global,
        search_map_searcharea, // Latitude;Longitude of area where new search is triggered
      });
    },
    [params]
  );

  const showHideContact = useCallback(
    (search_map_contact_status) => {
      window.dataLayer = window?.dataLayer || [];

      window?.dataLayer.push({
        event: 'search_map_contact_status',
        ...params.global,
        search_map_contact_status, // hide, unhide
      });
    },
    [params]
  );

  const searchLoadMore = useCallback(
    (search_loadmore_count) => {
      window.dataLayer = window?.dataLayer || [];

      window?.dataLayer.push({
        event: 'search_map_contact_status',
        ...params.global,
        search_loadmore_count, // Number
      });
    },
    [params]
  );

  const searchNotifyMe = useCallback(() => {
    window.dataLayer = window?.dataLayer || [];

    window?.dataLayer.push({
      event: 'search_request_start',
      ...params.global,
    });
  }, [params]);

  const searchNotifyFinish = useCallback(
    ({ search_request_id, search_request_zip, search_request_instrument }) => {
      window.dataLayer = window?.dataLayer || [];

      window?.dataLayer.push({
        event: 'search_request_finish',
        ...params.global,
        search_request_id, // @TODO Unique search request id
        search_request_instrument, // Instrument key(s) that was requested
        search_request_zip, // Zip code that was entered in request
      });
    },
    [params]
  );

  const viewPromotion = useCallback(
    (data = []) => {
      window.dataLayer = window.dataLayer || [];

      const { global, item_list_id, item_list_name } = params;
      const { value, currency, algolia_user_token } = global;

      const promotionEvent = window?.dataLayer?.filter((item) => item?.event === 'view_promotion');

      if (promotionEvent?.length < 2) {
        data?.map((item, index) =>
          window?.dataLayer.push({
            event: 'view_promotion',
            currency,
            value,
            algolia_user_token,
            ecommerce: {
              item_list_id,
              item_list_name,
              currency,
              value,
              creative_name: item?.creative_name,
              creative_slot: item?.creative_slot,
              promotion_id: item?.promotion_id,
              promotion_name: item?.promotion_name,
              items: [
                {
                  item_list_id,
                  item_list_name,
                  item_id: item?.promotion_id,
                  item_name: item?.promotion_name,
                  affiliation: 'Matchspace Music',
                  item_brand: item?.promotion_brand,
                  item_category: 'promotion',
                  item_category2: '',
                  location_id: '', // @TODO [[emptyForNow]]
                  index,
                },
              ],
            },
          })
        );
      }
    },
    [params]
  );

  const searchFilterView = useCallback(() => {
    window.dataLayer = window.dataLayer || [];

    // search_filter_view
    window?.dataLayer.push({
      event: 'search_filter_view',
      ...params.global,
    });
  }, [params]);

  const viewItemList = useCallback(
    (data = []) => {
      window.dataLayer = window.dataLayer || [];

      const { global, item_list_id, item_list_name, algolia_user_token } = params;
      const { value, currency } = global;

      window?.dataLayer.push({
        event: 'view_item_list',
        item_category: 'profile',
        item_category2: 'music_teacher',
        algolia_user_token,
        ...global,
        ecommerce: {
          item_list_id,
          item_list_name,
          currency,
          value,
          items: data?.map((item, index) => ({
            item_list_id,
            item_list_name,
            item_id: item?.username,
            item_name: `${item?.name} ${item?.username}`,
            affiliation: 'Matchspace Music',
            item_brand: item?.username,
            item_category: 'profile',
            item_category2: 'music_teacher',
            location_id: '', // @TODO [[emptyForNow]]
            index,
          })),
        },
      });
    },
    [params]
  );

  const init = useCallback(
    (search = []) => {
      window.dataLayer = window.dataLayer || [];
      window?.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.

      const searchEvent = window?.dataLayer?.filter((item) => item?.event === 'search');
      const viewItemEvent = window?.dataLayer?.filter((item) => item?.event === 'view_item_list');

      if (!searchEvent.length) {
        if (search?.length) window?.dataLayer.push({ event: 'search', ...params.global });
        if (!search?.length) window?.dataLayer.push({ event: 'search_noresult', ...params.global });
      }
      if (!viewItemEvent.length && !!search?.length) viewItemList(search);
    },
    [params, viewItemList]
  );

  const [prevLocation, setPrevLocation] = useState(null);
  const [prevInstrument, setPrevInstrument] = useState(null);

  useEffect(() => {
    if (instrument_key && location_name && location_id) {
      const searchEvent = window?.dataLayer?.filter((item) => item?.event === 'search');

      if (searchEvent && (prevLocation !== location_name || prevInstrument !== instrument_key)) {
        if (search?.length) {
          window?.dataLayer.push({ event: 'search', ...params.global });
          viewItemList(search);
        }
        if (!search?.length) window?.dataLayer.push({ event: 'search_noresult', ...params.global });
      }

      if (prevLocation !== location_name) setPrevLocation(location_name);
      if (prevInstrument !== instrument_key) setPrevInstrument(instrument_key);
    }
  }, [params, prevLocation, prevInstrument, location_id, search, viewItemList, instrument_key, location_name]);

  return {
    init,
    selectPromotion,
    selectTeacher,
    applyFilter,
    showMapView,
    mapSearchArea,
    showHideContact,
    searchLoadMore,
    searchNotifyMe,
    searchNotifyFinish,
    viewPromotion,
    searchFilterView,
    viewItemList,
  };
};

export default useSearchAnalytics;
