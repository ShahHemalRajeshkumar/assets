import React, { useRef, useMemo, useState, useEffect, useCallback, memo } from "react";
import qs from "qs";
import cx from "classnames";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import algoliasearch from "algoliasearch/lite";
import * as algoliaCacheCommon from "@algolia/cache-common";
import { getTeacherSearchStructureData } from "../utils/getTeacherSearchStructureData";
import useSearchFilter from "./TeachersSearch/TeacherFilter/useSearchFilter";
import { attributesToRetrieve } from "../constants/algoliaAttributes";
import useSearchAnalytics from "./TeachersSearch/useSearchAnalytics";
import { useIntersectionObserver } from "../hooks/usehooks-ts";
import { ogTitleDe } from "../utils/translationExceptionsDe";
import { getLocation, getScrollbarWidth } from "../utils";
import { translateENtoDE } from "../functions/translator";
import useWindowSize from "../hooks/useWindowSize";
import { DEFAULT_SEARCH_PROPS } from "../config";
import instrumentseodata from "../data/InstrumentSeoData.ts";
import templatemapping from "../data/TemplateMapping.json";
import InstrumentLocationEn from "../data/instrument-location-en.json";
import InstrumentLocationDe from "../data/instrument-location-de.json";
const ShowModalButton = dynamic(() => import("./TeachersSearch/ShowModalButton"), { ssr: false });
const CardComponent = dynamic(() => import("./TeachersSearch/CardComponent"), { ssr: false });
const TeacherPopup = dynamic(() => import("./TeacherInfoPage/TeacherPopup"), { ssr: false });
const StructuredData = dynamic(() => import("./StructuredData"), { ssr: false });
const App = dynamic(() => import("./App"), { ssr: false });
const Footer = dynamic(() => import("./footer/Footer"), { ssr: false });
const SearchForm = dynamic(() => import("./SearchFormOnSearch"), { ssr: false });
const Navigation = dynamic(() => import("./navigation/Navigation"), { ssr: false });
const Header = dynamic(() => import("./Header"), { ssr: false });
const Seo = dynamic(() => import("./Seo"), { ssr: false });
const mapboxToken = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const createURL = (state) => `?${qs.stringify(state)}`;
const toTitleCase = (str = "") =>
  str.toLowerCase().replace(/(?:^|[\s-/])\w/g, (m) => m.toUpperCase());
const algoliaClient = algoliasearch(
  process.env.ALGOLIA_SEARCHAPPID || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPPID,
  process.env.ALGOLIA_SEARCHAPIKEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPIKEY,
  {
    hostsCache: algoliaCacheCommon.createNullCache(),
    requestsCache: algoliaCacheCommon.createNullCache(),
    responsesCache: algoliaCacheCommon.createNullCache(),
  }
);

const getTeachers = (isReplica) => {
  const indexName = isReplica ? process.env.ALGOLIA_TEACHERINDEX_SW : process.env.ALGOLIA_TEACHERINDEX;
  return algoliaClient.initIndex(indexName);
};

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const MemoizedCardComponent = memo(CardComponent);
const MemoizedApp = memo(App);

const LocationPage = ({
  story,
  params,
  radius,
  userToken,
  zoomLevel,
  ipAddress,
  instrument,
  instruments,
  searchState,
  aroundLatLng,
  locationName,
  resultsState = [],
  isSwitzerland,
  _prevInstrument,
  locationData,
  _online,
}) => {
  const ref = useRef(null);
  const { query } = useRouter();
  const [show, setShow] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(!!query?.online || resultsState.length <= 5);
  const [onlineTeachers, setOnlineTeachers] = useState(_online || []);
  const [locationGeo, setLocationGeo] = useState("");
  const [popupList, setPopupList] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstShow, setIsFirstShow] = useState(false);
  const [seoFilteredData, setSeoFilterdData] = useState([]);
  const [instrumentLocationsData, setInstrumentLocationsData] = useState([]);
  const locationSections = params?.location?.replaceAll("+", "/").split("-");
  const locationItems = locationSections.map(toTitleCase).join(", ");
  const isCountry = locationSections.length === 1;
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;
  const instrumentName = params.language === "ch-en" ? instrument?.en : instrument?.de;
  const locationItemsDE = isCountry ? `der ${locationItems?.split(",")[0]}` : locationItems?.split(",")[0];
  const searchProps = useMemo(
    () => ({
      instrument_hint: params.instrument,
      instrument_placeholder: instrumentName,
      instrument: instrumentName,
      location: locationItems,
      location_hint: locationItems,
      location_placeholder: locationItems,
      submit_text: "Suchen",
      instrumentError: params.language === "ch-en" ? "Select your instrument" : "Wähle dein Instrument aus",
      locationError: params.language === "ch-en" ? "Select your location" : "Wähle deinen Unterrichtsort aus",
    }),
    [params.instrument, params.language, instrumentName, locationItems]
  );
  const filter = useSearchFilter();
  const seoActions = useSearchAnalytics({
    location_id: locationGeo,
    location_name: locationItems,
    instrument_key: instrument?.key,
    instrument_name: instrumentName,
    user_language: params?.language,
    search_instrument_name: instrumentName,
    search: resultsState,
    algolia_user_token: userToken,
  });
  const updateLocationGeo = useCallback(async () => {
    const center = await getLocation({ location: locationItems, language: params?.language }, mapboxToken);
    setLocationGeo(center);
  }, [locationItems, params.language]);
  const resultsStateHits = useMemo(() => {
    if (!isOnline) return resultsState;
    const uniqueOnline = onlineTeachers.filter((t) => !resultsState.some((r) => r?.user_id === t?.user_id));
    const combined = [...resultsState, ...uniqueOnline];
    const seen = new Set();
    return combined.filter((a) => {
      if (a?.profile_type === "music_school") return true;
      const key = `${a?.user_id}-${a?.username}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [isOnline, resultsState, onlineTeachers]);
  const getOnlineTeachers = useCallback(async () => {
    if (!instrument?.key) return;
    try {
      const index = getTeachers(isSwitzerland);
      const { hits } = await index.search(`${instrument.key} ${aroundLatLng} ${locationName || locationItems}`, {
        analyticsTags: [`lang ${params?.language}`, `device ${isMobile ? "mobile" : "desktop"}`],
        hitsPerPage: 100,
        attributesToRetrieve,
      });
      setOnlineTeachers(hits.filter((h) => h?.locations?.online));
    } catch (error) {
      console.warn('Failed to fetch online teachers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isSwitzerland, instrument?.key, aroundLatLng, locationItems, locationName, params?.language]);
  const debouncedGetOnlineTeachers = useMemo(() => debounce(getOnlineTeachers, 300), [getOnlineTeachers]);
  useEffect(() => {
    updateLocationGeo();
    document?.style?.setProperty("--scrollbar-width", `${getScrollbarWidth() || 17}px`);
    if (instrument?.key && !_online?.length) debouncedGetOnlineTeachers();
  }, [updateLocationGeo, instrument?.key, _online, debouncedGetOnlineTeachers]);
  useEffect(() => {
    const data = params.language === "ch-en" ? InstrumentLocationEn : InstrumentLocationDe;
    const regionCode = locationData?.context?.find((d) => d.id === "country.8748") ? locationData.context[0].short_code : "OTHER";
    const filtered = data.filter((d) => d.region_code_full === regionCode);
    const result = filtered.length ? filtered : data.filter((d) => d.region_code_full === "OTHER");
    setInstrumentLocationsData(result);
  }, [params.language, instrument, locationData]);

  useEffect(() => {
    const filtered = templatemapping
      .map((item) =>
        item.instrument_key === instrument.key
          ? instrumentseodata.find((desc) => desc?.instrument?.includes(item.instrument_key) && desc?.lng === params.language.split("-")[1])
          : null
      )
      .filter(Boolean);
    setSeoFilterdData(filtered.length ? filtered : instrumentseodata.filter((item) => item.instrument === "generic"));
  }, [instrument.key, params.language]);
  const { width } = useWindowSize();
  useEffect(() => {
    if (width <= 960 && isOpen) setIsOpen(false);
    if (width <= 960 && !showMap && !isFirstShow) {
      setIsFirstShow(true);
      setShowMap(true);
    }
  }, [width, isOpen, showMap, isFirstShow]);
  const meta = useMemo(
    () => ({
      description:
        params?.language === "ch-en"
          ? `${resultsStateHits.length} ${instrumentName} qualified teachers nearby. ⭐ Personalized ${instrumentName} lessons in ${locationItems.split(",")[0]}`
          : `${resultsStateHits.length} qualifizierte Lehrer in der Nähe. ⭐ Individueller ${ogTitleDe(instrumentName)} in ${locationItemsDE.split(",")[0]}`,
      title:
        params?.language === "ch-en"
          ? `Flexible ${instrumentName} lessons in ${locationItems.split(",")[0]}`
          : `Flexibler ${ogTitleDe(instrumentName)} in ${locationItemsDE.split(",")[0]}`,
    }),
    [params.language, resultsStateHits, instrumentName, locationItems, locationItemsDE]
  );
  return (
    <div className={cx("teacher-search-page")}>
      <Seo params={{ ...params }} meta={meta} />
      {isOpen && popupList?.data?.length > 0 && (
        <TeacherPopup isFullViewModal onClose={() => setIsOpen(false)}>
          {popupList.data.map((item, i) => (
            <MemoizedCardComponent key={`${item.teacher?.id || i}`} blok={item.teacher} instrument={instrument} language={params.language} />
          ))}
        </TeacherPopup>
      )}
      {!isLoading && (
        <>
          <Navigation language={params.language} isVisible={isVisible} story={story} isOnSearchPage />
          <Header ref={ref} isCountry={isCountry} instrument={instrument} language={params.language} locationItems={locationItems} />
          <SearchForm blok={searchProps} filter={filter} showMap={showMap} setShowMap={setShowMap} instruments={instruments} />
          {zoomLevel && (
            <MemoizedApp {...DEFAULT_SEARCH_PROPS} radius={radius} filter={filter} showMap={showMap} instrument={instrument} resultsStateHits={resultsStateHits} />
          )}
          <Footer story={story} />
        </>
      )}
      {!showMap && !isLoading && (
        <ShowModalButton icon="map" onClick={() => setShowMap(true)} label={translateENtoDE("Show map", params.language)} />
      )}
    </div>
  );
};
LocationPage.displayName = 'LocationPage';
export default memo(LocationPage);