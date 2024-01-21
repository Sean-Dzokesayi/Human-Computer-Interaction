// import { getDatabase, ref, onValue, set, push, get } from "firebase/database";
// // import app from './init_firebase'

// const database = getDatabase(app);
// export var jazzState;

// const uid = "0003uid"
// export const jazzStateRef = ref(database, '/');
// export const handLandmarksRef = ref(database, '/landmarks')


// function currentDateDict(){
//     var currentdate = new Date();
//     return {
//         date: currentdate.getDate(),
//         month: currentdate.getMonth() + 1, 
//         year: currentdate.getFullYear(),
//         hour: currentdate.getHours(),
//         minute: currentdate.getMinutes(),
//         second: currentdate.getSeconds(),
//         milliseconds: currentdate.getMilliseconds()
//       } 
// }

// export function message(text, uid = "0003uid") {
//     push(ref(database, 'messages/' + uid), {
//       text: text,
//       type: "user",
//       opened: false,
//       timestamp: currentDateDict()
//     });

//     console.log("message sent")
// }




