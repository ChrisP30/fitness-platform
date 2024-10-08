// File: pages/dashboard/index.js
import React from "react";
import { useRouter } from "next/router";

const dashboardItems = [
  { name: "Workout Planner", path: "workout-planner" },
  { name: "Activity Log", path: "activity-log" },
  { name: "Diet Tracker", path: "diet-tracker" },
  { name: "Progress Tracker", path: "progress-tracker" },
  { name: "Goal Tracker", path: "goal-tracker" },
  { name: "Personal Bests", path: "personal-bests" },
  { name: "Mood Tracker", path: "mood-tracker" },
  { name: "Workout Timer", path: "workout-timer" },
  { name: "Exercise Library", path: "exercise-library" },
  { name: "Challenges", path: "challenges" },
  { name: "General Analytics", path: "general-analytics" },
  { name: "Profile Settings", path: "profile-settings" },
];

const Dashboard = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(`/dashboard/${path}`);
  };

  return (
    <div className="container w-[90%] min-h-fit mx-auto border-4 border-white custom-dashboard grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-3 lg:gap-5 p-6 mb-24 transition-all duration-700 ease-in-out rounded-lg">
      {dashboardItems.map((item, i) => (
        <div
          key={i}
          className="h-[65px] lg:h-[150px] w-full custom-dashboard-item border-4 border-white rounded-xl transition-transform duration-200 hover:scale-[1.02] flex justify-center items-center cursor-pointer"
          onClick={() => handleNavigation(item.path)}
        >
          <h3 className="text-white">{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
