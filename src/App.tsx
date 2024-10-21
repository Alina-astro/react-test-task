import React, {useState} from 'react';
import './App.css';
import Weather from './components/Weather';


function App() {
    const [variables, setVariables] = useState(['rain_sum', 'snowfall_sum']);
    const [newVariable, setNewVariable] = useState('');
    const addVariable = () => {
      if (newVariable && !variables.includes(newVariable)) {
        setVariables([...variables, newVariable]);
      }
      setNewVariable('');
    }

  return (
    <div className="main">
        <div>
            <label>
                {/* available values:
                weathercode, temperature_2m_max, temperature_2m_min, apparent_temperature_max, apparent_temperature_min, sunrise, sunset, precipitation_sum, rain_sum,
                showers_sum, snowfall_sum, precipitation_hours, windspeed_10m_max, windgusts_10m_max, winddirection_10m_dominant, shortwave_radiation_sum, et0_fao_evapotranspiration
                */}

                <input type="text" 
                value={newVariable} 
                onChange={(e) => setNewVariable(e.target.value)} />
                <button onClick={addVariable}>Add variable</button>
            </label>
        </div>
      <Weather lat={55.751244} long={37.618423} variables={variables} />
    </div>
  );
}

export default App;
