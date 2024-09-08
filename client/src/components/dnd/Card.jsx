import { Draggable } from "react-beautiful-dnd";

const Card = ({ title, draggableId, index, description, createdAt }) => {

    
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-100" : "bg-white"
          } px-2 py-4 font-medium w-full h-28 shadow-md shadow-blue-300 rounded-md flex flex-col justify-center items-start`}
        >
          <div className="font-semibold">{title}</div>
          <div className="font-normal text-sm">{description}</div>
          <p className="font-normal text-sm">createdAt: {new Date(createdAt).toDateString()}</p>
          <div className="self-end flex font-normal text-sm gap-2 mt-2">
            <button
            className="rounded-sm bg-red-500 p-1"
            >Delete</button>
            <button
            className="rounded-sm bg-sky-500 p-1"
            >Edit</button>
            <button
            className="rounded-sm bg-col p-1"
            >View Details</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;