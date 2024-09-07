"use client";

import { Edit2Icon, Trash2 } from "lucide-react";
import { ToDoList } from "@/types/toDoList";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useTasks } from "@/hooks/useTasks";

export default function List() {

 const {isDeleting,deleteTask} = useDeleteTask();
const {todoList,isLoading} = useTasks();
 
  console.log(todoList);

  if (isLoading) return <p>Loading...</p>;
  const sortedList = todoList.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));
  
  console.log("sortedList>>>",sortedList);
  return (
    <div>
      <p>You have {todoList.length} task(s)</p>
      {sortedList.length > 0 ? (
        sortedList.map((list: ToDoList) => (
          <div className="list-card checkbox-wrap" key={list.id}>
            <input type="checkbox" checked={list.isCompleted} />
            <label className={`${list.isCompleted ? "text-muted" : ""} `}>
            <h5>{list.title}</h5>
            <p>{list.description}</p>
            <div className="d-flex flex-column list-icons pr-2">
              <button className="btn btn-danger m-1" disabled={isDeleting} onClick={()=>deleteTask(list.id)}>
                <Trash2 size={16} />
              </button>
              <button className="btn btn-success m-1">
                <Edit2Icon size={16} />
              </button>
            </div>
          </label>
            </div>
        ))
      ) : (
        <p className="text-center">You don&apos;t have tasks, start adding some</p>
      )}
    </div>
  );
}
