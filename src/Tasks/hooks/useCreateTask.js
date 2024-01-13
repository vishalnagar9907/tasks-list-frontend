const useCreateTask = (fetchListTasks)=>{

    const createTask = async ({task='',taskStatus='',fetchListTasks=()=>{}})=>{
        try{
             await fetch('http://localhost:8000/create_task', {
                method: 'POST',
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    task_name:task,
                    task_status:taskStatus,
                })
            })
            fetchListTasks();
        }
        catch(err){
            window.alert(err);
        }
    }

    return(
       { createTask}
    )
}

export default useCreateTask;
