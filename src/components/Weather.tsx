/* tslint:disable */
// @ts-nocheck
import React, {useEffect, useState} from 'react';


interface Props {
    lat: number;
    long: number;

    variables: string[];
}

const Weather: React.FC<Props> = props => {
    const [weather, setWeather] = useState()

    useEffect(() => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${props.lat}&longitude=${props.long}&daily=${props.variables.join(',')}&timezone=Europe/Moscow&past_days=7`, 
        {method: 'GET'}
        )
        .then((resp) => resp.json())
        .then((data) => setWeather(data))
        .catch((error) => console.error('Error:', error));
        },
        [props.lat, props.long, props.variables]);
    


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
