import { writable } from 'svelte/store'

export let alert = writable('Welcome to the to-do list app!')

setTimeout(()=>{
    alert = "no";
    console.log("ran")
},5000)