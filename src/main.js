import App from './App.svelte';
import Mobile from './mobile/Mobile.svelte'

if (screen.width>500) {
	const app = new App({
		target: document.body,
	});
}
else {
	const app = new Mobile({
		target: document.body
	})
}


export default app;