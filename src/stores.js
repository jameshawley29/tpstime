import { writable } from 'svelte/store'

export let periods = [
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
  ]

export let weekSchedule = ["B","C","B","C","A"]