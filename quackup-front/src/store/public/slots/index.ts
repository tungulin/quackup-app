import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { crossDuckSlotsThunk, deleteDuckSlotThunk, getDuckSlotsListThunk } from './thunk';
import toast from 'react-hot-toast';

const initialState: any = {
  duckSlotsList: [],
  isDraggingDuck: false,
};

export const duckSlotsSlice = createSlice({
  name: 'duckSlots',
  initialState,
  reducers: {
    reset: (state) => {
      state.duckSlotsList = [];
    },
    setDuckSlots: (state, action: PayloadAction<any[]>) => {
      state.duckSlotsList = action.payload;
    },
    addDuckSlot: (state, action: PayloadAction<{}>) => {
      const indexFirstNull = state.duckSlotsList.findIndex((value: any) => value === null);
      state.duckSlotsList[indexFirstNull] = action.payload;
    },
    setIsDraggingDuck: (state, action: PayloadAction<boolean>) => {
      state.isDraggingDuck = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDuckSlotsListThunk.fulfilled, (state, action: PayloadAction<[]>) => {
        const emptySlots = new Array(8 - action.payload.length).fill(null);
        state.duckSlotsList = [...action.payload, ...emptySlots];
      })
      .addCase(crossDuckSlotsThunk.fulfilled, (state, action: PayloadAction<any>) => {
        const indexFirstNull = state.duckSlotsList.findIndex((value: any) => value === null);
        if (indexFirstNull !== -1) {
          state.duckSlotsList[indexFirstNull] = action.payload;
        }
      })
      .addCase(crossDuckSlotsThunk.rejected, (state, action) => {
        console.error('Ошибка при скрещивании уток:', action.payload);
      })
      .addCase(deleteDuckSlotThunk.fulfilled, (state, action: PayloadAction<any>) => {
        const indexDeletedDuck = state.duckSlotsList.findIndex(
          (value: any) => value?.id === action.payload
        );

        if (indexDeletedDuck !== -1) {
          state.duckSlotsList[indexDeletedDuck] = null;
          toast.success('Duck removed!');
        }
      })
      .addCase(deleteDuckSlotThunk.rejected, (state, action) => {
        toast.error((action.payload as string) || 'Duck not removed!');
      });
  },
});

export const { reset, setDuckSlots, addDuckSlot, setIsDraggingDuck } = duckSlotsSlice.actions;
