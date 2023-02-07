<script>
    let weekSchedule = ["A","B","C","A","A"]

</script>

<div>
    {#each weekSchedule as day}
        <p>{day}</p>
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
</style>