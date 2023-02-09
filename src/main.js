import App from './App.svelte';
import Mobile from './mobile/Mobile.svelte'


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let periods = [
	{
	  "name": "Advisory",
	  "time": [
		"08:00",
		"08:05"
	  ]
	},
	{
	  "name": "First Period",
	  "time": [
		"08:10",
		"09:30"
	  ]
	},
	{
	  "name": "Break/Flex",
	  "time": [
		"09:35",
		"09:55"
	  ]
	},
	{
	  "name": "Third Period",
	  "time": [
		"10:00",
		"11:20"
	  ]
	},
	{
	  "name": "Fifth Period",
	  "time": [
		"11:25",
		"12:45"
	  ]
	},
	{
	  "name": "US Lunch",
	  "time": [
		"12:50",
		"13:30"
	  ]
	},
	{
	  "name": "Seventh Period",
	  "time": [
		"13:35",
		"14:55"
	  ]
	},
	{
	  "name": "Study Hall",
	  "time": [
		"14:55",
		"15:15"
	  ]
	}
  ]

  let aday = {"hs":[
	{
	  "name": "Advisory",
	  "time": [
		"08:00",
		"08:05"
	  ]
	},
	{
	  "name": "First Period",
	  "time": [
		"08:10",
		"08:55"
	  ]
	},
	{
	  "name": "Second Period",
	  "time": [
		"09:00",
		"09:45"
	  ]
	},
	{
	  "name": "Break/Flex",
	  "time": [
		"09:50",
		"10:00"
	  ]
	},
	{
	  "name": "Third Period",
	  "time": [
		"10:05",
		"10:50"
	  ]
	},
	{
	  "name": "Fourth Period",
	  "time": [
		"10:55",
		"11:40"
	  ]
	},
	{
	  "name": "Fifth Period",
	  "time": [
		"11:45",
		"12:30"
	  ]
	},
	{
	  "name": "US lunch",
	  "time": [
		"12:35",
		"13:15"
	  ]
	},
	{
	  "name": "Sixth Period",
	  "time": [
		"13:20",
		"14:05"
	  ]
	},
	{
	  "name": "Seventh Period",
	  "time": [
		"14:10",
		"14:55"
	  ]
	},
	{
	  "name": "Study Hall",
	  "time": [
		"14:55",
		"15:15"
	  ]
	}
  ]}

  
const firebaseConfig = {
	apiKey: "AIzaSyCXh4rQxIfD8bbtIvixSVhBGtozYy3d1mY",
	authDomain: "tpstime-29af8.firebaseapp.com",
	projectId: "tpstime-29af8",
	storageBucket: "tpstime-29af8.appspot.com",
	messagingSenderId: "224064256746",
	appId: "1:224064256746:web:3623af67b1749021773593",
	measurementId: "G-E64KVFFD4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*
const db = getFirestore(app);

import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore"; 

async function getStuff() {
	const docRef = doc(db, "day-data", "2023-2-9")
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		console.log("Day Type:", docSnap.data()["day-type"]);
	} else {
		console.log("No such document!");
	}

	try {
		const docRef = await setDoc(doc(db, "time-data", "A"), aday);
		console.log("Document written with ID: ", docRef);
	  } catch (e) {
		console.error("Error adding document: ", e);
	  }


}

getStuff()
*/


if (window.innerWidth>500) {
	console.log("viewing desktop verison")
	const app = new App({
		target: document.body,
	});
}
else {
	console.log("viewing mobile version")
	const app = new Mobile({
		target: document.body
	})
}


export default app;