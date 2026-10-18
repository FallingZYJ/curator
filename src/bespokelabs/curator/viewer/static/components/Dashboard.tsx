import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Dashboard.module.css";

interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
}

interface ActivityItem {
  title: string;
  description: string;
  timestamp: string;
}

interface DashboardData {
  metrics: DashboardMetric[];
  activities: ActivityItem[];
}

const DEFAULT_DASHBOARD_DATA: DashboardData = {
  metrics: [
    {
      label: "Active Runs",
      value: "12",
      trend: "+3 since yesterday"
    },
    {
      label: "Samples Generated",
      value: "148k",
      trend: "+18% week over week"
    },
    {
      label: "Average Latency",
      value: "1.4s",
      trend: "-0.3s in the last hour"
    },
    {
      label: "Quality Score",
      value: "96%",
      trend: "+2% in the last 24h"
    }
  ],
  activities: [
    {
      title: "Batch export completed",
      description: "Reasoning datasets pushed to the hosted viewer.",
      timestamp: "2 minutes ago"
    },
    {
      title: "New pipeline deployed",
      description: "Multi-provider inference now routes through Claude 3.7.",
      timestamp: "14 minutes ago"
    },
    {
      title: "Cost alert resolved",
      description: "Projected spend returned to target budget.",
      timestamp: "1 hour ago"
    }
  ]
};

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(DEFAULT_DASHBOARD_DATA);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const refreshedData: DashboardData = {
          metrics: DEFAULT_DASHBOARD_DATA.metrics,
          activities: DEFAULT_DASHBOARD_DATA.activities
        };
        setDashboardData(refreshedData);
      } catch (error) {
        console.error("Dashboard data load failed", { error });
      }
    };

    loadDashboardData();
  }, []);

  const metricCards = useMemo(
    () =>
      dashboardData.metrics.map((metric) => (
        <div key={metric.label} className={styles.metricCard}>
          <p className={styles.metricLabel}>{metric.label}</p>
          <h3 className={styles.metricValue}>{metric.value}</h3>
          <p className={styles.metricTrend}>{metric.trend}</p>
        </div>
      )),
    [dashboardData.metrics]
  );

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <p className={styles.subtitle}>Curator Command Center</p>
          <h1 className={styles.title}>Realtime Dashboard</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.secondaryButton} type="button">
            Export Report
          </button>
          <button className={styles.primaryButton} type="button">
            Create Run
          </button>
        </div>
      </header>

      <section className={styles.metricsGrid}>{metricCards}</section>

      <section className={styles.contentGrid}>
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Operational Overview</h2>
          <div className={styles.progressList}>
            <div className={styles.progressItem}>
              <div>
                <p className={styles.progressLabel}>Pipeline Success Rate</p>
                <p className={styles.progressValue}>98.6%</p>
              </div>
              <div className={styles.progressBar}>
                <span className={styles.progressBarFill} style={{ width: "98%" }} />
              </div>
            </div>
            <div className={styles.progressItem}>
              <div>
                <p className={styles.progressLabel}>Cache Hit Rate</p>
                <p className={styles.progressValue}>73%</p>
              </div>
              <div className={styles.progressBar}>
                <span className={styles.progressBarFill} style={{ width: "73%" }} />
              </div>
            </div>
            <div className={styles.progressItem}>
              <div>
                <p className={styles.progressLabel}>Active Workers</p>
                <p className={styles.progressValue}>24 / 30</p>
              </div>
              <div className={styles.progressBar}>
                <span className={styles.progressBarFill} style={{ width: "80%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Recent Activity</h2>
          <div className={styles.activityList}>
            {dashboardData.activities.map((activity) => (
              <div key={activity.title} className={styles.activityItem}>
                <div className={styles.activityText}>
                  <p className={styles.activityTitle}>{activity.title}</p>
                  <p className={styles.activityDescription}>{activity.description}</p>
                </div>
                <span className={styles.activityTimestamp}>{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
