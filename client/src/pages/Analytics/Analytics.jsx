import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./Analytics.css";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

function useCountUp(target, duration = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);

    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target]);

  return count;
}

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/api/analytics");
        setData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const totalCustomers = useCountUp(data?.totalCustomers || 0);
  const totalTickets = useCountUp(data?.totalTickets || 0);
  const openTickets = useCountUp(data?.openTickets || 0);
  const resolvedTickets = useCountUp(data?.resolvedTickets || 0);

  if (loading) {
    return (
      <div className="analytics-skeleton">
        <div className="sk-header"></div>
        <div className="sk-cards"></div>
        <div className="sk-charts"></div>
      </div>
    );
  }

  const pieData = {
    labels: ["Open", "Resolved"],
    datasets: [
      {
        data: [data.openTickets, data.resolvedTickets],
        backgroundColor: ["#ff4d4d", "#22c55e"],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Tickets",
        data: [
          data.priorityData.low,
          data.priorityData.medium,
          data.priorityData.high,
        ],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="analytics-premium">
      {/* HEADER */}
      <div className="analytics-top">
        <h1>Analytics Overview</h1>
        <p>Real-time insights into customers & tickets</p>
      </div>

      {/* KPI CARDS */}
      <div className="analytics-kpi-grid">
        <div className="kpi-card glass">
          <h4>Total Customers</h4>
          <h2>{totalCustomers}</h2>
        </div>

        <div className="kpi-card glass">
          <h4>Total Tickets</h4>
          <h2>{totalTickets}</h2>
        </div>

        <div className="kpi-card glass danger">
          <h4>Open Tickets</h4>
          <h2>{openTickets}</h2>
        </div>

        <div className="kpi-card glass success">
          <h4>Resolved</h4>
          <h2>{resolvedTickets}</h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="analytics-chart-grid">
        <div className="chart-card glass">
          <h3>Ticket Status</h3>

          <div className="pie-chart-wrapper">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="chart-card glass">
          <h3>Priority Breakdown</h3>

          <div className="bar-chart-wrapper">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#cbd5e1",
                      font: {
                        size: 13,
                        weight: "bold",
                      },
                    },
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(255,255,255,0.08)",
                    },
                    ticks: {
                      color: "#cbd5e1",
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
