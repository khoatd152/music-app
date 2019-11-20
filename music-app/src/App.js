import React from 'react';
import './App.css';
import { BrowserRouter as Router, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Store/Store';
import MainMenuComponent from './Components/MainMenuComponent/MainMenuComponent';
import Body from './Components/BodyComponent/BodyComponent';
import MiniPlayer from './Components/MiniPlayerComponent/MiniPlayerComponent';
import LoginModal from './Components/LoginModalComponent/LoginModalComponent';
import CustomModal from './Components/ModalComponent/ModalComponent';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Provider store={store}>
      {/* <Router> */}
      <BrowserRouter>
        <LoginModal modal={0} />
        <CustomModal />
        <MainMenuComponent />
        <Body />
        <MiniPlayer />
      </BrowserRouter>
      {/* </Router> */}
    </Provider>
  );
}

export default App;
