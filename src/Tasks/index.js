import { useState, useEffect } from 'react';
import useListTasks from './hooks/useListTasks';
import useUpdateTask from './hooks/useUpdateTask';
import useCreateTask from './hooks/useCreateTask';
import { DragDropContext } from 'react-beautiful-dnd';
import AddTaskInput from './components/AddTaskInput';
import TasksListing from './components/TasksListing';
import './styles.css';


const Tasks = ()=>{
    const [localTasksList, setLocalTasksList] = useState([])

    const {fetchListTasks,tasksList, setTaskList} = useListTasks();

    const {createTask} = useCreateTask();

    const {updateTask} = useUpdateTask({})
    const onDragEnd = (result)=>{
        const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let localTask = localTasksList;
    let tasks = tasksList;

    if (source.droppableId === "droppable-1") {
      add = localTask[source.index];
      localTask.splice(source.index, 1);
    } else {
      add = tasks[source.index];
      tasks.splice(source.index, 1);

      if(destination.droppableId !== source.droppableId){
      updateTask({id:add._id,task_status:'deleted',task_name:add.taskName})
      }

    }

    if (destination.droppableId === "droppable-1") {
      localTask.splice(destination.index, 0, add);
    } else {

      if(destination.droppableId !== source.droppableId){

      createTask({task:add.taskName, taskStatus:add.taskStatus})
      
      }

      tasks.splice(destination.index, 0, add);
      
    }

    setTaskList(tasks);
    setLocalTasksList(localTask);
    }

    useEffect(()=>{
        fetchListTasks();
    },[])

    return(
        <DragDropContext onDragEnd={onDragEnd}>
        <div>
            <div className="heading">Tasks</div>
            <AddTaskInput
            setLocalTasksList={setLocalTasksList}
            createTask={createTask}
            fetchListTasks={fetchListTasks}
            />
            <TasksListing
            localTasksList={localTasksList}
            tasksList={tasksList}
            setLocalTasksList={setLocalTasksList}
            fetchListTasks={fetchListTasks}
            />
        </div>
        </DragDropContext>
    )
}

export default Tasks;