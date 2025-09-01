import cx from 'classnames';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { MapProvider } from 'react-map-gl';
import { useHits } from 'react-instantsearch';
import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getFilterNewList } from './TeachersSearch/TeacherFilter/functions';
import { translateENtoDE } from '../functions/translator';
import useWindowSize from '../hooks/useWindowSize';
import * as algoliaCacheCommon from '@algolia/cache-common';
import algoliasearch from 'algoliasearch/lite';
import throttle from 'lodash.throttle';

const ModalComponent = dynamic(() => import('./ModalComponent'));
const MapboxMap = dynamic(() => import('./TeachersSearchMap/MapboxMap'), { ssr: false, loading: () => <div>Loading map...</div> });
const ShowModalButton = dynamic(() => import('./TeachersSearch/ShowModalButton'));
const MarketingSection = dynamic(() => import('./TeachersSearchMap/MarketingSection'));
const TeachersSearchResult = dynamic(() => import('./TeachersSearch/TeachersSearchResult'));
const TeacherFiltersPopup = dynamic(() => import('./TeachersSearch/TeacherFilter/TeacherFilter'));

const AppContent = (props) => {
  const {
    radius,
    showMap,
    isOnline,
    language,
    location,
    zoomLevel,
    isLoading,
    setShowMap,
    seoActions,
    showFilter,
    instrument,
    filter = {},
    instruments,
    locationGeo,
    setIsOnline,
    setIsLoading,
    aroundLatLng,
    openListPopup,
    openFilterModal,
    closeFilterModal,
    resultsStateHits,
    instrumentLocations,
    seoFilteredData,
    isSwitzerland,
    searchState
  } = props;
  const { form, onReset, setValue, setValues, isActive } = filter;
  const algoliaClient = useMemo(() => {
    const appId = process.env.ALGOLIA_SEARCHAPPID || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPPID;
    const apiKey = process.env.ALGOLIA_SEARCHAPIKEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPIKEY;
    return algoliasearch(appId, apiKey, {
      hostsCache: algoliaCacheCommon.createNullCache(),
      requestsCache: algoliaCacheCommon.createNullCache(),
      responsesCache: algoliaCacheCommon.createNullCache(),
    });
  }, []);

  const getAreaTeachers = useCallback(() => {
    const indexName = isSwitzerland ? process.env.ALGOLIA_TEACHERINDEX_SW : process.env.ALGOLIA_TEACHERINDEX;
    return algoliaClient.initIndex(indexName);
  }, [isSwitzerland, algoliaClient]);

  const router = useRouter();
  const mapRef = useRef(null);
  const mapRef2 = useRef(null);
  const bottomRef = useRef(null);
  const showMapRef = useRef(null);
  const containerRef = useRef(null);

  const { hits, sendEvent } = useHits();
  const { width, height } = useWindowSize();

  const [newList, setNewList] = useState([]);
  const [isBottom, setIsBottom] = useState(false);
  const [prevMarker, setPrevMarker] = useState(null);
  const [currentUUID, setCurrentUUID] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  const [mobileStatus, setMobileStatus] = useState(false);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [filteredList, setFilteredList] = useState(resultsStateHits || []);
  const [defaultList, setDefaultList] = useState([]);
  useEffect(() => {
    if (showMap) {
      import('mapbox-gl/dist/mapbox-gl.css');
    }
  }, [showMap]);

  useEffect(() => {
    let data = newList.concat(resultsStateHits || []);

    if (hits?.length) {
      let extraData = {};
      hits.forEach((item) => {
        extraData[item?.user_id] = { __queryID: item?.__queryID };
      });
      data = data.map((item, index) => ({
        ...item,
        ...(extraData[item?.user_id] || {}),
        __position: index + 1,
      }));
    }
    setDefaultList(data);
  }, [hits, newList, resultsStateHits]);

  const openMapModal = () => {
    if (!isBottom) setShowMap(true);
  };
  const closeMapModal = () => {
    setShowMap(false);
    setCurrentUUID(null);
    setCurrentMarker(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const coords = aroundLatLng?.split(',') || [];
  const lat = coords[0];
  const lng = coords[1];

  const list = newList.concat(resultsStateHits || []);
  const refs = filteredList.reduce((acc, value) => {
    acc[value?.username || value?.user_id] = createRef();
    return acc;
  }, {});
  const markers = useMemo(() => {
    return filteredList
      .flatMap((item) => {
        const locs = item?.locations || {};
        const studios = locs?.studios?.checked ? locs?.studios?.address_list : [];
        const teacher = locs?.teacher_place?.checked ? locs?.teacher_place?.address : [];
        const place = locs?.student_place?.checked ? locs?.student_place?.address_list : [];
        const allLocations = [...studios, teacher, ...place]
          .flat()
          .filter((item) => item?.latitude && item?.longitude)
          .map((item) => `${item.latitude}-${item.longitude}`);

        const validGeos = item?._geoloc?.filter((geo) => allLocations.includes(`${geo?.lat}-${geo?.lng}`)) || [];
        const geoStrings = validGeos.filter((geo) => geo?.lat).map((geo) => `${geo.lat},${geo.lng}`);
        const uniqueGeo = [...new Set(geoStrings)].map((geo) => geo.split(','));

        return uniqueGeo.map((geoItem) => ({
          id: item.username || item.user_id,
          name: item.name,
          latitude: geoItem[0],
          longitude: geoItem[1],
          avatar_path: item.avatar_path,
          recommendations: item.recommendations,
          teacher: item,
          profile_type: item?.profile_type,
          uuid: uuidv4(),
        }));
      })
      .map((data) => {
        if (data?.profile_type === 'music_school') {
          return {
            ...data,
            id: data?.teacher?.mzo_region_full_name?.de || data?.teacher?.user_id,
            name: language === 'ch-en' ? data?.teacher?.mzo_region_full_name?.en : data?.teacher?.mzo_region_full_name?.de,
            avatar_path: data?.teacher?.avatar_path,
          };
        }
        return data;
      });
  }, [filteredList, language]);

  const onSearchInArea = useCallback(
    (lat, lng, callback) => {
      getAreaTeachers()
        .search(instrument?.key, { advancedSyntax: true, aroundRadius: 40000, aroundLatLng: `${lat}, ${lng}` })
        .then(({ hits }) => {
          const ids = filteredList.map((item) => item?.user_id);
          const newTeachers = hits.filter((item) => !ids.includes(item?.user_id));
          setNewList(newTeachers);
          setFilteredList(() => newTeachers.concat(filteredList));
        })
        .finally(() => callback && callback());
    },
    [instrument, filteredList, getAreaTeachers]
  );
  const scrollHandle = useCallback(
    throttle(() => {
      if (width <= 550) {
        const offerBottom = bottomRef?.current?.getBoundingClientRect()?.bottom;
        const showMapBottom = showMapRef?.current?.getBoundingClientRect()?.bottom;
        setIsBottom(offerBottom < showMapBottom);
      } else {
        setIsBottom(false);
      }
    }, 200),
    [width]
  );

  useEffect(() => {
    window.addEventListener('scroll', scrollHandle);
    return () => {
      window.removeEventListener('scroll', scrollHandle);
    };
  }, [scrollHandle]);  
  return (
    <MapProvider>
    </MapProvider>
  );
};

export default AppContent;
