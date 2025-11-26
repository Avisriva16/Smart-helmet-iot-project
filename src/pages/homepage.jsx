import { useState } from "react";
import { Link } from "react-router-dom";
import HelmetImage from "../assets/HelmetImage.png";

export default function HomePage() {
  const [hoveredSensor, setHoveredSensor] = useState(null);

  const sensors = [
    { id: "fall-detector", name: "Fall Detector (IMU)", icon: "📍" },
    { id: "gas-detector", name: "Gas Detector (MQ-X)", icon: "💨" },
    { id: "temperature", name: "Temperature/Humidity", icon: "🌡️" },
    { id: "led-indicator", name: "LED Indicator", icon: "💡" },
    { id: "buzzer", name: "Buzzer/Audio Alert", icon: "🔔" },
  ];

  const getCurrentSensorDetails = (id) => {
    switch (id) {
      case "fall-detector":
        return {
          tag: "Motion/IMU",
          status: "Normal",
          value: "Tilt: 2.1°",
          desc: "Detects sudden drops and falls using accelerometer data for immediate emergency alert.",
        };
      case "gas-detector":
        return {
          tag: "Environment",
          status: "Safe",
          value: "CO: 12 PPM",
          desc: "Monitors harmful gas levels (e.g., CO, Methane) in the environment to prevent worker exposure.",
        };
      case "temperature":
        return {
          tag: "Environment",
          status: "Normal",
          value: "28°C / 65% RH",
          desc: "Tracks environmental temperature and humidity to alert for heat stress or extreme cold conditions.",
        };
      case "led-indicator":
        return {
          tag: "Visual Alert",
          status: "Green",
          value: "System OK",
          desc: "Visual status light on the helmet for quick, on-site status indication to supervisors.",
        };
      case "buzzer":
        return {
          tag: "Audio Alert",
          status: "Standby",
          value: "Silent",
          desc: "Audible alarm (85 dB+) for critical alerts like fall detection or high gas readings.",
        };
      default:
        return null;
    }
  };

  const currentDetails = getCurrentSensorDetails(hoveredSensor);

  const getStatusClasses = (status) => {
    if (status === "Safe" || status === "Normal" || status === "Green") {
      return "bg-teal-600/20 text-teal-400";
    } else if (status === "Standby") {
      return "bg-gray-600/20 text-gray-400";
    } else {
      return "bg-yellow-600/20 text-yellow-400";
    }
  };

  return (
    <main className="min-h-screen bg-black text-gray-100 font-sans">

      {/* 🔥 UPDATED NAVBAR WITH NEW OPTIONS */}
      <header className="border-b border-gray-800 backdrop-blur-sm bg-black/80 sticky top-0 z-10 shadow-md shadow-yellow-900/10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center animate-fade-in">
          
          {/* Left Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center font-extrabold text-black text-lg transform hover:scale-110 transition duration-300">
              SC
            </div>
            <span className="font-extrabold text-xl text-white tracking-wider">SMART-CAP</span>
          </div>

          {/* Right Navigation Buttons */}
          <div className="flex gap-4 flex-wrap">

            <Link
              to="/dashboard"
              className="px-4 py-2 border border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-900/50 transition font-medium transform hover:scale-105 duration-300"
            >
              Dashboard
            </Link>

            <Link
              to="/workers"
              className="px-4 py-2 border border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-900/50 transition font-medium transform hover:scale-105 duration-300"
            >
              Workers Overview
            </Link>

            <Link
              to="/settings"
              className="px-4 py-2 border border-yellow-600 text-yellow-400 rounded-lg hover:bg-yellow-900/50 transition font-medium transform hover:scale-105 duration-300"
            >
              Settings
            </Link>

            <Link
              to="/database"
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition font-medium shadow-lg shadow-yellow-500/30 transform hover:scale-105 duration-300"
            >
              Data Archive
            </Link>

          </div>

        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 animate-fade-in-up">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white animate-fade-in-down">
            Smart Construction Helmet{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              I<span className="text-white">oT</span> Monitoring
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 animate-fade-in-up-delay">
            Real-time sensor data visualization system for enhanced worker safety and environmental hazard detection.
          </p>
        </div>

        {/* Sensors + Helmet Image */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left: Sensor Legend */}
          <div className="space-y-4 animate-slide-in-left">
            <h3 className="font-bold text-xl text-yellow-400 border-b border-gray-800 pb-2 mb-4">
              Sensor Components
            </h3>
            {sensors.map((sensor) => (
              <button
                key={sensor.id}
                onMouseEnter={() => setHoveredSensor(sensor.id)}
                onMouseLeave={() => setHoveredSensor(null)}
                className={`w-full p-4 rounded-xl text-left border transition-all shadow-lg ${
                  hoveredSensor === sensor.id
                    ? "bg-yellow-900/30 border-yellow-600 text-white transform scale-[1.02] duration-150"
                    : "bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800"
                } transform hover:scale-[1.01] duration-200`}
              >
                <div className="font-semibold text-lg flex items-center gap-2">
                  <span className="text-2xl">{sensor.icon}</span>
                  {sensor.name}
                </div>
              </button>
            ))}
          </div>

          {/* Center: Helmet Image */}
          <div className="lg:col-span-1 flex justify-center w-full min-h-[500px] animate-fade-in-zoom">
            <img
              src={HelmetImage}
              alt="Smart Helmet"
              className="w-full max-w-sm object-contain rounded-xl shadow-xl shadow-yellow-500/10 transform hover:scale-105 transition duration-300"
            />
          </div>

          {/* Right: Sensor Details */}
          <div className="space-y-4 animate-slide-in-right">
            <h3 className="font-bold text-xl text-yellow-400 border-b border-gray-800 pb-2 mb-4">
              Live Sensor Details
            </h3>
            {currentDetails ? (
              <div className="p-6 rounded-xl bg-gray-900 border border-yellow-600 shadow-xl shadow-yellow-500/20 space-y-4 animate-scale-in">
                <div className="flex justify-between items-center">
                  <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-sm font-semibold uppercase tracking-wider">
                    {currentDetails.tag}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusClasses(currentDetails.status)}`}
                  >
                    {currentDetails.status}
                  </div>
                </div>
                <h4 className="text-3xl font-extrabold text-yellow-400">{currentDetails.value}</h4>
                <p className="text-gray-400 leading-relaxed text-sm">{currentDetails.desc}</p>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <span className="text-yellow-400 text-sm font-semibold">Sensor ID:</span>{" "}
                  <span className="text-gray-400 text-sm">{hoveredSensor}</span>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 text-gray-500 text-center animate-pulse-subtle">
                <p>Hover over a sensor on the left to see its live details and location on the helmet.</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center space-y-4 animate-fade-in-up-delay-more">
          <p className="text-gray-400 text-lg">Ready to review the safety log?</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black rounded-lg hover:from-yellow-600 hover:to-amber-700 transition shadow-lg shadow-yellow-500/40 font-bold text-lg transform hover:scale-105 duration-300"
            >
              View Live Dashboard
            </Link>
            <Link
              to="/database"
              className="px-8 py-3 border border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-900/50 transition font-bold text-lg transform hover:scale-105 duration-300"
            >
              Access Historical Data
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}