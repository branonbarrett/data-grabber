import React from 'react';
import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import './MainMap.css';

function MainMap() {
  function handleClick(e: any) {
    console.log('Map was clicked.', e);
  }

  return (
    <Map
      className="Map"
      center={[51.505, -0.09]}
      zoom={5}
      onClick={handleClick}>
      <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <FeatureGroup>
        <EditControl
          position='topright'
          draw={{
            rectangle: true,
            polygon: false
          }}
        />
        <Circle center={[51.51, -0.06]} radius={200} />
      </FeatureGroup>
    </Map>
  );
}

export default MainMap;