<script>
    // @ts-nocheck
        import { current_period } from "./stores.js";
    
    
        export let period;
        export let i;
    
        let font_size = 1.736
        let font_color = "black"
        let shadow = ""

        //HEHRERERERERERERERERERE working with alerts and subscriptions
        current_period.subscribe( (value) => {update(value)})
        
    
        function update(val) {
            if (i == val) {
                font_size = 6
                font_color = "white"
                shadow = "5px 5px 15px rgba(100, 100, 100, 0.3)"
            } else {
                font_size = 3.4
                font_color = "black"
                shadow = ""
            }
        }
        //update()
        //setInterval(update,1000)

    
    </script>
    
    <div style="font-size: {font_size}vh; color: {font_color}; text-shadow: {shadow}">
        <p id="name">
            {period.name}
        </p>
        <p class="hoverable">
            -
        </p>
        <p id="time" class="hoverable">
            {period.time[0]}
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
            padding: 0 1vw;
            margin: 0;
            
        }
    
    
        .hoverable {
            transition: 0.25s ease;
            opacity: 0%;
            cursor:default;
        }

        #name:hover ~ .hoverable {
            opacity: 100%;
        }
        
    </style>