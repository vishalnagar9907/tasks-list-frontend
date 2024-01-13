import {useState} from 'react';

const AddTaskInput =({
    setLocalTasksList=()=>{},
    createTask=()=>{},
    fetchListTasks=()=>{}
})=>{
    const [task,setTask] = useState('');

  

    const handleOnClick = ()=>{
        if(!task.trim()){
            alert('Task is required');
            return;
        }
        const tempTask = {
            _id: new Date().getTime(),
            taskName:task,
            taskStatus:'pending'
        }
        setLocalTasksList((pre)=>([tempTask,...pre]))
        createTask({task,taskStatus:'pending',fetchListTasks})
        
        setTask('');
    }

    return (
        <div>
            <input type='text' value={task} className="add_task_input" onChange={(e)=>{setTask(e.target.value)}} />
            <button onClick={handleOnClick}>Add Task</button>
        </div>
    )
}

export default AddTaskInput;