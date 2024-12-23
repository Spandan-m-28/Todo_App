import React from "react";

const Todo = (props) => {
  const handleEdit = () => {
    props.onEdit(props.id);
  };

  const handleDelete = () => {
    props.onDelete(props.id);
  };

  const handlecheck = (event) => {
    const isChecked = event.target.checked;
    props.oncheck(props.id, isChecked);
  };

  return (
    <>
      <div className="mx-9 my-1 bg-amber-200 rounded-md p-1 flex justify-between">
        <div className="flex ml-2">
          <input onChange={handlecheck} type="checkbox" name="" id="" />
          <p className={`ml-3 ${props.isCompleted ? "line-through" : ""} mr-1`}>
            {props.task}
          </p>
        </div>
        <div className="mr-2 flex gap-3">
          <button
            onClick={handleEdit}
            className="bg-amber-300 rounded-md p-1 px-2 max-h-9 hover:scale-105">
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-amber-300 rounded-md p-0.5 px-2 max-h-9 hover:scale-105">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
