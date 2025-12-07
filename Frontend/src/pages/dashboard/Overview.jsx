import React, { useState } from "react";
import StatsCard from "../../components/home/StatsCard.jsx";
import useFetch from "../../hooks/useFetch.js";
import { PRODUCT_ROUTES } from "../../api/ApiRoutes.js";
import QuickActions from "../../components/common/Quickactions.jsx";

const Overview = () => {
  const { data, loading, error } = useFetch(
    () =>
      fetch(PRODUCT_ROUTES.OVERVIEW, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    [],
  );
  console.log(data);
  // safe defaults
  const stats = data
    ? {
        ordersToday: data.summary?.ordersToday ?? 0,
        revenueToday: data.summary?.revenueToday ?? 0,
        productCount: data.summary?.activeProducts ?? 0,
        categories: data.quickStats?.categories ?? 0,
        growth: data.quickStats?.momGrowth ?? "0%",
        lowStockCount: data.quickStats.lowStockCount ?? 0,
        emptyStockCount: data.quickStats.emptyStockCount ?? 0,
      }
    : {
        ordersToday: "",
        revenueToday: "",
        productCount: "",
        categories: "",
        growth: "",
      };
  return (
    <div className="dashboard-overview container">
      {/* Today's Summary */}
      <h2 className="section-heading">Today's Summary</h2>
      <div className="hero-card dashboard-summary">
        <div className="hero-card-title"></div>
        <div className="hero-card-metrics">
          <div>
            <div className="metric-value">{stats.ordersToday}</div>
            <div className="metric-label">Orders</div>
          </div>
          <div>
            <div className="metric-value">{stats.revenueToday}</div>
            <div className="metric-label">Revenue</div>
          </div>
          <div>
            <div className="metric-value">{stats.productCount}</div>
            <div className="metric-label">Products</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="home-stats" aria-live="polite">
        <h2 className="section-heading">Quick stats</h2>

        {loading && <p>Loading stats...</p>}
        {error && (
          <p style={{ color: "var(--primary-color)" }}>
            Failed to load live stats, Check your internet connection or try to
            reload site.
          </p>
        )}

        <div className="stats-grid">
          <StatsCard
            title="Orders Today"
            value={stats.ordersToday}
            subtitle="New orders placed today"
          />
          <StatsCard
            title="Revenue Today"
            value={stats.revenueToday}
            subtitle="Collected (INR)"
          />
          <StatsCard
            title="Products"
            value={stats.productCount}
            subtitle="Active product SKUs"
          />
          <StatsCard
            title="Categories"
            value={stats.categories}
            subtitle="Distinct product categories"
          />
          <StatsCard
            title="MoM Growth"
            value={stats.growth}
            subtitle="Month-over-month"
          />
          <StatsCard
            title="Low Stocks"
            value={stats.lowStockCount}
            subtitle="Low Stocks"
          />
          <StatsCard
            title="Empty Stocks"
            value={stats.emptyStockCount}
            subtitle="Empty Stocks"
          />
        </div>
      </section>

      <QuickActions />
    </div>
  );
};

export default Overview;
