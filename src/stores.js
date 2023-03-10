import { writable } from 'svelte/store'

let days = {

  "C" : [
      {
        "name": "Advisory",
        "time": [
          "08:00",
          "08:20"
        ]
      },
      {
        "name": "Second Period",
        "time": [
          "08:25",
          "09:45"
        ]
      },
      {
        "name": "Break/Flex",
        "time": [
          "09:50",
          "10:15"
        ]
      },
      {
        "name": "Fourth Period",
        "time": [
          "10:20",
          "11:40"
        ]
      },
      {
        "name": "US Middle Block",
        "time": [
          "11:45",
          "12:35"
        ]
      },
      {
        "name": "US Lunch",
        "time": [
          "12:40",
          "13:20"
        ]
      },
      {
        "name": "Sixth Period",
        "time": [
          "13:25",
          "14:45"
        ]
      },
      {
        "name": "Study Period",
        "time": [
          "14:45",
          "20:35"
        ]
      }
    ],

    "B" : [
      {
        "name": "Advisory",
        "time": [
          "08:00",
          "08:05"
        ]
      },
      {
        "name": "1st Period",
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
        "name": "3rd Period",
        "time": [
          "10:00",
          "11:20"
        ]
      },
      {
        "name": "5th Period",
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
        "name": "7th Period",
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
}






export let weekSchedule = ["N","B","C","A","A"]

export let current_period = writable(-1);

const stored = localStorage.is_hs;
console.log("LOCAL STOERSGE: "+stored);
export let is_hs = writable(stored? stored:true);
export let periods = writable(days["B"]);

is_hs.subscribe((value) => {
  console.log("is_hs: "+value)
  localStorage.is_hs = value;
  periods.set(value? days["C"]: days["B"]);
})
