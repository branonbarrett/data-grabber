import React from 'react';
import { LatLng } from 'react-leaflet';
import * as L from 'leaflet';
import IconButton from '@material-ui/core/IconButton';
import SelectAllSharp from '@material-ui/icons/SelectAllSharp'
import axios from 'axios';

import { useContainerContext } from './ContainerContext';
import { layerAttribution, removeSelectionLayers, getStyledPopup } from './common';

export const SelectTool = () => {
  const context = useContainerContext();
  const { map, selectIsActive } = context.state;
  const { toggleSelect } = context.actions;

  let startPoint: LatLng | null = null;
  let selectRectangle: L.Rectangle | null = null;
  let selectPointsLayer: L.Layer;

  const startDraw = (e: any) => {
    
    if (selectIsActive) {
      if (selectRectangle) {
        map.removeLayer(selectRectangle);
        selectRectangle = null;
      }

      e.originalEvent.preventDefault();
      startPoint = e.latlng;
      console.log(startPoint)
      
      // create an orange rectangle
      map.on('mousemove', (e: any) => draw(e));
    }
  }

  const stopDraw = (e: any) => {
    if (!selectIsActive) return;

    e.originalEvent.preventDefault();
    map.off('mousemove');
    startPoint = null;

    if (selectRectangle) {
      const bounds = selectRectangle.getBounds();
      console.log('getBounds:', selectRectangle.getBounds());
      console.log('getLatLngs:', selectRectangle.getLatLngs());
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      const params = `${southWest.lng},${southWest.lat},${northEast.lng},${northEast.lat}`

      axios.get(`http://localhost:3001/layers/vt_plcwa?bbox=${params}`)
        .then((res: any) => {
          const result = res.data;
          console.log('query results:', result)
          const features = result.map((data: any) => {
            return {
              type: 'Feature',
              properties: {
                ...data,
                popupContent: getStyledPopup(data)
              },
              geometry: data.geom
            };
          });
          const myStyle = {
            "color": "#03fcf4",
            "weight": 6,
            "opacity": 0.75
          };

          function addPopupContent(feature: any, layer: any) {
            if (feature.properties && feature.properties.popupContent) {
              layer.bindPopup(feature.properties.popupContent);
            }
          } 
          
          L.geoJSON(features as any, {
              style: myStyle,
              attribution: layerAttribution.selectLayer,
              onEachFeature: addPopupContent
          }).addTo(map);
        });
      
      map.removeLayer(selectRectangle);
      toggleSelect();
    }
  }

  const draw = (e: any) => {
    if (selectIsActive && startPoint) {
      if (selectRectangle === null) {
        selectRectangle = L.rectangle(
          [startPoint, startPoint] as L.LatLngBoundsExpression,
          { color: "#ff7800", weight: 1, attribution: layerAttribution.selectionRectangleLayer }
        ).addTo(map);
      }
      e.originalEvent.preventDefault();
      // console.log('draw....:', e)
      const bounds = [startPoint, e.latlng] as L.LatLngBoundsExpression;
      selectRectangle?.setBounds(bounds)
    }
  }
  
  if (selectIsActive) {
    map.on('mousedown', startDraw);
    map.on('mouseup', (e: any) => stopDraw(e));
    map.dragging.disable();
  } else if (map && map.off) {
    // clear map select layer
    map.off('mousedown');
    map.off('mouseup');
    map.off('mousemove');
    map.dragging.enable();
  }

  removeSelectionLayers(map)

  return (
    <IconButton color={selectIsActive ? "secondary" : "inherit" } aria-label="select" onClick={() => toggleSelect()}>
      <SelectAllSharp />
    </IconButton>
  )
}