import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";

const DashboardChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: 'column',
          backgroundColor: 'transparent',
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          labels: { style: { color: '#ffffff' } },
        },
        yAxis: {
          title: { text: 'Events' },
          labels: { style: { color: '#ffffff' } },
        },
        series: [
          {
            name: 'Errors',
            type: 'column',
            data: [3, 5, 1, 6, 4, 3, 2],
            color: '#f87171',
          },
          {
            name: 'Warnings',
            type: 'column',
            data: [4, 2, 5, 3, 6, 1, 4],
            color: '#facc15',
          },
        ],
        legend: {
          itemStyle: { color: '#ffffff' },
        },
        credits: { enabled: false },
      });
    }
  }, []);

  return <div ref={chartRef} className="w-full h-80" />;
};

export default DashboardChart;
