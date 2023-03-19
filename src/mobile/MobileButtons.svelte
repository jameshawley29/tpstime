<script>
    import { is_hs } from '../stores';

    let is_hs_val;

    is_hs.subscribe((value) => {
        is_hs_val = value;
    })


</script>


<div>
    <button class="button" style="background-color: {is_hs_val? "yellow": "white"}" on:click={() => {is_hs.set(true)}}>HS</button>
    <button class="button" style="background-color: {is_hs_val? "white": "yellow"}" on:click={() => {is_hs.set(false)}}>MS</button>
</div>


<style>
    div {
        display: inline-flex;
    }

    button {
        width: 70px;
        height: 40px;

        border-radius: 5%;
        outline: none;
        border: none;

        color: #62C6F2;
        background-color: white;

        font-weight: 700;
        font-size: 25px;

        text-align: center;

        margin: 10px;

    }
</style>