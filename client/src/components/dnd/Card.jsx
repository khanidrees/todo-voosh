import { Draggable } from "react-beautiful-dnd";
import { POPUP } from "../POPUP";
import { axiosInstance } from "../../apicalls";
import toast from "react-hot-toast";
import { useReducer } from "react";

const Card = ({ title, draggableId, index, description, createdAt }) => {
    const [toggle, setToggle] = useReducer(s=>!s, false);
    const onEdit =async(formData)=>{
        if( !formData?.title || !formData?.description){
          return toast.error('pls fill the whole form');
        }
        // formData.userId= tokens?.id;
        try {
            const url = import.meta.env.VITE_API_URL+'/tasks/'+draggableId;
            console.log(url);
            const result = await axiosInstance.patch(url,formData);
            console.log(result); 
    
            if(result?.status==200){
              toast.success('task added successfully.');
            }
              
        } catch (error) {
            
            const message = error?.response?.data?.message; 
            
            toast.error(message||error);
        }
    }
      const onDelete =async()=>{
        
        try {
            var res = confirm("Want to delete?");
            if (!res) {
                return;
            }
            const url = import.meta.env.VITE_API_URL+'/tasks/'+draggableId;
            console.log(url);
            const result = await axiosInstance.delete(url);
            console.log(result); 
    
            if(result?.status==200){
              toast.success('task added successfully.');
            }
              
        } catch (error) {
            
            const message = error?.response?.data?.message; 
            
            toast.error(message||error);
        }
      }



  return (
    <>
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-100" : "bg-card"
          } px-4 py-6 font-medium w-full h-32 shadow-md shadow-blue-300 rounded-md flex flex-col justify-center items-start`}
        >
          <div className="font-semibold">{title}</div>
          <div className="font-normal text-sm">{description}</div>
          <p className="font-normal text-sm">createdAt: {new Date(createdAt).toDateString()}</p>
          <div className="self-end flex font-normal text-sm gap-2 mt-2">
            <button
            className="rounded-sm bg-red-500 p-1"
            onClick={()=>onDelete()}
            >Delete</button>
            <button
            className="rounded-sm bg-sky-500 p-1"
            onClick={()=>{setToggle(s=>!s);}}
            >Edit</button>
            <button
            className="rounded-sm bg-col p-1"
            >View Details</button>
          </div>
        </div>
      )}
      
    </Draggable>
    <POPUP isopen={toggle} setToggle={setToggle} isEdit={true} data={{title, description}} onSubmit={onEdit}/>
    </>
  );
};

export default Card;