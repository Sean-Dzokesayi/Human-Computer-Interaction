import './App.css';
import MainPage from './MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { jazzStateRef, handLandmarksRef } from '../firebase/realtime_db';
// import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import * as handpose from "@tensorflow-models/handpose";
import { ModelProvider } from './ModelProvider';
import { AppProvider } from './AppProvider';



function App() {
  const [jazzState, setJazzState] = useState({});
  const [handLandmarks, setHandLandmarks] = useState(null)
  // const { mpHandsModel } = useModel();

  // useEffect(() => {
  //   const fetchData = () => {
  //     // onValue(jazzStateRef, (snapshot) => {
  //     //   const data = snapshot.val();
  //     //   console.log('Jazz State changed:', data);
  //     //   setJazzState(data)

  //     // });

  //   };

  //   fetchData();
  // }, []);


  return (
    <AppProvider>
        <ModelProvider>
          <div className="App">
            <MainPage />
          </div>
        </ModelProvider>
     </AppProvider>
    
    
  );
}

export default App;
// npm i react-scripts@latest