import './App.css';
import MainPage from './MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { jazzStateRef, handLandmarksRef } from '../firebase/realtime_db';
// import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';


function App() {
  const [jazzState, setJazzState] = useState({});
  const [handLandmarks, setHandLandmarks] = useState(null)
  

  useEffect(() => {
    const fetchData = () => {
      // onValue(jazzStateRef, (snapshot) => {
      //   const data = snapshot.val();
      //   console.log('Jazz State changed:', data);
      //   setJazzState(data)

      // });

    };

    fetchData();
  }, []);


  return (
    <div className="App">
      <MainPage data={jazzState} handLandmarks={handLandmarks} setHandLandmarks={setHandLandmarks}/>
    </div>
  );
}

export default App;
// npm i react-scripts@latest