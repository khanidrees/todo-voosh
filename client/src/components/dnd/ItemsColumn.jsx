import Card from "./Card";



const ItemsColumn = ({ columnTitle, items }) => {
  return (
    <div
      className="h-[392px] scrollbar-thin scrollbar-thumb-blue-700 
    scrollbar-track-blue-300 overflow-y-auto
      p-4 rounded-md border border-blue-300"
    >
      <p className="inline-block py-1 px-2 text-lg font-semibold bg-blue-300 rounded-md">
        {columnTitle}
      </p>
      <div className=" pt-4 flex flex-col gap-y-3">
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <Card
              key={item._id}
              draggableId={item._id.toString()}
              index={index}
              id={item._id}
              title={item.title}
              description={item?.description}
              createdAt={item?.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

export default ItemsColumn;