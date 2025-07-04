function DeviceCard({ name, icon, state, onToggle }) {
  return (
    <div className="bg-white/10 p-2 rounded-2xl flex flex-col justify-between items-center shadow-lg">
      <div className="flex flex-col items-center gap-2">
        <div className="text-white">{icon}</div>
        <div className="text-lg text-center truncate">{name}</div>
      </div>
            <label className="relative inline-flex items-center cursor-pointer mt-4">
  <input
    type="checkbox"
    checked={state}
    onChange={onToggle}
    className="sr-only"
  />
  <div
    className={`w-12 h-6 rounded-full transition-colors duration-300 ${
      state ? "bg-green-500" : "bg-gray-300"
    } relative`}
  >
    <div
      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
      style={{
        transform: state ? "translateX(24px)" : "translateX(0px)",
      }}
    ></div>
  </div>
</label>





    </div>
  );
}

export default DeviceCard;
