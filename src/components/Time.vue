<template>
  <div id="centered-div">
    <p id="class-name">{{ currentPeriodMessage }}</p>
    <strong id="time">{{ countdown }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    periods: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      countdown: '',
      currentPeriodMessage: '',
      interval: null
    };
  },
  methods: {
    getCurrentTime() {
      const now = new Date();
      return now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
    },
    formatCountdown(secondsLeft) {
      const minutes = Math.floor(secondsLeft / 60);
      const seconds = secondsLeft % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },
    updateStatus() {
      const currentTimeInSeconds = this.getCurrentTime();
      let periodFound = false;

      for (const [index, period] of this.periods.entries()) {
        const periodStart = this.convertTimeToSeconds(period.startTime);
        const periodEnd = this.convertTimeToSeconds(period.endTime);

        if (currentTimeInSeconds >= periodStart && currentTimeInSeconds < periodEnd) {
          // During a period
          this.currentPeriodMessage = `${period.name} Ending in`;
          this.countdown = this.formatCountdown(periodEnd - currentTimeInSeconds);
          periodFound = true;
          break;
        } else if (index < this.periods.length - 1) {
          const nextPeriodStart = this.convertTimeToSeconds(this.periods[index + 1].startTime);
          if (currentTimeInSeconds >= periodEnd && currentTimeInSeconds < nextPeriodStart) {
            // Between periods
            this.currentPeriodMessage = `${this.periods[index + 1].name} Starting in`;
            this.countdown = this.formatCountdown(nextPeriodStart - currentTimeInSeconds);
            periodFound = true;
            break;
          }
        }
      }

      if (!periodFound) {
        // After all periods
        this.currentPeriodMessage = 'School is out';
        this.countdown = '';
      }
    },
    convertTimeToSeconds(timeStr) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 * 60 + minutes * 60;
    }
  },
  mounted() {
    this.updateStatus();
    this.interval = setInterval(this.updateStatus, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
/* You can add any additional styling you want here */
@import '@/assets/css/fonts.css';

* {
  font-family: 'Kaisei Decol', sans-serif; /* Use the defined font family */
}

#centered-div {
  position: relative;
  display: inline-block;
}

#time {
  font-size: 250px;
  color: var(--color-maincolor);
}

#class-name {
  color: var(--color-maincolor);
  position: absolute;

  top: 13px;
  left: 20px;

  font-size: 30px;
  margin-bottom: 0;
}

@media only screen and (max-width: 500px) {
  #time {
    font-size: 120px;
  }

  #class-name {
    font-size: 15px;
    margin-bottom: 100px;
  }

}


</style>
