export interface PropertyParams {
  search: string
  cityId: number
  districtId: number
  roomTypeId: number
  minPrice: number
  maxPrice: number
  minArea: number
  maxArea: number
  numOfDays: number

  pageNumber: number
  pageSize: number

  sortBy: string
}