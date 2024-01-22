<template>
    <div>
      <img :src="backgroundSvg" alt="Background" class="background-svg"/>
    </div>
    <div>
      
    </div>
  </template>
  
  <script>
  import backgroundSvg from '../assets/svg/blue-background-image.svg';
  import bottomSvg from '../assets/svg/bottom-waves-image.svg';
  
  export default {
    name: 'BackgroundSvg',
    data() {
      return {
        backgroundSvg,
        bottomSvg
      };
    }
  };
  </script>
  
<style scoped>
.background-container {
  position: relative; /* This ensures that the bottomSvg is positioned relative to this container */
  min-height: 100vh; /* Adjust as needed */
}

.background-svg, .bottom-svg {
  width: 100vw;
  position: absolute;
  left: 0;
}

.background-svg {
  top: 0;
}

.bottom-svg {
  bottom: 0; /* This will place it at the bottom of the .background-container */
}
</style>