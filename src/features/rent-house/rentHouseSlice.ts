import { PropertyParams } from '../../models/property.params.type.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '../../store.ts'

const initialState: PropertyParams = {
  search: '',
  cityId: 0,
  districtId: 0,
  roomTypeId: 0,
  minPrice: 0,
  maxPrice: 0,
  minArea: 0,
  maxArea: 0,

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
    },
    setCityId(state, action: PayloadAction<number>) {
      state.cityId = action.payload
    },
    setDistrictId(state, action: PayloadAction<number>) {
      state.districtId = action.payload
    },
    setRoomTypeId(state, action: PayloadAction<number>) {
      state.roomTypeId = action.payload
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload
    },
    setMinArea(state, action: PayloadAction<number>) {
      state.minArea = action.payload
    },
    setMaxArea(state, action: PayloadAction<number>) {
      state.maxArea = action.payload
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload
    },
    resetAll(state) {
      state = initialState
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
  resetAll
} = rentHouseSlice.actions

export default rentHouseSlice.reducer

export const selectPropertyParams = (state: IRootState) => state.property