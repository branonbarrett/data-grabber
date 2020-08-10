export const layerAttribution = {
  selectLayer: 'dg_selected_items',
  selectionRectangleLayer: 'select_rectangle_layer'
}

export function removeSelectionLayers(map:any) {
  if (!map || !map.eachLayer) return;

  const selectLayers = [] as any;
  map.eachLayer((layer: any) => {
    if (layer.options.attribution === layerAttribution.selectLayer) {
      selectLayers.push(layer);
    }
  });
  selectLayers.forEach((layer: any) => map.removeLayer(layer));



  let tempLayerCheck;
  map.eachLayer((layer: any) => {
    if (layer.options.attribution === layerAttribution.selectionRectangleLayer) {
      tempLayerCheck = layer;
    }
  });
  if (tempLayerCheck) {
    map.removeLayer(tempLayerCheck);
  }
}

export function getStyledPopup(data: any) {
  return `
    <div style="display: flex; flex-direction: column">
      <table>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        ${Object.keys(data).map((key) => {
          return `
              <tr>
                <td style="font-style: bold;">${key}: </td>
                <td>${data[key]}</td>
              </tr>
          `;
        }).join().replace(/,/g, '<br/>')}
      </table>
    </div>
  `;
}