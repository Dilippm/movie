import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { ownerChartFetch } from '../../../api-helpers/api-helpers';

export default function LineDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const fetchChartDataFromBackend = async () => {
            try {
              const chartDataArray = await ownerChartFetch();
              console.log("chartDataArray:", chartDataArray);
              
              const labels = chartDataArray.dailyRevenueArray.map(data => data.date);
              console.log(labels);
              const revenueData = chartDataArray.dailyRevenueArray.map(data => data.revenue);

              const data = {
                labels: labels,
                datasets: [
                  {
                    label: 'Revenue',
                    data: revenueData,
                    fill: false,
                    borderColor: 'red',
                    tension: 0.4
                  }
                ]
              };
              
              setChartData(data);
            } catch (error) {
              console.log(error);
            }
        };
        
        fetchChartDataFromBackend();
        
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
