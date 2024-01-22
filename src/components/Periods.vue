<template>
    <div class="periods-container">
      <h2>A Day</h2>
      <ul>
        <li v-for="(period, index) in periods" :key="index">
          {{ period.name }} {{ formatTime(period.startTime) }} - {{ formatTime(period.endTime) }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Periods',
    props: {
      periods: {
        type: Array,
        required: true,
      }
    },
    methods: {
      formatTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes.toString().padStart(2, '0')}`;
      }
    }
  };
  </script>
  


<style scoped>

@import '@/assets/css/fonts.css';
.periods-container {
  font-family: 'Karla', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-align: left;
  padding: 1em;
}

.periods-container h2 {
  text-align: center;
  border-bottom: 1px solid black;

  margin-bottom: 50px;

  font-size: 80px;
}

.periods-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.periods-container ul li {
  margin: 0.5em 0;

  font-size: 30px;
}
</style>