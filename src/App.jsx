import * as React from 'react';
import Map, { Layer, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxTraffic from '@mapbox/mapbox-gl-traffic';

const symbolLayer = {
  'id': 'add-3d-buildings',
  'source': 'composite',
  'source-layer': 'building',
  'filter': ['==', 'extrude', 'true'],
  'type': 'fill-extrusion',
  'minzoom': 15,
  'paint': {
    'fill-extrusion-color': '#ffffff',
    'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height']
    ],
    'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.6
  }
};

const geolocateStyle = {
  float: 'right',
  margin: '10px',
  padding: '10px',
  zIndex: 999
};

function App() {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      const trafficControl = new MapboxTraffic();
      map.addControl(trafficControl, 'top-left');
    }
  }, []);

  return (
    <Map
      ref={mapRef}
      style={{ width: '100%', height: '100vh' }}
      mapboxAccessToken="pk.eyJ1Ijoic2FoaWxka3VuIiwiYSI6ImNsd3M5dXc0OTAxNDQyaXF6dmVleW8zdWMifQ.5mF06nBcoEjasgvvZpBmYg"
      initialViewState={{
        longitude: -74.0066,
        latitude: 40.7135,
        zoom: 14,
        bearing: -17.6,
        pitch: 45
      }}
      antialias={true}
      mapStyle="mapbox://styles/sahildkun/clwsacx1t01a901qs6ilob257"
    >
      <Layer {...symbolLayer} />
      {/* Uncomment if you want to use geolocate control */}
      {/* <GeolocateControl
        showUserLocation={true}
        style={geolocateStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      /> */}
    </Map>
  );
}

export default App;
