//import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import '../../App.css';
import CommonLayout from '../layout';
//import { useApi } from '../../contexts/ApiContext';
import ConjInputBox from '../../components/ConjInputBox/ConjInputBox';
import ConjTestBox from '../../components/ConjTestBox/ConjITestBox';
import ConjSpanBox from '../../components/ConjSpanBox/ConjSpanBox';

function MainPage() {
  //const api = useApi();

  // useNavigateフックを呼び出す
  //const navigate = useNavigate();


  const conjInput_input = (  langId: number, verbId: number, conjId:number, conjText: string  ) => {
    console.log( langId + ", " +  verbId + ", " + conjId + " = " + conjText );
  }

  const conjTest_input = ( isCorrect: boolean ) => {
    if( isCorrect ){
      console.log("OK");
    }else{
      console.log("OUT");
    }
  }

  return (
    <CommonLayout>
      <div>
        <ConjInputBox langId={1} verbId={1} conjId={1} person={"nosotros"} onInput={conjInput_input} />
        <ConjTestBox person={"nosotros"} answer={"vamos"} onInput={conjTest_input} />
        <ConjSpanBox person={"nosotros"} conjText={"vamos"} />
      </div>
    </CommonLayout>
  );
}

export default MainPage;
