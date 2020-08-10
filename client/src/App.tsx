import React from 'react';
import axios from 'axios';
import './App.css';
import MainMap from './MainMap';
import ToolBar from './Toolbar';
import { ContainerContextProvider } from './ContainerContext';

function App() {
  // axios.get(`http://localhost:3001/layers/vt_resw`)
  //   .then(res => {
  //     const layers = res.data;
  //     setState({ layers });
  //   });

  return (
    <div className="App">
      <ContainerContextProvider>
        <ToolBar />
        <MainMap />
      </ContainerContextProvider>
    </div>
  );
}

export default App;
