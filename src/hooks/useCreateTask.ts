"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTask, DeleteTask as deleteTaskApi } from "../../services/apiTask";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { ToDoList } from "@/types/toDoList";

export function useCreateTask() {
    const { data: session } = useSession();
    const token = session?.user?.token;

  const queryClient = useQueryClient();

  const {isPending:isSaving,mutate:handleCreateTask } = useMutation({
    mutationFn:(newTask: ToDoList) => createNewTask(newTask, token||""),
    onSuccess: () => {
        toast.success("Task created successfully");
        queryClient.invalidateQueries({
          queryKey: ['taskList']
        })
      },
      onError: (error) => toast.error(error.message)
  })
 return {isSaving,handleCreateTask }   
}