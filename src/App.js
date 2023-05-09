import React from 'react';
import Context from './context/Context';
import MainBody from './views/MainBody';
import './index.css';

function App() {
    return (
      <Context>
        <MainBody />
      </Context> 
    );
}
 
export default App;

