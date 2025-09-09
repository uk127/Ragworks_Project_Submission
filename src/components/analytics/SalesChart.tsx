'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { SalesData } from '@/data/analytics';
import Card from '@/components/ui/Card';

interface SalesChartProps {
  data: SalesData[];
  timeRange: string;
}

export default function SalesChart({ data, timeRange }: SalesChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Filter data based on time range
    let filteredData = [...data];
    if (timeRange === 'month') {
      filteredData = data.slice(-1);
    } else if (timeRange === 'quarter') {
      filteredData = data.slice(-3);
    }

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: filteredData.map(month => month.month),
          datasets: [
            {
              label: 'Revenue',
              data: filteredData.map(month => month.revenue),
              backgroundColor: 'rgba(79, 70, 229, 0.2)',
              borderColor: 'rgba(79, 70, 229, 1)',
              borderWidth: 1,
              yAxisID: 'y',
            },
            {
              label: 'Orders',
              data: filteredData.map(month => month.orders),
              type: 'line',
              fill: false,
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              borderColor: 'rgba(245, 158, 11, 1)',
              borderWidth: 2,
              tension: 0.4,
              yAxisID: 'y1',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Revenue ($)',
              },
              grid: {
                drawOnChartArea: false,
              },
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Orders',
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.datasetIndex === 0) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                  } else {
                    label += context.parsed.y;
                  }
                  return label;
                }
              }
            },
            legend: {
              position: 'top',
            },
          },
        },
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, timeRange]);

  return (
    <Card className="p-4">
      <div className="h-[300px]">
        <canvas ref={chartRef} />
      </div>
    </Card>
  )
}