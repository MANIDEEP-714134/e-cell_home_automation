// AddDevice.jsx
import { useState } from "react";
import { Lightbulb, Fan, Thermometer } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddDevice({ onAdd, lastId }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Please enter a device name.");
      return;
    }

    // Pick icon based on name
    let icon = <Lightbulb />;
    if (name.toLowerCase().includes("fan")) icon = <Fan />;
    else if (name.toLowerCase().includes("ac") || name.toLowerCase().includes("air"))
      icon = <Thermometer />;

    const newDevice = {
      id: lastId + 1,
      name,
      icon,
      state: false,
    };

    try {
      onAdd(newDevice);         // ✅ Add to state and Firebase
      navigate("/");            // ✅ Go back to Home Page
    } catch (err) {
      console.error("Failed to add device:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500 text-white p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Device</h2>
      <input
        className="w-full p-3 rounded text-black mb-4"
        type="text"
        placeholder="Enter device name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
        >
          Add
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddDevice;
