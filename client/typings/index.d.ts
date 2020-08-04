declare module 'react-leaflet-draw' {
  import * as React from 'react';
  import { ControlPosition } from 'leaflet';


  interface EditControlProps {
    onEdited?: Function;
    onDrawStart?: Function;
    onDrawStop?: Function;
    onDrawVertex?: Function;
    onEditStart?: Function;
    onEditMove?: Function;
    onEditResize?: Function;
    onEditVertex?: Function;
    onEditStop?: Function;
    onDeleted?: Function;
    onDeleteStart?: Function;
    onDeleteStop?: Function;

    onCreated?: Function,
    onMounted?: Function;
    draw: {
      polyline?: boolean;
      polygon?: boolean;
      rectangle?: boolean;
      circle?: boolean;
      marker?: boolean;
      circlemarker?: boolean;
    },


    position: ControlPosition,
  }

  export class EditControl extends React.Component<EditControlProps> {}
}