import { PropertyParams } from '@/models/property.params.type.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '@/store.ts'

const initialState: PropertyParams = {
  search: '',
  cityId: 0,
  districtId: 0,
  roomTypeId: 0,
  minPrice: 0,
  maxPrice: 0,
  minArea: 0,
  maxArea: 0,
  numOfDays: 0,

  pageNumber: 1,
  pageSize: 2,

  sortBy: 'createdAtDesc'
}

const rentHouseSlice = createSlice({
  name: 'rentHouse',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.pageNumber = 1
    },
    setCityId(state, action: PayloadAction<number>) {
      state.cityId = action.payload
      state.pageNumber = 1
    },
    setDistrictId(state, action: PayloadAction<number>) {
      state.districtId = action.payload
      state.pageNumber = 1
    },
    setRoomTypeId(state, action: PayloadAction<number>) {
      state.roomTypeId = action.payload
      state.pageNumber = 1
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload
      state.pageNumber = 1
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload
      state.pageNumber = 1
    },
    setMinArea(state, action: PayloadAction<number>) {
      state.minArea = action.payload
      state.pageNumber = 1
    },
    setMaxArea(state, action: PayloadAction<number>) {
      state.maxArea = action.payload
      state.pageNumber = 1
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
      state.pageNumber = 1
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload
      state.pageNumber = 1
    },
    setNumOfDays(state, action: PayloadAction<number>) {
      state.numOfDays = action.payload
      state.pageNumber = 1
    }
  }
})

export const {
  setSearch,
  setCityId,
  setDistrictId,
  setRoomTypeId,
  setMinPrice,
  setMaxPrice,
  setMinArea,
  setMaxArea,
  setPageNumber,
  setPageSize,
  setSortBy,
  setNumOfDays,
} = rentHouseSlice.actions

export default rentHouseSlice.reducer

export const selectPropertyParams = (state: IRootState) => state.property