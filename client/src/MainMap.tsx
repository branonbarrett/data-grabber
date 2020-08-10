import React from 'react';
import axios from 'axios';
import { Map, TileLayer } from 'react-leaflet';
import './MainMap.css';
import { useContainerContext } from './ContainerContext';
import { GeoJsonDataLayer } from './Layer';

function MainMap() {
  const context = useContainerContext();

  const { setMap, increase, setLayers } = context.actions;
  const { count, map } = context.state;


  function handleClick(e: any) {
    
  }

  function onMapLoad(e: any) {
    console.log('map loaded:', e);
  }

  function onLayerAdd(e: any) {
    if (count <= 1) {
      increase();
      setMap(e.target);
    }
  }

  return (
    <Map
      className="Map"
      center={[44.5588, -72.5778]}
      zoom={8}
      onload={onMapLoad}
      onClick={handleClick}
      onlayeradd={onLayerAdd}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
}

export default MainMap;