import App from './App.svelte';
import Mobile from './mobile/Mobile.svelte'




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