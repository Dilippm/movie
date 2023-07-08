import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseURL from '../../../config';
import { Chart } from 'primereact/chart';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';


export default function DoughnutChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('ownertoken');
        const id = localStorage.getItem('ownerId');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
            const response = await axios.get(`${BaseURL}owner/movieschart/${id}`, config);
            const movieData = response.data.movieCollection;

      const documentStyle = getComputedStyle(document.documentElement); 
 
      const labels = movieData.map((movie) => movie[0]);
      const dataValues = movieData.map((movie) => movie[1]);
      const backgroundColors = generateColors(dataValues.length);
      const hoverBackgroundColors = generateColors(dataValues.length);
      // Set the chart data
      const data = {
        labels: labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: backgroundColors,
              hoverBackgroundColor: hoverBackgroundColors,
          }
        ]
      };

      const options = {
        cutout: '60%'
      };

      setChartData(data);
      setChartOptions(options);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);
      // Generate dynamic colors
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = getRandomColor();
      colors.push(color);
    }
    return colors;
  };

  // Generate random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} style={{ height:"550px",marginLeft:"160px" }} />
        </div>
    )
}
