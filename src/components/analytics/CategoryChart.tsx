'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { CategorySales } from '@/data/analytics';
import Card from '@/components/ui/Card';

interface CategoryChartProps {
  data: CategorySales[];
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Generate colors for each category
    const colors = [
      'rgba(79, 70, 229, 0.8)',   // Indigo
      'rgba(245, 158, 11, 0.8)',   // Amber
      'rgba(16, 185, 129, 0.8)',   // Emerald
      'rgba(239, 68, 68, 0.8)',    // Red
      'rgba(59, 130, 246, 0.8)',   // Blue
      'rgba(236, 72, 153, 0.8)',   // Pink
      'rgba(139, 92, 246, 0.8)',   // Purple
      'rgba(251, 191, 36, 0.8)',   // Yellow
    ];

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map(category => category.category),
          datasets: [
            {
              data: data.map(category => category.sales),
              backgroundColor: colors,
              borderColor: colors.map(color => color.replace('0.8', '1')),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 15,
                padding: 15,
              },
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                  const percentage = Math.round((value * 100) / total);
                  const formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                  return `${label}: ${formattedValue} (${percentage}%)`;
                }
              }
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
  }, [data]);

  return (
    <Card className="p-4">
      <div className="h-[300px]">
        <canvas ref={chartRef} />
      </div>
    </Card>
  )
}