export const initialTodoItems = [
    {
      id: 1,
      title: "Go for a walk",
    },
    {
      id: 2,
      title: "Take a nap",
    },
    {
      id: 3,
      title: "Read a book",
    },
    {
      id: 4,
      title: "Work out",
    },
    {
      id: 5,
      title: "Learn something new",
    },
  ];
  
  export const initialColumnData = {
    todoColumn: {
      id: 1,
      title: "TODO",
      items: [...initialTodoItems],
    },
    inprogressColumn: {
        id: 2,
        title: "INPROGRESS",
        items: [],
      },
    doneColumn: {
      id: 3,
      title: "DONE",
      items: [],
    },
  };