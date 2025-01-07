    const bubbleContainer = document.querySelector('.bubble_container');

    let interval;


    //Funcs

    const createBubble = () => {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        const randomSize = Math.floor(Math.random() * 20);
        bubble.style.width = `${randomSize}px`;  //Width of the bubble
        bubble.style.height = `${randomSize}px`;  //Height of the bubble

        bubbleContainer.appendChild(bubble); //Adding to DOM

        let timeout = setTimeout(()=>{
            bubble.remove();
            clearTimeout(timeout);
        }, 3000);
    }

    const getBatteryStatus = () => {

        const batteryLvl = document.querySelector('.battery-lvl');
        const batteryChime = document.querySelector('.battery-chime');
        const batteryDischime = document.querySelector('.battery-dischime');
        const batteryCharging = document.querySelector('.battery-charging');
        const bProgress = document.querySelector('.battery_progress');

        window.navigator.getBattery().then(battery => {

            console.log(battery);
            batteryLvl.innerHTML = `${battery.level *  100}%`;
            batteryChime.innerHTML = `${battery.chargingTime} minutes`;
            batteryDischime.innerHTML = `${battery.dischargingTime} minutes`
            bProgress.style.height = `${battery.level * 100}%`;

            if(battery.charging == true){
                batteryCharging.innerHTML = 'Your device is charging';
            }else{
                batteryCharging.innerHTML = 'Your device is not charging';
            }


            battery.addEventListener('levelChange', ()=>{
                bProgress.style.height = `${battery.level * 100}%`;
            });

            battery.addEventListener('chargingchange', ()=>{
                batteryCharging.innerHTML = `${battery.charging}`;

                if(battery.charging == false){
                    clearInterval(interval);
                }else{
                    interval = setInterval(()=>{
                        createBubble();
                    }, 500);
                }
            });
        })
    }

    function init(){
        getBatteryStatus();
        interval = setInterval(()=>{
            createBubble();
        }, 500);
    }

    init();