import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Select from 'react-select';
import statColors from '../utils/statColors';
import statOptions from '../utils/statOptions';

const PlayerStatsChart = ({ data, type }) => {
  // State to keep track of the selected stats
  const [selectedStats, setSelectedStats] = useState([statOptions[type][0].value]);

  // Update selectedStats when type changes
  useEffect(() => {
    setSelectedStats([statOptions[type][0].value]);
  }, [type]);

  // Format and sort data for the chart
  const formattedData = Object.keys(data).map(key => ({
    xValue: data[key].Date 
      ? moment(data[key].Date).format('DD MMM YYYY') 
      : data[key]['Game Highs Season'] 
        ? data[key]['Game Highs Season'] :
        data[key].Year ? data[key].Year 
          : data[key].Season, // Use Date if available, otherwise use Season
    ...selectedStats.reduce((acc, stat) => {
      acc[stat] = data[key][stat] || 0; // Include each selected stat in the data
      return acc;
    }, {})
  })).sort((a, b) => moment(a.xValue, 'DD MMM YYYY').diff(moment(b.xValue, 'DD MMM YYYY')));

  // Function to handle stat change from dropdown
  const handleStatChange = (selectedOptions) => {
    setSelectedStats(selectedOptions.map(option => option.value));
  };

  return (
    <div>
      <h3>Player Stats Over Time</h3>

      {/* Dropdown for selecting the stats */}
      <Select
        isMulti
        value={statOptions[type].filter(option => selectedStats.includes(option.value))}
        options={statOptions[type]}
        onChange={handleStatChange}
        className="dropdown"
      />

      {/* LineChart displaying the selected stats */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="xValue" 
            tick={{ fontSize: 12 }} // Adjust the font size
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedStats.map(stat => (
            <Line
              key={stat}
              type="monotone"
              dataKey={stat}
              stroke={statColors[type][stat] || '#8884d8'} // Use predefined color or default
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlayerStatsChart;
