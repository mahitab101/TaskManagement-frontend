import { ToDoList } from "@/types/toDoList";


export async function DeleteTask(id:number,token:string) {

    let headersList = {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          };
        
          const response = await fetch(`http://localhost:5227/api/ToDo/${id}`, {
            method: "DELETE",
            headers: headersList,
          });
        
          return await response.text();
        
}

export async function createNewTask(obj:ToDoList,token:string) {
        let headersList = {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    
        const response = await fetch(`http://localhost:5227/api/ToDo`, {
            method: "POST",
            headers: headersList,
            body: JSON.stringify(obj),
        });
    
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }
    
        return await response.json();
    }
    
       
    export async function fetchToDoList(token: string, userId: string) {
        if (!token || !userId) return [];
      
        try {
          const headersList = {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          };
      
          const response = await fetch(`http://localhost:5227/api/ToDo/${userId}`, {
            method: "GET",
            headers: headersList,
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
      
          return await response.json(); 
        } catch (error) {
          console.error("Error fetching data:", error);
          return [];
        }
      }