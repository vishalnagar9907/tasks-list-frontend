import {useState} from 'react';

const EditTask =({
    task={},
    setIsEdit =()=>{},
    updateTask=()=>{},
    isLocalTask=false,
    setLocalTasksList=()=>{}
})=>{
    const [editTask, setEditTask] = useState(task.taskName);

  

    const handleEditOnClick =(e)=>{
        e.preventDefault();
        if(!editTask.trim()){
            alert('task is required');
            return;
        }

        if(isLocalTask){
            setLocalTasksList((preLocalTask)=>(
                
                preLocalTask.map((preTask) => (preTask._id === task._id ? { ...preTask, taskName: editTask } : preTask))
            ));

            setIsEdit(false);
        }
        else {
            updateTask({task_status:task.taskStatus, task_name:editTask,id: task._id })
        }
       

    }
    return (
        <div className="edit_container">
        <input className="edit_input" value={editTask}  onChange={(e)=>{setEditTask(e.target.value)}}/>
        <div>
        <button onClick={handleEditOnClick} >Update</button>
        <button onClick={()=>{setIsEdit(false)}}>Cancel</button>
        </div>
        </div>
    )
}

export default EditTask;