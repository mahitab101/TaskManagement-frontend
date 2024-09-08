"use client";
import { ToDoList } from "@/types/toDoList";
import { useTasks } from "@/hooks/useTasks";
import TaskDetails from "./TaskDetails";
import { Loader } from "lucide-react";

interface CompletedTasksProps {
  isCompletedFilter: boolean;
}

export default function CompletedTasks({ isCompletedFilter }: CompletedTasksProps) {
  const { todoList, isLoading } = useTasks();

  if (isLoading) return <p className="text-center"><Loader size={48} strokeWidth={2.25} className="text-center my-5" /></p>;

  const filteredList = todoList
    .filter((task: ToDoList) => task.isCompleted === isCompletedFilter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="mt-4">
      {filteredList.length > 0 ? (
        filteredList.map((list: ToDoList) => (
          <TaskDetails list={list} key={list.id} />
        ))
      ) : (
        <p className="text-center">No completed tasks</p>
      )}
    </div>
  );
}
