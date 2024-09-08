"use client"
import React, { useState } from "react";
import List from "./List";
import CompletedTasks from "./CompletedTasks";
import { useTasks } from "@/hooks/useTasks";

export default function TaskSList() {
  const [activeTab, setActiveTab] = useState("all");
  const { todoList } = useTasks();
  const ongoingTasksCount = todoList.filter((task) => !task.isCompleted).length;
  const completedTasksCount = todoList.filter((task) => task.isCompleted).length;
  const handleTabClick = (tab:any) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            href="#"
            onClick={() => handleTabClick("all")}
          >
            On Going tasks({ongoingTasksCount})
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
            href="#"
            onClick={() => handleTabClick("completed")}
          >
            Completed tasks({completedTasksCount})
          </a>
        </li>
      </ul>
      <div>
        {activeTab === "all" && <div id="all"><List isCompletedFilter={false}/></div>}
        {activeTab === "completed" && <div id="completed"><CompletedTasks isCompletedFilter={true}/></div>}
      </div>
    </div>
  );
}
