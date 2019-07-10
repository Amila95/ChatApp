import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route , BrowserRouter as Router} from 'react-router-dom';
import Login  from './login/Login';
import SignUp  from './signup/Signup';
import Dashboard  from './dashboard/Dashboard';



const firebase = require("firebase");
require("firebase/firestore");



firebase.initializeApp({
    apiKey: "AIzaSyDlhQJIQjQwJ-HMeFS-PP7JRTLarodNFqI",
    authDomain: "reactchat-ed831.firebaseapp.com",
    databaseURL: "https://reactchat-ed831.firebaseio.com",
    projectId: "reactchat-ed831",
    storageBucket: "reactchat-ed831.appspot.com",
    messagingSenderId: "327890159033",
    appId: "1:327890159033:web:e088092db1609ecf"
});
//edit for upload file
firebase.firestore().settings({
    timestampsInSnapshots: true
  })
  
  export const myFirebase = firebase
  export const myFirestore = firebase.firestore()
  export const myStorage = firebase.storage()
  //

const routing =(
    <Router>
        <div id='routing-container'>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
        </div>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
