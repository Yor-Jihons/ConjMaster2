//import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import CommonLayout from '../layout';
//import { useApi } from '../../contexts/ApiContext';

function MainPage() {
  //const api = useApi();

  // useNavigateフックを呼び出す
  const navigate = useNavigate();

  const spanishButton_click = () => {
    navigate( "/spanish" );
  }

  const frenchButton_click = () => {
    navigate( "/french" );
  }

  const italianButton_click = () => {
    navigate( "/italian" );
  }

  return (
    <CommonLayout>
      <div>
        <button onClick={spanishButton_click}>スペイン語</button>
        <button onClick={frenchButton_click}>フランス語</button>
        <button onClick={italianButton_click}>イタリア語</button>
      </div>
    </CommonLayout>
  );
}

export default MainPage;
