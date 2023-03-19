<script>
    import { is_hs } from '../stores';

    let is_hs_val;

    is_hs.subscribe((value) => {
        is_hs_val = value;
    })

    function set_hs(val) {
        is_hs.set(val)
    }

    console.log("VAL NOW IS"+is_hs_val);
</script>


<div>
    <button on:click={()=>{set_hs(true)}}>HS</button>
    <button on:click={()=>{set_hs(false)}}>MS</button>
</div>


<style>
    div {
        display: inline;
    }
</style>