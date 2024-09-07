"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createTaskSchema, createTaskValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { ToDoList } from "@/types/toDoList";
import { useCreateTask } from "@/hooks/useCreateTask";

export default function CreateTaskForm() {
  const { data: session } = useSession();
  const { isSaving, handleCreateTask } = useCreateTask();
  const token = session?.user?.token;
  const userId = session?.user?.id;
  const createdAt = new Date().toISOString();

  //use form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ToDoList>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      createdBy: userId,
    },
  });

  // create new task form
  async function onSubmit(values: ToDoList) {
    console.log("values", values);
    if (!token) {
      toast.error("Token is missing");
      return;
    }
    const taskData = {
      ...values,
      createdBy: userId!,
      createdAt: createdAt,
    };
    handleCreateTask(taskData, {
      onSuccess: (data) => {
        console.log(data);
        reset();
      },
    });
  }
  return (
    <form
      className="container flex flex-col gap-4 mx-auto max-w-md mt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Title"
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="text-danger">{errors.title?.message}</p>
        )}
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Description"
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="text-danger">{errors.description?.message}</p>
        )}
      </div>
      <div className="mb-3">
        <input className="form-control" type="date" {...register("deadline")} />
        {errors.deadline?.message && (
          <p className="text-danger">{errors.deadline?.message}</p>
        )}
      </div>
      <button
        className="btn w-100 btn-primary"
        type="submit"
        disabled={isSaving}
      >
        Save
      </button>
    </form>
  );
}
