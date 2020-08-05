import React from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import './MainMap.css';

function MainMap() {
  function handleClick(e: any) {
    console.log('Map was clicked.', e);
  }

  return (
    <Map
      className="Map"
      center={[44.5588, -72.5778]}
      zoom={8}
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
      </FeatureGroup>
    </Map>
  );
}

export default MainMap;