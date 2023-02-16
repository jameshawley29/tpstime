import { writable } from 'svelte/store'
/*
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
*/

export let periods = [
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
      "08:40"
    ]
  },
  {
    "name": "2nd Period",
    "time": [
      "08:45",
      "09:15"
    ]
  },
  {
    "name": "Break/Flex",
    "time": [
      "09:20",
      "09:30"
    ]
  },
  {
    "name": "3rd Period",
    "time": [
      "9:35",
      "10:05"
    ]
  },
  {
    "name": "4th Period",
    "time": [
      "10:10",
      "10:40"
    ]
  },
  {
    "name": "5th Period",
    "time": [
      "10:45",
      "11:15"
    ]
  },
  {
    "name": "Us Lunch",
    "time": [
      "11:20",
      "11:50"
    ]
  },
  {
    "name": "6th Period",
    "time": [
      "11:55",
      "12:25"
    ]
  },
  {
    "name": "7th Period",
    "time": [
      "12:30",
      "18:00"
    ]
  }
]

export let weekSchedule = ["B","C","B","C","A"]