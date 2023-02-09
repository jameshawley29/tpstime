<script>

    function getSecondsTillClass(timestring) {
        let current_time = new Date();
        let current_time_ss = timestring_to_seconds(`${current_time.getHours()}:${current_time.getMinutes()}`) + current_time.getSeconds();
        let timestring_ss = timestring_to_seconds(timestring);

        return (timestring_ss-current_time_ss);

    }


    function timestring_to_seconds(timestring) {
        //format: "00:00"
        const middle = timestring.indexOf(":");
        let hours = parseInt(timestring.substring(0,middle));
        let minutes = parseInt(timestring.substring(middle+1));
        let seconds = (hours * (60**2)) + (minutes*60);
        return seconds;
    }

    function seconds_to_timestring(diff) {
        return (~~(diff/60)) + ":" + (diff%60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
    }

    export let periods;
    export let current_period;

    let time = "5:37"


    function updateTime() {

        while (current_period<periods.length) {
            //console.log(getSecondsTillClass(periods[start_index]["time"][1]))
            if(current_period<0 || getSecondsTillClass(periods[current_period]["time"][1])<0) {
                current_period+=1
            }
        }

        if (current_period>=periods.length) {
            time = "0:00"
        } else {
            let time_till_end = getSecondsTillClass(periods[current_period].time[1]);
            time = seconds_to_timestring(time_till_end);
        }

    }
    updateTime();

    setInterval(updateTime,1000)


</script>

<p>
    {time}
</p>

<style>
    p {
        font-size: 14vw;
        font-family: Roboto;
        margin: 0;
        transform: translateY(-50%);

        align-items: center;
        text-align: center;

        color: rgb(0,0,0,0);
        -webkit-text-stroke: 0.3vw #000080;
    }
</style>