"use client";
import { ToDoList } from "@/types/toDoList";
import { useTasks } from "@/hooks/useTasks";
import TaskDetails from "./TaskDetails";
import { Loader } from "lucide-react";

interface ListProps {
  isCompletedFilter: boolean;
}

export default function List({ isCompletedFilter }: ListProps) {
const {todoList,isLoading} = useTasks();
 
  console.log(todoList);

  if (isLoading) return <p className="text-center"><Loader size={48} strokeWidth={2.25} className="text-center my-5" /></p>;
  // const sortedList = todoList.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));
  const filteredList = todoList
  .filter((task: ToDoList) => task.isCompleted === isCompletedFilter)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  console.log("filteredList>>>",filteredList);
  return (
    <div className="mt-4">
      {filteredList.length > 0 ? (
        filteredList.map((list: ToDoList) => (
         <TaskDetails list={list} key={list.id} />
        ))
      ) : (
        <p className="text-center">You don&apos;t have tasks, start adding some</p>
      )}
    </div>
  );
}
