<script>
    let changer = []
    function get_rgb(percent, alpha) {
    percent *= 100;
    let r = 0;
    let b = 0;
    let g = 0;
    if (percent > 50) {
        //2
        b = (100 - percent) * 5;
        //1
        g = (250 - b);
    } else {
        //3
        r = (50 - percent) * 5;
        //2
        b = (250 - r);
    }
    if (alpha == undefined) {
        alpha = 1
    }

    return `rgb(${r},${g},${b},${alpha})`;
}


function update(number) {
    const percent = number/(60)
    let rgb = get_rgb(percent);
    document.getElementById("block").style.color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    document.getElementById("block").innerHTML = number;
    number--;
    console.log(number);
    if (number > 0) {
        setTimeout(function(){update(number)}, 1000);
    }
}

//update(60);


function get_time_left(schedule_obj, clock_id, color_change_id, description_id) {
    let linear_time_pairs = schedule_obj.map(element => element.time);
    //console.log(linear_time_pairs);
    let linear_time = []
    for (let i of linear_time_pairs) {
        linear_time.push(i[0]);
        linear_time.push(i[1]);
    }
    //console.log(linear_time);

    //set start index
    let index = 0;

    function update() {
        let current_time = new Date();
        let current_time_ss = timestring_to_seconds(`${current_time.getHours()}:${current_time.getMinutes()}`) + current_time.getSeconds();

        for (let bell_time of linear_time.slice(index)) {
            const bell_time_ss = timestring_to_seconds(bell_time);
            //console.log("diff: ", bell_time_ss-current_time_ss);

            if (current_time_ss <= bell_time_ss) {
                //CHANGE ALL DOCUMENT ATTRIBUTES

                //diff in mins
                const diff = (bell_time_ss-current_time_ss);
                //console.log("diff: ", diff);
                let the_diff = time_diff_to_time_string(diff)
                document.getElementById(clock_id).innerHTML = the_diff;
                document.title = `${parseInt(diff/60)} mins left`;

                
                
                //name of period
                const period_num = Math.round((index+1)/2);
                //console.log("period num: ", period_num);
                //console.log("period name: ", schedule_obj[period_num-1].name);

                const period_name = schedule_obj[period_num-1].name;
                const is_start = index%2==0

                
                //change description
                document.getElementById(description_id).innerHTML = get_description(period_name, is_start);


                //color
                if (index > 0) {
                    const class_length = timestring_to_seconds(linear_time[index]) - timestring_to_seconds(linear_time[index-1]);
                    //new color
                    const color = get_rgb(diff/class_length);
                
                    //console.log(get_rgb(diff/class_length));
                    document.getElementById("clock").style.color = color;
                    document.getElementById("day-type").style.color = color;


                    //INFO BLOCK CHANGE
                    document.getElementById("info-block").style.backgroundColor = get_rgb((diff/class_length),0.6);

                }


                return true;
            }

            //add 1 to index
            index++;

            //if ran out of class
            if (index >= (schedule_obj).length*2) {
                document.getElementById("clock").innerHTML = "0:00";
                document.getElementById("description").innerHTML = "No More School";
                console.log("no more class");
                return false;
            }
        }
    }


    function run(is_hs) {
        let result = update();

        if (result & localStorage.getItem("is_hs") == is_hs) {
            setTimeout(function(){ run(is_hs) }, 999);
        }
    }

    run(localStorage.getItem("is_hs"));
    
}

//get_time_left([{time : ["17:40","18:40"], name : "History"}, {time : ["19:00","19:12"], name : "Math"}]);



function timestring_to_seconds(time) {
    const middle = time.indexOf(":");
    let hours = parseInt(time.substring(0,middle));
    let minutes = parseInt(time.substring(middle+1));
    let seconds = (hours * (60**2)) + (minutes*60);
    return seconds;
}

function time_diff_to_time_string(diff) {
    return (~~(diff/60)) + ":" + (diff%60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
}

function get_description(period_name, is_start) {
    return `Time until ${period_name} ${is_start ? "starts" : "ends"}${window.innerWidth<500? "" : ":"}`;
}

function set_weekday_names(weekday_names) {
    for (let i = 1; i < 6; i++) {
        document.querySelector(`#week-schedule>p:nth-child(${i})`).innerHTML = weekday_names[i-1];
    }

    highlight_current_day();
}

function highlight_current_day() {
    let current_date = new Date();
    let weekday = current_date.getDay();

    for (let i of [1,2,3,4,5]) {
        document.querySelector(`#week-schedule>p:nth-child(${i})`).classList.remove("current-day");
    }


    if (weekday <= 5 & weekday >= 1) {
        document.querySelector(`#week-schedule>p:nth-child(${weekday})`).classList.add("current-day");
    }

}

async function on_open() {

let is_hs = localStorage.getItem("is_hs");
if (is_hs == null) {
    is_hs = true;
    localStorage.setItem("is_hs", true)
}
//is_hs = (is_hs == "true")

changer = []


console.log("re calling: ", is_hs);
let response = fetch(`https://data.mongodb-api.com/app/trinity-schedule-pazfo/endpoint/tpstime_info?is_hs=${is_hs}`);
let obj = response.then(res => {
    return res.json();
});



obj.then(res => {
    console.log(res.day, res.week, res.schedule);

    set_day(res.day);

    set_week(res.week);

    //let test_schedule = [{name: "period 2", time: ["19:00","19:50"]}]

    //set_clock(res.schedule);
    set_clock(res.schedule);
});

}

on_open();

function set_day(day) {
document.getElementById("day-type").innerHTML = day;
}

function set_week(week) {
const string_week = []
for (let day of week) {
    string_week.push(day.name.substring(0,1));
}
set_weekday_names(string_week);
}

function set_clock(schedule) {
console.log("calling the get time left...");
get_time_left(schedule, "clock", "block", "description");
}



</script>


  <body>
    <div id="week-schedule">
        <!--class="current-day"-->
        <p class="current-day">B</p>
        <p>C</p>
        <p>B</p>
        <p>C</p>
        <p>A</p>
    </div>


    <div id="info-block">
        <p id="day-type">A1</p>

        <p id="description">Time Until ...</p>
    
        <div id="block">
            <p id="clock">0:00</p>
        </div>
    </div>


    <div id="grade-selector">
        <!-- grade-selected -->
        {#key changer}
      <button class='{localStorage.getItem("is_hs")=="true"?"grade-selected":""}' id="hs-button" on:click={()=>{localStorage.setItem("is_hs", true); on_open()}}>HS</button>
      <button class='{localStorage.getItem("is_hs")=="false"?"grade-selected":""}' id="ms-button" on:click={()=>{localStorage.setItem("is_hs", false); on_open()}}>MS</button>
      {/key}
    </div>

  </body>

<style>
    * {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

:root {
    --trinity-blue: rgb(0,0,250);
    --trinity-gold: rgb(250,250,0);
}

body {
    justify-content: center;
    align-content: center;
}

#clock {
    color: grey;
    font-weight: 900;
    font-size: 20vw;
    margin: 0;
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
    transition: color 1s;
    

    text-align: center;
}

#block {
    background-color: white;

    border-radius: 25px;
    margin: 0 3vw;

    box-shadow: 5px 5px rgb(10, 10, 10, 0.5);

    transition: backgroundColor 2s;
}

#description {
    color: black;
    font-weight: 900;
    font-size: 5vw;

    text-align: left;

    margin-top: 7vw;
    margin-left: 2.2vw;

    margin-bottom: 2vw;
}

#info-block {
    margin-top: 20px;
    background-color: rgb(10, 25, 70, 0.1);
    padding: 10px 5px 40px;
    border-radius: 25px;
}

#day-type {
    position: absolute;
    margin-left: 2vw;
    margin-top: 1vw;

    font-size: 5vw;
    font-weight: 900;

    color: white;
    font-family: sans-serif;

    -webkit-text-stroke: 1px black;
}

@media screen and (max-width: 500px) {
    #day-type {
        opacity: 0;
    }

    #description {
        margin-top: 5vw;
        margin-bottom: 5vw;
        text-align: center;
    }
}

#week-schedule {
    display: inline-flex;
    width: 100%;
    justify-content: space-around;

    margin: 0;

}

#week-schedule > p {
    color: var(--trinity-blue);
    font-size: 5vw;
    font-weight: 900;

    margin-top: 10px;

    margin-bottom: 10px;

    padding: 0.5vw 1.7vw;
}

/*
#week-schedule > p:first-child {
    color: red !important;
}
*/

#week-schedule > .current-day {
    border-radius: 1.6vw;
    /*box-shadow: 3px 3px rgba(3, 3, 24, 0.4);*/

    background-color: var(--trinity-blue);
    color: var(--trinity-gold);
}


#grade-selector {
    display: inline-flex;
    margin: 5vw 0;
    width: 100%;
    justify-content: space-around;
}

#grade-selector > button {
    padding: 20px 30px;
    border-radius: 5px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 800;
    font-size: 3vw;
    border: 0;
    transition: background-color 1s, color 1s;
}

#grade-selector > .grade-selected {
    background-color: blue;
    color: white;
}
</style>