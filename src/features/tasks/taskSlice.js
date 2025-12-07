import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  pendingTasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.pendingTasks.push(action.payload);
      },
      prepare(task) {
        return {
          payload: {
            id: nanoid(),
            createdAt: new Date().toISOString(),
            ...task,
          },
        };
      },
    },
    removeOldestTask(state) {
      if (state.pendingTasks.length > 0) {
        state.pendingTasks.shift();
      }
    },
  },
});

export const { addTask, removeOldestTask } = taskSlice.actions;
export default taskSlice.reducer;
