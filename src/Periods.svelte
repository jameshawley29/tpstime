<script>
    // @ts-nocheck
    
        export let period;
        export let i;
        export let current_period;
    
        let font_size = 1.736
        let font_color = "black"
        let shadow = ""
    
        function update() {
            if (i == current_period) {
                font_size = 3
                font_color = "white"
                shadow = "5px 5px 15px rgba(100, 100, 100, 0.3)"
            } else {
                font_size = 1.736
                font_color = "black"
                shadow = ""
            }
        }
        update()
        setInterval(update,1000)

        let hoverableTimeShown = "";
        function hoverd(entering) {
            if (entering) {
                hoverableTimeShown = period.time[0]
            } else {
                hoverableTimeShown = ""
            }
        }
    
    </script>
    
    <div style="font-size: {font_size}vw; color: {font_color}; text-shadow: {shadow}">
        <p id="name" on:mouseenter={hoverd(true)} on:mouseleave={hoverd(false)} on:focus={hoverd(true)}>
            {period.name}
        </p>
        <p class="hoverable">
            -
        </p>
        <p id="time" class="hoverable">
            {hoverableTimeShown}
        </p>
        
    </div>
    
    <style>
        div {
            display: flex;
            align-items: center;
    
            font-family: Roboto;
    
            font-weight: 700;
        }
    
        div > #name {
            display: inline;
    
    
            letter-spacing: 0.1736vw;
    
            transition: 1s ease;
        }
    
        div > p {
            padding-left: 1vw;
        }
    
    
        .hoverable {
            transition: 0.2s ease-in-out;
        }
        
    </style>