import App from './App.svelte';
import Mobile from './mobile/Mobile.svelte'

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

if (window.innerWidth>500) {
	console.log("ehllowww");
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