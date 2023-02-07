<script>
    let pressed = false
    function clicked() {
        pressed = !pressed
    }
</script>

<div style="{pressed? "transform: translateX(-20px)": ""}">
    <svg on:click={clicked} on:keydown={clicked} width="81" height="87" viewBox="0 0 81 87" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Group">
        <path style="{pressed? "transform: rotate(45deg) translate(-15%, 30%)": ""}" id="Vector1" d="M70.875 14.1375H10.125V16.3125H70.875V14.1375Z" fill="black"/>
        <path style="{pressed? "opacity: 0%": "opacity: 100%"}" id="Vector2" d="M70.875 33.7125H34.425V35.8875H70.875V33.7125Z" fill="black"/>
        <path style="{pressed? "transform: rotate(-45deg) translate(0%, -25%)": ""}" id="Vector3" d="M70.875 53.2875H10.125V55.4625H70.875V53.2875Z" fill="black"/>
        </g>
    </svg>
    <button class="button">HS</button>
    <button class="button">MS</button>
</div>

<style>
    svg {
        height: 50px;
        width: 50px;

    }

    #Vector1,
    #Vector2,
    #Vector3 {
        transition: 0.5s ease-in-out;
        transform-origin: center;
    }

    div {
        display: flex;
        transition: 1s ease;

        width: 250px;
        justify-content: space-evenly;
        align-content: center;

        transform: translateX(200px);
    }

    button.button {
        width: 70px;
        height: 40px;

        border-radius: 5%;
        outline: none;
        border: none;

        color: #62C6F2;
        background-color: white;

        font-weight: 700;
        font-size: 25px;

        text-align: center;

    }

</style>