import App from './App.svelte';
import Mobile from './mobile/Mobile.svelte'


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

  
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

fetch('https://us-central1-tpstime-29af8.cloudfunctions.net/v1',{'method':"get","mode":"no-cors"}).then((res)=> {
	console.log(res);
})


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