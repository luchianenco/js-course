import React from 'react';

const URL = 'http://api.openweathermap.org/data/2.5/weather?APPID=3fb5a1e446cb5c25b0824df71acb020b&units=metric&q=__LOCNAME__';

class GetWeatherInfo extends React.Component {
    getInfo(location) {
        return fetch(URL.replace('__LOCNAME__', location))
            .then(res => {
                if (! res.ok) {
                    return null;
                }
                return res.json();
            })
            .then(json => {
                return json;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export default GetWeatherInfo;