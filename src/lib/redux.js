// A simple redux store/actions/reducer implementation.
// A true app would be more complex and separated into different files.
import { createStore } from "redux";

// The actions are the "names" of the changes that can happen to the store
export const actions = {
  ARCHIVE_TASK: "ARCHIVE_TASK",
  PIN_TASK: "PIN_TASK",
};

export const archiveTask = (id) => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = (id) => ({ type: actions.PIN_TASK, id });

function taskStateReducer(taskState) {
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map((task) => 
        task.id === action.id ? { ...task, state: taskState } : task
      ),
    };
  };
}

// The reducer describes how the contents of the store change for each action
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer("TASK_ARCHIVED")(state, action);
    case actions.PIN_TASK:
      return taskStateReducer("TASK_PINNED")(state, action);
    default:
      return state;
  }
};

const defualtTasks = [
  { id: "1", title: "Somthing", state: "TASK_INBOX" },
  { id: "2", title: "Somthing more", state: "TASK_INBOX" },
  { id: "3", title: "Somthing else", state: "TASK_INBOX" },
  { id: "4", title: "Somthing again", state: "TASK_INBOX" },
];

export default createStore(reducer, { tasks: defualtTasks });
