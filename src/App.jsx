import { useEffect, useState } from "react";
import { db, ref, onValue } from "./firebase"; // firebase setup

export default function App() {
  const [data, setData] = useState({
    temp: 0,
    gas: 0,
    fall: false,
  });

  const [alertMsg, setAlertMsg] = useState("");

  // -------- REAL-TIME FIREBASE LISTENER --------
  useEffect(() => {
    const sensorRef = ref(db, "helmetData/");

    onValue(sensorRef, (snapshot) => {
      const d = snapshot.val() || {};
      setData(d);

      // ALERT LOGIC
      if (d.gas > 300) setAlertMsg("⚠ Dangerous Gas Levels Detected!");
      else if (d.temp > 60) setAlertMsg("🔥 High Temperature Detected!");
      else if (d.fall) setAlertMsg("🛑 Worker Fall Detected!");
      else setAlertMsg("");
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Smart Helmet Dashboard 🪖
      </h1>

      {/* ALERT BANNER */}
      {alertMsg && (
        <div className="mx-auto max-w-3xl p-5 mb-8 bg-red-100 
          border-l-8 border-red-600 rounded-xl shadow">
          <p className="text-xl font-semibold text-red-700">{alertMsg}</p>
          <p className="text-gray-600 mt-1">
            Worker safety compromised — immediate action required.
          </p>
        </div>
      )}

      {/* SENSOR GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* Temp */}
        <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-gray-600">Temperature 🌡</h3>
          <p className="text-5xl font-bold mt-4 text-blue-600">{data.temp}°C</p>
          <p className="text-gray-500 mt-2">{data.temp > 60 ? "High!" : "Normal"}</p>
        </div>

        {/* Gas */}
        <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-gray-600">Gas Level 🧪</h3>
          <p
            className={`text-5xl font-bold mt-4 ${
              data.gas > 300 ? "text-red-600" : "text-green-600"
            }`}
          >
            {data.gas}
          </p>
          <p className="text-gray-500 mt-2">
            {data.gas > 300 ? "Toxic Gas Detected" : "Safe"}
          </p>
        </div>

        {/* Fall */}
        <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-gray-600">Fall Detection 🤕</h3>
          <p className={`text-5xl font-bold mt-4 ${data.fall ? "text-red-500" : "text-green-500"}`}>
            {data.fall ? "YES" : "NO"}
          </p>
          <p className="text-gray-500 mt-2">
            {data.fall ? "Immediate help needed" : "All good"}
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <p className="text-center text-gray-600 mt-14 text-sm">
        Smart Helmet IoT System · Real-Time Monitoring Dashboard
      </p>
    </div>
  );
}
