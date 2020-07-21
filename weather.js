window.addEventListener ('load', ()=>{
    let mykey = config.MY_KEY;
    let longtitude;
    let latitude;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            longtitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/` + mykey + `/${latitude},${longtitude}`;


        fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const { temperature, icon} = data.currently;
                //set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                locationTimezone.textContent = data.timezone;
                //Formula for Celsius Farenheit conversion
                let celsius = (temperature - 32) * (5 / 9);
                //set Icon
                setIcons(icon, document.querySelector(".icon"));

                temperatureSection.addEventListener("click", () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })

                const {summary} = data.hourly;
                temperatureDescription.textContent = summary;
            });
        });
    }


    function setIcons(icon,iconID){
        const skycons = new Skycons({color: "whitesmoke" });
        const currentIcon = icon.replace (/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});
