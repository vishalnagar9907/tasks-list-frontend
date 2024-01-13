import {useState} from 'react';
const useListTasks = ()=>{
    const [tasksList, setTaskList] = useState([]);

    const fetchListTasks = async ()=>{
        try {
            const data = await fetch('/list_tasks?taskStatus=pending');

            const resData = await data.json();
           
            setTaskList(resData);
        }
        catch(err){
            console.log(err);
        }
    }

    return ({
        tasksList,
        fetchListTasks,
        setTaskList,
    })

}

export default useListTasks;