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
          "21:20"
        ]
      },
      {
        "name": "Study Period",
        "time": [
          "21:25",
          "22:35"
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






//export let weekSchedule = ["N","B","C","A","A"]

export let current_period = writable(-1);

const stored = localStorage.is_hs;
console.log("LOCAL STOERSGE: "+stored);
export let is_hs = writable(stored? stored=="true":true);
export let periods = writable(days["B"]);

let is_hs_val = true;

is_hs.subscribe((value) => {
  is_hs_val = value;
  current_period = writable(-1);
  console.log("is_hs: "+value)
  localStorage.is_hs = value;
  getCrap()
  
})

export let weekSchedule = writable(['N', 'N', 'N', 'N', 'N'])


function getCrap() {

  let response = fetch(`https://data.mongodb-api.com/app/trinity-schedule-pazfo/endpoint/tpstime_info?is_hs=${is_hs_val}`);
  let obj = response.then(res => {
          return res.json();
  });
  
  obj.then(res => {
      console.log(res.day, res.week, res.schedule);
  
  
  
  
      //let test_schedule = [{name: "period 2", time: ["19:00","19:50"]}]
  
      periods.set(res.schedule);
  
      let lol = []
      for (let i of res.week) {
        lol.push(i["name"][0])
      }
  
      console.log(lol)
  
      weekSchedule.set(lol)
  });
}

getCrap()