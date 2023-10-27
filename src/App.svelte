<svelte:head>
	<title>TPS Time</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>


<script>
    import Time from './Time.svelte';
    import Period from './Periods.svelte'
    import MenuButton from './MenuButton.svelte';
	import Forcast from './Forcast.svelte';

	import { periods, weekSchedule } from './stores'

    let weekScheduleVal = ['N', 'N', 'N', 'N', 'N']

    weekSchedule.subscribe((val)=> {
        weekScheduleVal = val
    })

    let periods_val;   

    periods.subscribe((val) => {periods_val = val});


//export let periods;



</script>

<body>
	<div id="forcast-bar">
		<Forcast weekSchedule={weekScheduleVal}></Forcast>
	</div>
    <div id="menu-bar">
        <MenuButton></MenuButton>
    </div>
    {#key periods_val}
    <div id="periods">
        {#each periods_val as period, i}
        <Period period={period} i={i}></Period>
        {/each}
    </div>
	
    <div id="time-div">
        <Time></Time>
    </div>
    {/key}
	
    <p id="my-name">James Hawley</p>
</body>

<style>
    #my-name {
        position: absolute;
        right: 10px;
        bottom: 0px;

        font-family: Roboto;

        color: black;
    }


    body {
        background-color: #9d38dc;
        /* #62C6F2 9d38dc  C37125*/
        overflow-x: hidden;
    }

    /*
    body::-webkit-scrollbar {
        display: none;
    }
    */

    #menu-bar {
        position: absolute;
        right: 1vw;
        top: 1vh;
    }
    

    #time-div {
        position: absolute;

        right: 17%;
        top: 50%;

        transform: translateY(-50%);
    }

    #periods {
        display: flex;
        flex-direction: column;
        margin: 0;

        height: 97vh;

        justify-content: space-around;

    }

	#forcast-bar {
		position: absolute;

		top: 5px;
		left: 50%;
		margin-left: -20vw;
	}
</style>