<template>
    <div class="week-container" :style="{ 'justify-content': justifyContent }">
      <div 
        class="day" 
        v-for="(day, index) in dayTypes" 
        :key="index"
        :class="{ underline: selectedDay === index + 1 }"
      >
        {{ day }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WeekDays',
    props: {
        selectedDay: {
            type: Number,
            required: true
        },
        dayTypes: { // New prop for day types
            type: Array,
            required: true
        }
    },
    computed: {
        justifyContent() {
            return this.dayTypes.length === 5 ? 'space-between' : 'space-evenly';
        }
    }
};
  </script>
  
<style scoped>

@import '@/assets/css/fonts.css';

  .week-container {
    display: flex;
    width: 100%; /* You can adjust this as needed */

    font-family: "Karla", sans-serif;
  }
  .day {
    cursor: pointer;
    /* Add additional styling as desired */
  }
  .underline {
    text-decoration: underline;
  }
</style>
  