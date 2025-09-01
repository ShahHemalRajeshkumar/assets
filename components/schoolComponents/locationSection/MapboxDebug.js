import React, { useState } from 'react';
import { Map, NavigationControl } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapboxDebug = () => {
  const [viewState, setViewState] = useState({
    longitude: 8.7137,
    latitude: 47.4979,
    zoom: 12
  });

  if (!MAPBOX_ACCESS_TOKEN) {
    return (
      <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}>
        <p>Mapbox token is missing. Please check your environment variables.</p>
      </div>
    );
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
};

export default MapboxDebug;