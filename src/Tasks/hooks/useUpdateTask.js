const useUpdateTask = ({setIsEdit=()=>{}, fetchListTasks=()=>{}})=>{

    const updateTask = async ({id,task_name,task_status})=>{
        fetch(`http://localhost:8000/update_task/${id}`, {
               method: 'PATCH',
               headers: {
                   "content-Type": "application/json"
               },
               body: JSON.stringify({
                task_name,
                task_status,
               })
           }).then(()=>{
            fetchListTasks();
            setIsEdit(false);
           }).catch((err)=>{window.alert(err);})
        
    }

    return(
       { updateTask}
    )
}

export default useUpdateTask;