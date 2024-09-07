"use client";
import { ToDoList } from "@/types/toDoList";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { fetchToDoList } from "../../services/apiTask";

  export function useTasks(){
    const { data: session } = useSession();
    const token = session?.user?.token;
    const userId = session?.user?.id;
    const { data: todoList = [], isPending:isLoading } = useQuery<ToDoList[]>({
      queryKey: ['taskList'],
      queryFn: () => fetchToDoList(token||"", userId!),
      enabled: !!token && !!userId, 
    });
    return {todoList,isLoading}
  }