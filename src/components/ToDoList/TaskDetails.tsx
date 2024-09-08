import { useDeleteTask } from '@/hooks/useDeleteTask';
import { ToDoList } from '@/types/toDoList';
import { Edit2Icon, Trash2 } from 'lucide-react'

interface TaskDetailsProps{
    list:ToDoList
}

export default function TaskDetails({list}:TaskDetailsProps) {
    const {isDeleting,deleteTask} = useDeleteTask();

  return (
    <div className="list-card checkbox-wrap" key={list.id}>
            <input type="checkbox" checked={list.isCompleted} />
            <label className={`${list.isCompleted ? "text-muted" : ""} `}>
            <h5>{list.title}</h5>
            <p className='text-sm'>{list.description}</p>
            <div className="d-flex justify-content-center align-items-center list-icons pr-2">
              <button className="btn btn-danger m-1" disabled={isDeleting} onClick={()=>deleteTask(list.id)}>
                <Trash2 size={16} className='text-danger'/>
              </button>
              <button className="btn btn-success m-1">
                <Edit2Icon size={16} className='text-success'/>
              </button>
            </div>
          </label>
            </div>
  )
}
