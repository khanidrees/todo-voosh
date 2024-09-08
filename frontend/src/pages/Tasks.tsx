import React, { useReducer } from 'react'
import { TasksListing } from '../components/TasksListing';
import { POPUP } from '../components/POPUP';

const Tasks = () => {
  
  const [toggle, setToggle] = useReducer(s=>!s, false);
  
  
  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold underline text-pink-500">
          TODO APP
        </h1>
        <button 
        className="btn-outline"
        type="button"
        data-ripple-dark="true"
        onClick={setToggle}
        >+</button>
      </div>
      <div>
        <TasksListing/>
      </div>
      <POPUP isopen={toggle} setToggle={setToggle}/>
    </div>
  )
  
}

export default Tasks