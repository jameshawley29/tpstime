<script>
    // Add any script logic if needed
  </script>
  
  <style>
    .lights-container {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1; /* Placed behind other content */
    }
  </style>
  
  <div class="lights-container">
    <svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="10" x2="100%" y2="10" style="stroke:gray;stroke-width:2" />
      <circle cx="2%" cy="10" r="5" fill="red" />
      <circle cx="10%" cy="10" r="5" fill="green" />
      <circle cx="18%" cy="10" r="5" fill="blue" />
      <circle cx="26%" cy="10" r="5" fill="yellow" />
      <circle cx="34%" cy="10" r="5" fill="orange" />
      <!-- Add more lights or customize as needed -->
    </svg>
  </div>
  