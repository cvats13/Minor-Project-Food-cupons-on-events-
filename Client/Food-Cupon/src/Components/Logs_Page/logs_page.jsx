import React, { useEffect, useState } from "react";

export default function Logs() {
  const [participants, setParticipants] = useState([]);
  const [groupedTeams, setGroupedTeams] = useState({});

  useEffect(() => {
    // Fetch from your backend
    fetch("http://localhost:5000/participants/logs")
      .then((res) => res.json())
      .then((data) => {
        setParticipants(data);
        groupByTeam(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const groupByTeam = (data) => {
    const grouped = data.reduce((acc, item) => {
      if (!acc[item.team_name]) acc[item.team_name] = [];
      acc[item.team_name].push(item);
      return acc;
    }, {});
    setGroupedTeams(grouped);
  };

  const getBoxColor = (check_in, meal_eaten) => {
    if (check_in === "No") return "bg-black";
    if (meal_eaten === 1) return "bg-green-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Team Logs</h1>

        {/* Global Stats */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex gap-6">
          <div>
            <span className="font-bold text-green-400">
              Eaten:{" "}
              {participants.filter((p) => p.meal_eaten === 1).length}
            </span>
          </div>
          <div>
            <span className="font-bold text-red-400">
              Not Eaten:{" "}
              {participants.filter((p) => p.meal_eaten === 0).length}
            </span>
          </div>
        </div>
      </div>

      {Object.keys(groupedTeams).length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedTeams).map(([teamName, members]) => (
            <div
              key={teamName}
              className="bg-gray-800 p-5 rounded-lg shadow-lg flex flex-col"
            >
              {/* Team Name */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{teamName}</h2>

                {/* Team Stats */}
                <div className="text-sm">
                  <span className="text-green-400 font-semibold">
                    Eaten: {members.filter((m) => m.meal_eaten === 1).length}
                  </span>
                  <span className="mx-3 text-gray-400">|</span>
                  <span className="text-red-400 font-semibold">
                    Not Eaten: {members.filter((m) => m.meal_eaten === 0).length}
                  </span>
                </div>
              </div>

              {/* Participant Boxes */}
              <div className="flex gap-3 flex-wrap">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className={`w-10 h-10 rounded-md ${getBoxColor(
                      member.check_in,
                      member.meal_eaten
                    )} relative group transition-transform duration-200 hover:scale-110`}
                    title={`${member.name}`}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-gray-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {member.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
