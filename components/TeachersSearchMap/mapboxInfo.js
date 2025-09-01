import { useEffect } from 'react';
import { useMap } from 'react-map-gl';

export const MAP_STYLE = 'mapbox://styles/matchspace/cl2qnbfyw004015qmdq5rfgvn/draft';
export const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const FlyTo = ({ lat, lng }) => {
  const { current: map } = useMap();

  useEffect(() => {
    map.flyTo({ center: [lng, lat] });
  }, [lat, lng, map]);

  return null;
};

export const sortAndGroup = (arr = []) => {
  let result = [];
  let groupArray;

  arr.sort(function (a, b) {
    return a.longitude - b.longitude || a.latitude - b.latitude;
  });

  for (let i = 0; i < arr.length; i++) {
    if (arr[i - 1]?.longitude !== arr[i]?.longitude && arr[i - 1]?.latitude !== arr[i]?.latitude) {
      groupArray = [];
      result.push(groupArray);
    }
    groupArray?.push(arr[i]);
  }

  return result;
};

export const getCurrentMarkerID = (marker, uuid) => {
  if (uuid) {
    return marker?.uuid || marker?.id;
  }

  return marker?.id || `${marker?.latitude}-${marker?.longitude}`;
};

export const getPinFullAddress = (marker, withoutDigit) => {
  if (withoutDigit) {
    return (
      marker?.full_address?.replace(/\d+/g, '')?.replace(/ ,/g, ',') ||
      `${marker?.street || ''},
      ${marker?.zip || ''}
      ${marker?.city ? `${marker?.city}, ` : ''}
      ${marker?.country_name || ''}`
    );
  }

  return (
    marker?.full_address ||
    `${marker?.street || ''}
  ${marker?.street_no ? `${marker?.street_no}, ` : ''}
  ${marker?.zip || ''}
  ${marker?.city ? `${marker?.city}, ` : ''}
  ${marker?.country_name || ''}`
  );
};
