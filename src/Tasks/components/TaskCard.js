import {useState} from 'react';
import useUpdateTask from '../hooks/useUpdateTask';
import { Draggable } from 'react-beautiful-dnd';
import EditTask from './EditTask';

const TaskCard =({
    task ={},
    index,
    setLocalTasksList=()=>{},
    isLocalTask=false,
    fetchListTasks=()=>{}
})=>{

    const [isEdit, setIsEdit] = useState(false);

    const {updateTask} = useUpdateTask({setIsEdit,fetchListTasks});

    const handleDelete =()=>{
        if(isLocalTask){
        setLocalTasksList((preTasksList)=>{
            return preTasksList.filter((preTask)=> preTask._id!==task._id)
        })
    }
    else{
        updateTask({id:task._id,task_status:'deleted',task_name:task.taskName})
    }
       
    }
    return (
        <Draggable draggableId={task._id?.toString()} index={index} >
            {(provided)=>(
                <div
                className="task_card"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
            { isEdit ? (
                <EditTask
                task={task}
                setIsEdit={setIsEdit}
                updateTask={updateTask}
                setLocalTasksList={setLocalTasksList}
                isLocalTask={isLocalTask}
                />
            ): (
                <>
                <div className="task_name">
                {task.taskName}
            
            </div>
            <div>
                <button onClick={()=>{
                    if (!isEdit) {
                    setIsEdit(!isEdit);
            }}}>
                    Edit
                </button>
                <button onClick={handleDelete}>
                    Delete
                </button>
            </div>
            </>
            )}
        </div>
            )}
        
        </Draggable>
    )
}

export default TaskCard;