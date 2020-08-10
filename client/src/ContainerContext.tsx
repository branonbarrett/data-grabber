import React from 'react';
import { Map } from 'react-leaflet';
import { GeoJsonDataLayer } from './Layer';

interface AppState {
  count: number;
  selectIsActive: boolean;
  map: Map | null;
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'toggleSelect':
      console.log('state.selectIsActive:', state.selectIsActive ? false : true)
      return { ...state, selectIsActive: state.selectIsActive ? false : true, count: state.count + 1 };
    case 'setMap':
      return { ...state, map: action.value };
    case 'setLayers':
      return { ...state, layers: action.value };
    default:
      throw new Error();
  }
};

const increment = () => ({ type: 'increment' });
const decrement = () => ({ type: 'decrement' });
const toggleSelect = () => ({ type: 'toggleSelect' });
const setMap = (map: Map) => ({ type: 'setMap', value: map });
const setLayers = (layers: GeoJsonDataLayer[]) => ({ type: 'setLayers', value: layers });

const actions = (dispatch: any) => ({
  increase: () => dispatch(increment()),
  decrease: () => dispatch(decrement()),
  toggleSelect: () => dispatch(toggleSelect()),
  setMap: (map: Map) => dispatch(setMap(map)),
  setLayers: (layers: any[]) => dispatch(setLayers(layers))
});

const initialState = {
  state: { 
    count: 0,
    selectIsActive: false,
    map: {} as any,
    layers: [] as GeoJsonDataLayer[]
  },
  actions: actions(null)
};

const ContainerContext = React.createContext(initialState);

export const ContainerContextProvider = (props: any) => {
  const [reducerState, dispatch] = React.useReducer(reducer, initialState.state);
  const reducerActions = actions(dispatch);
  const context = {
    state: { ...reducerState },
    actions: { ...reducerActions }
  };

  return (
    <ContainerContext.Provider value={context}>
      {props.children}
    </ContainerContext.Provider>
  );
};

export const useContainerContext = () => React.useContext(ContainerContext);
