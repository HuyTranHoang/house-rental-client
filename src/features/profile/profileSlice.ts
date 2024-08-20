import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '@/store.ts'

interface IProfileState {
  currentSelectMenu: string[];
}

const initialState: IProfileState = {
  currentSelectMenu: ['thongTinCaNhan']
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Dùng để chỉnh selected menu hiện tại trong pro5 ở ProfileLayout.tsx
    selectMenu: (state, action: PayloadAction<string[]>) => {
      state.currentSelectMenu = action.payload;
    }
  }
});

export const { selectMenu } = profileSlice.actions;
export default profileSlice.reducer;
export const selectProfile = (state: IRootState) => state.profile;