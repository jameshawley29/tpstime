<svelte:head>
	<title>Test</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<script>
    import MobileTime from "./MobileTime.svelte";
    import MobileForcast from "./MobileForcast.svelte";
    import MobileButtons from "./MobileButtons.svelte";

    import { periods, weekSchedule } from '../stores';

    let weekScheduleVal = ['N', 'N', 'N', 'N', 'N']

    weekSchedule.subscribe((val)=> {
        weekScheduleVal = val
    })



    let current_period = -1;
</script>

<body>
    <div id="forcast">
        <MobileForcast weekSchedule={weekScheduleVal}></MobileForcast>
    </div>
    <div id="time">
        <MobileTime></MobileTime>
    </div>
    <div id="buttons">
        <MobileButtons></MobileButtons>
    </div>
</body>

<style>
    body {
        background-color: #62C6F2;
    }

    #time {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 10px;
    }

    #forcast {
        align-items: center;

        padding-top: 1vh;
    }

    #buttons {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 10px;
    }

    
</style>