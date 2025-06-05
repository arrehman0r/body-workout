import { createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    completedExercises: {}, // { 'exerciseId': [timestamp1, timestamp2, ...], ... }
    lastCompletedDate: null, // ISO string 'YYYY-MM-DD'
  },
  reducers: {
    recordExerciseCompletion: (state, action) => {
      const exerciseId = action.payload;
      const now = new Date().toISOString();
      if (!state.completedExercises[exerciseId]) {
        state.completedExercises[exerciseId] = [];
      }
      state.completedExercises[exerciseId].push(now);
      state.lastCompletedDate = now.slice(0, 10); // Store only YYYY-MM-DD
    },
    // Optional: Add a reset or other progress tracking actions
  },
});

export const { recordExerciseCompletion } = progressSlice.actions;
export default progressSlice.reducer;