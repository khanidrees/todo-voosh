import React, { useContext, useEffect, useReducer, useState } from 'react'
import { TasksListing } from '../components/TasksListing';
import { POPUP } from '../components/POPUP';
import TodoList from '../components/dnd/TodoList';
import { axiosInstance } from '../apicalls';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';

const Tasks = () => {
  const {tokens, setTokens} = useContext(AuthContext);
  const {todoData, setTodoData} = useContext(TaskContext);
  const [toggle, setToggle] = useReducer(s=>!s, false);

  const [isLoading, setIsLoading] = useState(false);
  
  
  const onSubmit =async(formData)=>{
    if( !formData?.title || !formData?.description){
      return toast.error('pls fill the whole form');
    }
    formData.userId= tokens?.id;
    try {
        const url = import.meta.env.VITE_API_URL+'/tasks';
        console.log(url);
        const result = await axiosInstance.post(url,formData);
        console.log(result); 

        // let updatedData = todoData;
        // updatedData[todo][items] = [...todoData[todo][items],result?.data?.data];
        // console.log(updatedData);
        console.log(result?.data?.data);
        setTodoData({
          ...todoData,
          ['todo']: {
            ...todoData['todo'],
            items: [...todoData['todo']['items'], result?.data?.data],
          }
        }); 
        if(result?.status==200){
          toast.success('task added successfully.');
        }
          
    } catch (error) {
        
        const message = error?.response?.data?.message; 
        
        toast.error(message||error);
    }
  }

  useEffect(()=>{
    async function load(){
      setIsLoading(true);
      try {
        const url = import.meta.env.VITE_API_URL+'/tasks?userId='+tokens?.id;
        console.log(url);
        const result = await axiosInstance.get(url);
        const data = result?.data?.data;
        let groupData;
        let allData=todoData;  

        if(Array.isArray(data) && data?.length>0){
          groupData = Object.groupBy(data, ({ status }) => status);
          for(let key in groupData){
            allData[key].items = groupData[key];
          }
          setTodoData(allData);
          console.log(allData);
        }

         
        
        // if(result?.status==200){
        //   toast.success('task added successfully.');
        // }
          
      } catch (error) {
          
          const message = error?.response?.data?.message; 
          
          toast.error(message||error);
      }finally{
        setIsLoading(false);
      }
    }
    load();
  },[])
  
  return (
    <div className='flex flex-col h-full w-full px-6'>
      <div>
        <button
        className='mt-6 block w-[150px] select-none rounded-lg bg-col py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
        onClick={()=>{
          setToggle(s=>!s);
        }}
        >
          Add Task
        </button>
      </div>
      <div>
        {/* <TasksListing/> */}
        <TodoList initialColumnData={todoData}/>
      </div>
      <POPUP isopen={toggle} setToggle={setToggle} onSubmit={onSubmit}/>
    </div>
  )
  
}

export default Tasks