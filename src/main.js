import App from './App.svelte';

if (screen.width>500) {
	const app = new App({
		target: document.body,
	});
}
else {
	const app = new Time({
		target: document.body
	})
}


export default app;