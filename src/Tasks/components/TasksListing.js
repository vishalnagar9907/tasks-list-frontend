import React from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";
const TasksListing =({
    localTasksList = [],
    setLocalTasksList=()=>{},
    tasksList=[],
    fetchListTasks=()=>{}
})=>{

    return (
        <div className="container">
            <Droppable droppableId="droppable-1">
                {(provided)=>(
                    <div
                    className="tasks_container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                    <span className="todos__heading">Active Tasks</span>
                    {localTasksList.map((task,index)=>{
                    return (
                        <TaskCard
                        key={task?._id}
                        task={task}
                        index={index}
                        isLocalTask={true}
                        setLocalTasksList={setLocalTasksList}
                        fetchListTasks={fetchListTasks}
                        />
                    )
                })}
                {provided.placeholder}
            </div>
                )}

            </Droppable>
            <Droppable droppableId="droppable-2">
                {
                    (provided)=>(
                    <div 
                    className="completed_tasks_container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        <span className="todos__heading">Completed Tasks</span>
                        {tasksList.map((task,index)=>{
                            return (
                            <TaskCard
                            key={task?._id}
                            task={task}
                            index={index}
                            isLocalTask={false}
                            fetchListTasks={fetchListTasks}
                            />
                            )
                        })}
                         {provided.placeholder}
            </div>
                    )
                }
            </Droppable>
            
        </div>
    )
}

export default TasksListing;