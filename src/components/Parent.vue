<script>
import WeekDays from './Week.vue';
import TimeString from './Time.vue';
import Background from './Background.vue';
import Periods from './Periods.vue';
import Advertisement from './Advertisement.vue';
  
export default {
  components: {
    WeekDays,
    TimeString,
    Background,
    Periods,
    Advertisement,
},
  data() {

    const today = new Date();
    const dayOfWeek = today.getDay(); // JavaScript getDay() returns 0 for Sunday, 1 for Monday, and so on.
    const selectedDay = dayOfWeek === 0 ? 7 : dayOfWeek;

    return {
      selectedDay: selectedDay, // Example selected day
      dayTypes: ['B', 'C', 'A', 'B', 'C'], // Example day types
      periodData: [
        { name: 'First Period', startTime: '8:10', endTime: '9:30' },
        { name: 'Break', startTime: '9:35', endTime: '9:55' },
        { name: 'Third Period', startTime: '10:00', endTime: '11:20' },
        { name: 'Fifth Period', startTime: '11:25', endTime: '12:45' },
        { name: 'Lunch', startTime: '12:50', endTime: '13:30' },
        { name: 'Seventh Period', startTime: '13:35', endTime: '14:55' },
    ],
    //adImageUrl: 'https://images.squarespace-cdn.com/content/v1/617ac6f28abd337ac8fc5f75/f851fdff-2380-4b4f-a08b-bc23bc57f96c/Star+of+the+Seas+Guide+%281%29.png', // Replace with your ad image URL

    };
  }
};
</script>

<template>
    <div class="section1">
        <Background id="background"></Background>
        <div id="container">
            <div class="week-days-top-left">
                <WeekDays :selectedDay="selectedDay" :dayTypes="dayTypes" />
            </div>
            <div id="centered-div">
                <TimeString :periods="periodData" />
            </div>
            <div class="periods">
                <Periods :periods="periodData" class="periods-placement" />
            </div>
        </div>
    </div>
    
    <div class="section2">
        <div class="advertisement-space">
            <Advertisement :imageUrl="adImageUrl" />
        </div>
    </div>
</template>
  
    
<style scoped>

.section2 {
    padding-top: 100vh;
    padding-bottom: 20px;
}

.section1 {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center; /* Centers horizontally */
    align-items: center;
}

.advertisement-space {
  width: 80%;
  text-align: center; /* Center the advertisement image */
  margin: 0 auto;
}

.periods-placement {
    position: absolute;
    top: calc(100vh - 200px); /* Adjust this value as needed to offset from the bottom */
    right: 15vw;
    width: auto; /* Adjust the width as needed, or remove it to use the content's width */
}

#container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

#centered-div {
    position: relative;
}

.week-days-top-left {
    position: absolute;

    top: 0px;
    left: 20px;

    font-size: 80px;
    width: 6in;

    margin: 0;
}

#week-days {
    width: 20in;
}


@media only screen and (max-width: 500px) {
  
  .week-days-top-left {
    font-size: 40px; /* Smaller font size */
    left: 10px;
    width: 3in; /* Adjust width as needed */
  }

  .periods-placement {
    position: absolute;
    top: calc(100vh - 200px); /* Adjust this value as needed to offset from the bottom */
    right: 15vw;
    width: auto; /* Adjust the width as needed, or remove it to use the content's width */
  }

  .advertisement-space {
    width: 100%; /* Full width on small screens */
  }

  .advertisement-space img {
    max-width: 100%;
    height: auto;
  }

  /* Adjust container widths as needed */
  .section1, .section2 {
    width: 100%; /* Full width */
  }

  /* Add any other necessary style adjustments here */
}



</style>
  