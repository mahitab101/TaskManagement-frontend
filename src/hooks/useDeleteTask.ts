"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteTask as deleteTaskApi } from "../../services/apiTask";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export function useDeleteTask() {
    const { data: session } = useSession();
    const token = session?.user?.token;

  const queryClient = useQueryClient();
  const {
    isPending: isDeleting,
    error,
    mutate: deleteTask,
  } = useMutation({
    mutationFn: (id:number)=>deleteTaskApi(id,token || ""),
    onSuccess:()=>{
        toast.success("task deleted succesfully")
        queryClient.invalidateQueries({
            queryKey:['taskList']
        })
    },
    onError:(error)=>toast.error(error.message)
  });

  return {isDeleting,error,deleteTask}
}
