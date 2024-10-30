import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDuckSlotsList } from 'api/duck-slots';
import { deleteDuckSlot, postDuckSlotsCrossing } from 'api/duck-slots';

export const getDuckSlotsListThunk = createAsyncThunk('duckSlots/list', async (_, thunkApi) => {
  try {
    const response = await getDuckSlotsList();
    return response as any;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const crossDuckSlotsThunk = createAsyncThunk(
  'duckSlots/crossDuckSlots',
  async (
    { firstSlotId, secondSlotId }: { firstSlotId: number; secondSlotId: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await postDuckSlotsCrossing({
        firstSlotId: firstSlotId,
        secondSlotId: secondSlotId,
      });

      return data.slot;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteDuckSlotThunk = createAsyncThunk(
  'duckSlots/deleteDuckSlot',
  // async (slotId: number, { rejectWithValue }) => {
  async (slotId: any, { rejectWithValue }) => {
    try {
      await deleteDuckSlot({ slotId });
      return slotId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
