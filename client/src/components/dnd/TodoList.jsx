import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ItemsColumn from "./ItemsColumn";
import Droppable from "./StrictModeDroppable";
// import { initialColumnData, initialTodoItems } from "../../utils/constants";
import { reorder } from "../../utils/helpers";

const TodoList = ({ initialColumnData }) => {
  const [columnData, setColumnData] = useState(initialColumnData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination?.droppableId;

    // REORDER: if source and destination droppable ids are same
    if (dInd && sInd === dInd) {
      const column = columnData[sInd];
      const reorderedItems = reorder(
        column.items,
        source.index,
        destination.index
      );

      setColumnData({
        ...columnData,
        [dInd]: {
          ...column,
          items: reorderedItems,
        },
      });
    }

    // DROP: if source and destination droppable ids are different
    if (dInd && dInd !== sInd) {
      const sourceColumn = columnData[sInd];
      const desColumn = columnData[dInd];

      const itemToDrop = sourceColumn.items.find(
        (item) => item._id.toString() == result.draggableId
      );

      //INSERT: dragged item to another column
      if (itemToDrop) {
        const sourceColumnItems = Array.from(sourceColumn.items);
        const destColumnItems = Array.from(desColumn.items);

        sourceColumnItems.splice(result.source.index, 1);
        destColumnItems.splice(result.destination.index, 0, itemToDrop);

        setColumnData({
          ...columnData,
          [sInd]: {
            ...sourceColumn,
            items: sourceColumnItems,
          },
          [dInd]: {
            ...desColumn,
            items: destColumnItems,
          },
        });
      }
    }
  };

  return (
    <div className="w-[1000px] mx-auto">
      <p className="py-12 text-3xl text-center font-semibold text-blue-800">
        Todo List
      </p>
      <div className="grid grid-cols-3  gap-x-4 justify-between">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columnData).map(([id, column]) => (
            <Droppable droppableId={id} key={id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <ItemsColumn
                    columnTitle={column.title}
                    items={column.items}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TodoList;