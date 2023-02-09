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

    import { periods } from '../stores'

    let current_period = -1;
</script>

<body>
    <div id="time">
        <MobileTime periods={periods} bind:current_period={current_period}></MobileTime>
    </div>
</body>

<style>
    body {
        align-items: center;
        justify-content: center;
        text-align: center;
    } 

    #time {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border: 3px solid green;
        padding: 10px;
    }
    
</style>