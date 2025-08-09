import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  Lightbulb,
  Fan,
  Thermometer,
  Plus,
  Home,
  Menu,
  Settings,
} from "lucide-react";
import DeviceCard from "./DeviceCard";
import AddDevice from "./AddDevice";
import { db, ref, set, onValue } from "./firebase";

// Get icon based on device name
const getIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("fan")) return <Fan />;
  if (lower.includes("ac") || lower.includes("air")) return <Thermometer />;
  return <Lightbulb />;
};

// Home Page Component
function HomePage({ devices, toggleDevice }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex flex-col">
      <div className="text-center p-4 text-2xl font-bold">Spark X</div>

      {/* Add Device Button */}
      <div className="px-4">
        <button
          onClick={() => navigate("/add")}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-xl mb-4 transition"
        >
          <Plus className="w-5 h-5" /> Add New Panel
        </button>
      </div>

      {/* Devices Grid */}
      <div className="flex-1 px-4 pb-4">
        <div className="grid gap-4 w-full grid-cols-2 md:grid-cols-3">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              name={device.name}
              icon={device.icon}
              state={device.state}
              onToggle={() => toggleDevice(device.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around p-2 bg-white/10 backdrop-blur-md rounded-t-2xl">
        <Home className="w-6 h-6" />
        <Menu className="w-6 h-6" />
        <Settings className="w-6 h-6" />
      </div>
    </div>
  );
}

// Main App Logic
function SmartControlApp() {
  const [devices, setDevices] = useState([]);

  // ✅ Load devices from Firebase
  useEffect(() => {
    const devicesRef = ref(db, "devices");
    const unsubscribe = onValue(devicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.entries(data).map(([id, device]) => ({
          id: parseInt(id),
          name: device.name,
          state: device.state,
          icon: getIcon(device.name),
        }));
        setDevices(loaded);
      } else {
        setDevices([]); // Empty if no devices
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  // Toggle device and update Firebase
  const toggleDevice = (id) => {
    setDevices((prev) => {
      const updated = prev.map((d) =>
        d.id === id ? { ...d, state: !d.state } : d
      );
      const toggled = updated.find((d) => d.id === id);

      set(ref(db, `devices/${id}`), {
        name: toggled.name,
        state: toggled.state,
      });

      return updated;
    });
  };

  // Add device to Firebase
  const handleAddDevice = (newDevice) => {
    set(ref(db, `devices/${newDevice.id}`), {
      name: newDevice.name,
      state: newDevice.state,
    });
  };

  const lastId = devices.length > 0 ? Math.max(...devices.map((d) => d.id)) : 0;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage devices={devices} toggleDevice={toggleDevice} />}
        />
        <Route
          path="/add"
          element={<AddDevice onAdd={handleAddDevice} lastId={lastId} />}
        />
      </Routes>
    </Router>
  );
}

export default SmartControlApp;
