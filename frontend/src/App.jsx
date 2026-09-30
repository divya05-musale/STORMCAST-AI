import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/forecast";

function getRisk(value) {
  if (value >= 80) return "SEVERE";
  if (value >= 60) return "HIGH";
  if (value >= 40) return "MODERATE";
  return "LOW";
}

function getRiskClass(value) {
  if (value >= 80) return "severe";
  if (value >= 60) return "high";
  if (value >= 40) return "moderate";
  return "low";
}

function RiskCard({ title, value, icon }) {
  return (
    <div className="risk-card">
      <div className="risk-card-top">
        <div className="risk-title">
          <span className="risk-icon">{icon}</span>
          <span>{title}</span>
        </div>

        <span className={`risk-badge ${getRiskClass(value)}`}>
          {getRisk(value)}
        </span>
      </div>

      <div className="risk-value">
        {value}
        <span>%</span>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${getRiskClass(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>

      <div className="risk-footer">
        <span>Current probability</span>
        <strong>{value}%</strong>
      </div>
    </div>
  );
}

function App() {
  const [forecastData, setForecastData] = useState([]);
  const [selectedHour, setSelectedHour] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [layer, setLayer] = useState("Radar");
  const [zoom, setZoom] = useState(1);
  const [time, setTime] = useState(new Date());
  const [apiStatus, setApiStatus] = useState("CONNECTING");

  // Fetch forecast data from FastAPI backend
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return response.json();
      })
      .then((result) => {
        setForecastData(result.data || []);
        setApiStatus("CONNECTED");
      })
      .catch((error) => {
        console.error("Failed to fetch forecast:", error);
        setApiStatus("OFFLINE");
      });
  }, []);

  // Live clock
  useEffect(() => {
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  // Simulation controls
  useEffect(() => {
    if (!isRunning || forecastData.length === 0) return;

    const simulation = setInterval(() => {
      setSelectedHour((previous) => {
        if (previous >= forecastData.length - 1) {
          setIsRunning(false);
          return previous;
        }

        return previous + 1;
      });
    }, 1500);

    return () => clearInterval(simulation);
  }, [isRunning, forecastData.length]);

  const current = forecastData[selectedHour] || forecastData[0];

  const activeAlert = useMemo(() => {
    if (!current) {
      return {
        level: "LOW",
        title: "Waiting for Forecast Data",
        text: "Connecting to the STORMCAST backend.",
      };
    }

    if (current.thunderstorm >= 80) {
      return {
        level: "SEVERE",
        title: "Severe Thunderstorm Alert",
        text: "Strong convective activity detected in the monitored region.",
      };
    }

    if (current.lightning >= 70) {
      return {
        level: "HIGH",
        title: "Lightning Activity Alert",
        text: "High lightning density expected during this forecast period.",
      };
    }

    if (current.cloudburst >= 70) {
      return {
        level: "HIGH",
        title: "Cloudburst Risk Alert",
        text: "Heavy rainfall conditions may develop in localized areas.",
      };
    }

    return {
      level: "LOW",
      title: "Monitoring Active",
      text: "Weather conditions are being continuously monitored.",
    };
  }, [current]);

  const formatTime = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const resetSimulation = () => {
    setSelectedHour(0);
    setIsRunning(false);
  };

  const stormSize = current
    ? 180 + current.thunderstorm * 1.4
    : 180;

  const stormOpacity = current
    ? 0.18 + current.thunderstorm / 500
    : 0.18;

  // Loading state
  if (!current) {
    return (
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">⛈</div>

            <div>
              <h1>
                STORMCAST <span>AI</span>
              </h1>

              <p>SEVERE WEATHER NOWCASTING</p>
            </div>
          </div>

          <div className="topbar-right">
            <div className="simulation-badge">
              <span />
              SIMULATION MODE
            </div>

            <div className="clock">{formatTime}</div>
          </div>
        </header>

        <main className="container">
          <section className="page-header">
            <div>
              <div className="eyebrow">
                SIH26084 • CONVECTIVE WEATHER INTELLIGENCE
              </div>

              <h2>Severe Weather Monitoring Center</h2>

              <p>0–6 Hour Localized Convective Weather Nowcasting</p>
            </div>

            <div className="system-status">
              <div className="online-dot" />

              <div>
                <strong>
                  {apiStatus === "OFFLINE"
                    ? "BACKEND OFFLINE"
                    : "CONNECTING"}
                </strong>

                <span>
                  {apiStatus === "OFFLINE"
                    ? "Unable to reach FastAPI"
                    : "Loading forecast data"}
                </span>
              </div>
            </div>

            <div className="data-warning">
              <strong>DATA: SIMULATED</strong>
              <span>Backend prototype</span>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>STORMCAST Backend</h2>

                <p>
                  Waiting for forecast data from FastAPI backend
                </p>
              </div>
            </div>

            <div style={{ padding: "40px", textAlign: "center" }}>
              <h2>
                {apiStatus === "OFFLINE"
                  ? "Backend connection failed"
                  : "Loading forecast data..."}
              </h2>

              <p>
                API:
                {" "}
                {API_URL}
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app">

      {/* TOP NAVIGATION */}

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">⛈</div>

          <div>
            <h1>
              STORMCAST <span>AI</span>
            </h1>

            <p>SEVERE WEATHER NOWCASTING</p>
          </div>
        </div>

        <div className="topbar-right">

          <div className="simulation-badge">
            <span />
            SIMULATION MODE
          </div>

          <div className="clock">
            {formatTime}
          </div>

          <nav>
            <button className="nav-active">Dashboard</button>
            <button>Alerts</button>
            <button>Analytics</button>
          </nav>

        </div>
      </header>

      <main className="container">

        {/* PAGE HEADER */}

        <section className="page-header">

          <div>

            <div className="eyebrow">
              SIH26084 • CONVECTIVE WEATHER INTELLIGENCE
            </div>

            <h2>
              Severe Weather Monitoring Center
            </h2>

            <p>
              0–6 Hour Localized Convective Weather Nowcasting
            </p>

          </div>

          <div className="system-status">

            <div className="online-dot" />

            <div>

              <strong>
                SYSTEM ONLINE
              </strong>

              <span>
                FastAPI backend connected
              </span>

            </div>

          </div>

          <div className="data-warning">

            <strong>
              DATA: SIMULATED
            </strong>

            <span>
              Backend prototype
            </span>

          </div>

        </section>

        {/* RISK CARDS */}

        <section className="risk-grid">

          <RiskCard
            title="Thunderstorm Risk"
            value={current.thunderstorm}
            icon="⛈"
          />

          <RiskCard
            title="Hail Probability"
            value={current.hail}
            icon="❄"
          />

          <RiskCard
            title="Cloudburst Risk"
            value={current.cloudburst}
            icon="🌧"
          />

          <RiskCard
            title="Lightning Activity"
            value={current.lightning}
            icon="⚡"
          />

        </section>

        {/* PROCESSING PIPELINE */}

        <section className="panel pipeline-panel">

          <div className="panel-header">

            <div>

              <h2>
                STORMCAST Processing Pipeline
              </h2>

              <p>
                Simulated multi-source data fusion and hazard nowcasting
              </p>

            </div>

            <div className="pipeline-live">

              <span />

              PROCESSING

            </div>

          </div>

          <div className="pipeline-flow">

            <div className="pipeline-node">

              <div className="pipeline-icon">
                📡
              </div>

              <strong>
                Doppler Radar
              </strong>

              <span>
                Reflectivity
              </span>

            </div>

            <div className="pipeline-arrow">
              →
            </div>

            <div className="pipeline-node">

              <div className="pipeline-icon">
                🛰️
              </div>

              <strong>
                INSAT Satellite
              </strong>

              <span>
                Cloud Motion
              </span>

            </div>

            <div className="pipeline-arrow">
              →
            </div>

            <div className="pipeline-node">

              <div className="pipeline-icon">
                ⚡
              </div>

              <strong>
                Lightning Data
              </strong>

              <span>
                Strike Density
              </span>

            </div>

            <div className="pipeline-arrow">
              →
            </div>

            <div className="pipeline-node pipeline-active">

              <div className="pipeline-icon">
                🧠
              </div>

              <strong>
                Nowcasting Engine
              </strong>

              <span>
                0–6 Hour Analysis
              </span>

            </div>

            <div className="pipeline-arrow">
              →
            </div>

            <div className="pipeline-node pipeline-output">

              <div className="pipeline-icon">
                ⚠️
              </div>

              <strong>
                Hazard Alerts
              </strong>

              <span>
                Risk Probabilities
              </span>

            </div>

          </div>

        </section>

        {/* MAIN GRID */}

        <section className="main-grid">

          {/* MAP */}

          <div className="panel map-panel">

            <div className="panel-header">

              <div>

                <h2>
                  Regional Convective Risk Map
                </h2>

                <p>
                  Simulated spatial hazard distribution
                </p>

              </div>

              <div className="layer-buttons">

                {["Radar", "Satellite", "Lightning"].map((item) => (

                  <button
                    key={item}
                    className={
                      layer === item ? "active" : ""
                    }
                    onClick={() => setLayer(item)}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

            <div className="map">

              <div className="map-grid" />

              <div className="radar-ring ring-one" />
              <div className="radar-ring ring-two" />
              <div className="radar-ring ring-three" />

              <div
                className="storm-zone"
                style={{
                  width: `${stormSize}px`,
                  height: `${stormSize}px`,
                  opacity: stormOpacity,
                }}
              />

              <div
                className="storm-cell"
                style={{
                  width: `${stormSize * 0.55}px`,
                  height: `${stormSize * 0.55}px`,
                }}
              />

              {current.lightning >= 70 && (

                <>

                  <div className="lightning-marker lightning-one">
                    ⚡
                  </div>

                  <div className="lightning-marker lightning-two">
                    ⚡
                  </div>

                  <div className="lightning-marker lightning-three">
                    ⚡
                  </div>

                  <div className="lightning-marker lightning-four">
                    ⚡
                  </div>

                </>

              )}

              <div className="city nashik">
                NASHIK
              </div>

              <div className="city pune">
                PUNE
              </div>

              <div className="city aurangabad">
                AURANGABAD
              </div>

              <div className="city jalgaon">
                JALGAON
              </div>

              <div className="map-layer-label">
                {layer.toUpperCase()} LAYER
              </div>

              <div className="storm-intensity">

                <span>
                  STORM INTENSITY
                </span>

                <strong>
                  {current.thunderstorm}%
                </strong>

              </div>

              <div className="zoom-controls">

                <button
                  onClick={() =>
                    setZoom((z) =>
                      Math.min(1.6, z + 0.1)
                    )
                  }
                >
                  +
                </button>

                <div>
                  {zoom.toFixed(1)}x
                </div>

                <button
                  onClick={() =>
                    setZoom((z) =>
                      Math.max(0.8, z - 0.1)
                    )
                  }
                >
                  −
                </button>

              </div>

              <div className="map-legend">

                <span>
                  <i className="legend-low" />
                  Low
                </span>

                <span>
                  <i className="legend-medium" />
                  Moderate
                </span>

                <span>
                  <i className="legend-high" />
                  High
                </span>

              </div>

            </div>

          </div>

          {/* ALERTS */}

          <div className="panel alerts-panel">

            <div className="panel-header">

              <div>

                <h2>
                  Active Alerts
                </h2>

                <p>
                  Current regional warnings
                </p>

              </div>

              <div
                className={`alert-count ${getRiskClass(
                  current.thunderstorm
                )}`}
              >
                01
              </div>

            </div>

            <div
              className={`active-alert ${getRiskClass(
                current.thunderstorm
              )}`}
            >

              <div className="alert-symbol">
                {activeAlert.level === "LOW"
                  ? "●"
                  : "⚠"}
              </div>

              <div>

                <strong>
                  {activeAlert.title}
                </strong>

                <p>
                  {activeAlert.text}
                </p>

                <small>
                  Forecast period: T+{current.hour} hour
                </small>

              </div>

            </div>

            <div className="alert-summary">

              <div>

                <span>
                  Thunderstorm
                </span>

                <strong>
                  {current.thunderstorm}%
                </strong>

              </div>

              <div>

                <span>
                  Lightning
                </span>

                <strong>
                  {current.lightning}%
                </strong>

              </div>

              <div>

                <span>
                  Cloudburst
                </span>

                <strong>
                  {current.cloudburst}%
                </strong>

              </div>

            </div>

          </div>

        </section>

        {/* FORECAST TIMELINE */}

        <section className="panel timeline-panel">

          <div className="panel-header">

            <div>

              <h2>
                0–6 Hour Nowcast Timeline
              </h2>

              <p>
                Forecast evolution for the monitored region
              </p>

            </div>

            <div className="simulation-controls">

              {!isRunning ? (

                <button
                  className="control-primary"
                  onClick={() => {

                    if (
                      selectedHour >=
                      forecastData.length - 1
                    ) {
                      setSelectedHour(0);
                    }

                    setIsRunning(true);

                  }}
                >
                  ▶ Start Simulation
                </button>

              ) : (

                <button
                  className="control-primary"
                  onClick={() =>
                    setIsRunning(false)
                  }
                >
                  ❚❚ Pause
                </button>

              )}

              <button
                className="control-secondary"
                onClick={resetSimulation}
              >
                ↻ Reset
              </button>

            </div>

          </div>

          <div className="timeline">

            <div className="timeline-line" />

            {forecastData.map((item) => (

              <button
                key={item.hour}
                className={`timeline-point ${
                  selectedHour === item.hour
                    ? "selected"
                    : ""
                }`}
                onClick={() => {

                  setSelectedHour(item.hour);
                  setIsRunning(false);

                }}
              >

                <div className="timeline-hour">
                  T+{item.hour}
                </div>

                <div className="timeline-dot" />

                <div className="timeline-value">
                  {item.thunderstorm}%
                </div>

                <div className="timeline-risk">
                  {getRisk(item.thunderstorm)}
                </div>

              </button>

            ))}

          </div>

          <div className="selected-forecast">

            <span>
              CURRENT FORECAST PERIOD
            </span>

            <strong>
              T+{current.hour} HOURS
            </strong>

            <div className="selected-forecast-risk">

              Thunderstorm probability{" "}

              <b>
                {current.thunderstorm}%
              </b>

            </div>

          </div>

        </section>

        {/* LOWER GRID */}

        <section className="lower-grid">

          {/* HAZARD ANALYSIS */}

          <div className="panel">

            <div className="panel-header">

              <div>

                <h2>
                  Hazard Analysis
                </h2>

                <p>
                  Derived convective parameters
                </p>

              </div>

            </div>

            <div className="hazard-grid">

              <div className="hazard-item">

                <span className="hazard-icon">
                  💨
                </span>

                <div>

                  <small>
                    WIND SPEED
                  </small>

                  <strong>
                    {current.wind} km/h
                  </strong>

                </div>

              </div>

              <div className="hazard-item">

                <span className="hazard-icon">
                  🌧
                </span>

                <div>

                  <small>
                    RAINFALL INTENSITY
                  </small>

                  <strong>
                    {current.rain} mm/h
                  </strong>

                </div>

              </div>

              <div className="hazard-item">

                <span className="hazard-icon">
                  ⚡
                </span>

                <div>

                  <small>
                    LIGHTNING DENSITY
                  </small>

                  <strong>
                    {current.density} strikes/km²
                  </strong>

                </div>

              </div>

              <div className="hazard-item">

                <span className="hazard-icon">
                  ❄
                </span>

                <div>

                  <small>
                    HAIL PROBABILITY
                  </small>

                  <strong>
                    {current.hail}%
                  </strong>

                </div>

              </div>

            </div>

          </div>

          {/* DATA SOURCES */}

          <div className="panel">

            <div className="panel-header">

              <div>

                <h2>
                  Data Sources
                </h2>

                <p>
                  Multi-source weather intelligence
                </p>

              </div>

            </div>

            <div className="data-source-list">

              <div className="data-source">

                <div className="source-icon">
                  📡
                </div>

                <div className="source-info">

                  <strong>
                    Doppler Weather Radar
                  </strong>

                  <span>
                    Reflectivity & velocity
                  </span>

                </div>

                <span className="simulated-tag">
                  SIMULATED
                </span>

              </div>

              <div className="data-source">

                <div className="source-icon">
                  🛰️
                </div>

                <div className="source-info">

                  <strong>
                    INSAT-3D / 3DR
                  </strong>

                  <span>
                    Cloud imagery & motion
                  </span>

                </div>

                <span className="simulated-tag">
                  SIMULATED
                </span>

              </div>

              <div className="data-source">

                <div className="source-icon">
                  ⚡
                </div>

                <div className="source-info">

                  <strong>
                    Ground Lightning Detection
                  </strong>

                  <span>
                    Strike location & density
                  </span>

                </div>

                <span className="simulated-tag">
                  SIMULATED
                </span>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}

      <footer className="footer">

        <div>

          <strong>
            STORMCAST AI
          </strong>

          <span>
            SIH26084 • Prototype / Simulation
          </span>

        </div>

        <p>
          Predicting Severe Weather. Preparing Communities.
        </p>

        <div>

          <span>
            0–6 HR NOWCASTING
          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;