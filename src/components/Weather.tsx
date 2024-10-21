/* tslint:disable */
// @ts-nocheck
import React, {useEffect, useState} from 'react';


interface Props {
    lat: number;
    long: number;

    variables: string[];
}

const Weather: React.FC<Props> = props => {
    const [weather, setWeather] = useState<any>(null)
    const validVariables = [
        'weathercode', 
        'temperature_2m_max', 
        'temperature_2m_min', 
        'apparent_temperature_max', 
        'apparent_temperature_min', 
        'sunrise', 
        'sunset', 
        'precipitation_sum', 
        'rain_sum', 
        'showers_sum', 
        'snowfall_sum', 
        'precipitation_hours', 
        'windspeed_10m_max', 
        'windgusts_10m_max', 
        'winddirection_10m_dominant', 
        'shortwave_radiation_sum', 
        'et0_fao_evapotranspiration'
    ];
    const filteredVariables = props.variables.filter(variable => validVariables.includes(variable));
    useEffect(() => {
        if (filteredVariables.length > 0) {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${props.lat}&longitude=${props.long}&daily=${filteredVariables.join(',')}&timezone=Europe/Moscow&past_days=7`, 
        {method: 'GET'}
        )
        .then((resp) => resp.json())
        .then((data) => setWeather(data))
        .catch((error) => console.error('Error:', error));
    } else {
        setWeather(null)
    }
},[props.lat, props.long, props.variables, filteredVariables]);

    return <table style={{width: '100%'}}>
        <thead>
        <tr>
            <td>date</td>
            {props.variables.map((variable, index) => (
            <td key={index}>{variable}</td>)
            )}
        </tr>
        </thead>
        <tbody>
        {weather && weather.daily.time.map((time, index) => (
        <tr key={index}>
            <td>
                {time}
            </td>
            {props.variables.map((variable, varIndex) => (
                <td key={varIndex}>
                    {weather.daily[variable] ? weather.daily[variable][index] : 'N/A'}
                </td>
            ))}
        </tr>))}
        </tbody>
    </table>
}


export default Weather;
