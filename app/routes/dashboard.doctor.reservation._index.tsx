export default function Page() {
  // 項目
  const schedule = [
    { time: "7:30", description: "Appointment 1", status: "Confirmed" },
    { time: "7:30", description: "Appointment 2", status: "Pending" },
    // ... add more appointments as needed
  ];
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">Schedule for June 5</h1>
      </div>
      <div className="space-y-4">
        {schedule.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b"
          >
            <div className="flex-grow">
              <p className="font-semibold">{entry.time}</p>
            </div>
            <div className="flex-grow">
              <p>{entry.description}</p>
            </div>
            <div className="flex-grow">
              <p>{entry.status}</p>
            </div>
            <div className="flex-grow text-right">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
