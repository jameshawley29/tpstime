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

    import {current_period, periods} from './stores';
    let periodVal;
    let periods_val
    current_period.subscribe(value => {
        periodVal = value;
    })
    periods.subscribe((val) =>{ periods_val = val; current_period.set(-1)});

    let time = "0:00"



    function updateTime() {
        let stop = 50;

        while (periodVal<periods_val.length) {
            //console.log(getSecondsTillClass(periods[start_index]["time"][1]))
            if(periodVal<0 || getSecondsTillClass(periods_val[periodVal]["time"][1])<0) {
                current_period.update(n => n +1);
            } else {
                break
            }
            stop+=1
            if (stop >100) {
                return 1;
            }
        }

        console.log(periodVal)
        if (periodVal>=periods_val.length) {
            time = "0:00"
            document.title = "School Over"
        } else {
            let time_till_end = getSecondsTillClass(periods_val[periodVal].time[1]);
            time = seconds_to_timestring(time_till_end);
            document.title =  parseInt(time_till_end/60)+" mins"
        }

    }
    //updateTime();

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

        align-items: center;
        text-align: center;

        color: rgb(0,0,0,0);
        -webkit-text-stroke: 0.3vw rgb(0, 0, 0);
        /* #000080 #ff71f8*/
    }
</style>