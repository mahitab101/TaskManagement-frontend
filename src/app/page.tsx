import { Metadata } from "next";
import Search from "@/components/Search";
import CreateTask from "@/components/CreateTask/CreateTask";
import List from "@/components/ToDoList/List";
import { authOptions } from "@/lib/authOptions ";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CompletedTasks from "@/components/ToDoList/CompletedTasks";

export const metadata:Metadata={
  title:'Home page'
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
      <div className="row">
        <Search />
        <CreateTask />
        
        <div className="col-6"><List /></div>
        <div className="col-6"><CompletedTasks /></div>
      </div>
  );
}
