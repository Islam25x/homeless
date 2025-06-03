// components/LineChart.tsx

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGetDashBoardQuery } from '../RTK/Admin/AdminApi';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart: React.FC = () => {
  const { data, isLoading, isError } = useGetDashBoardQuery();

  if (isLoading) return <p>Loading chart...</p>;
  if (isError || !data) return <p>Failed to load data.</p>;

  const chartData = {
    labels: [
      'Users',
      'Admins',
      'Tenants',
      'Landlords',
      'Pending Landlords',
      'Properties',
      'Pending Properties',
    ],
    datasets: [
      {
        label: 'System Statistics',
        data: [
          data.numberOfUsers,
          data.numberOfAdmins,
          data.numberOfTenants,
          data.numberOfLandlords,
          data.numberOfPendingLandlordRegistrations,
          data.numberOfProperties,
          data.numberOfPendingProperties,
        ],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
  };

  return <Line data={chartData} options={chartOptions} style={{ width: '100%' }} />;
};

export default LineChart;
