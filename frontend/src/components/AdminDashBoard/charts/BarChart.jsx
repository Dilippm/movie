import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import BaseURL from '../../../config';

export default function BarChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const id = localStorage.getItem('adminId');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${BaseURL}admin/movieschart/${id}`, config);

        const movieData = response.data.movieCollection;
      
        const backgroundColors = generateColors(movieData.length);
        const hoverBackgroundColors = generateColors(movieData.length);

        const data = {
          labels: movieData.map((movie) => movie[0]), 
          datasets: [
            {
              label: 'Bookings',
              data: movieData.map((movie) => movie[1]), 
              backgroundColor: backgroundColors,
              hoverBackgroundColor: hoverBackgroundColors,
              borderWidth: 5,
            },
          ],
        };

        const options = {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
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
    <div className="card">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
}
