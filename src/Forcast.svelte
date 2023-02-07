<script>
    export let weekSchedule = ["N","N","N","N","N"]
    console.log(weekSchedule);

    const today = new Date()
    const dayOfWeek = today.getDay()

</script>

<div>
    {#each weekSchedule as day, i}
        {#if i==dayOfWeek-1}
            <p class="selected">{day}</p>
        {:else}
            <p>{day}</p>
        {/if}
    {/each}
</div>

<style>
    div {
        display: flex;
        width: 40vw;

        justify-content: space-between;
    }

    div > p {
        font-size: 2vw;
        font-weight: 600;
        text-align: center;
        margin: 0;
    }

    div > p.selected {
        color: yellow;
    }
</style>