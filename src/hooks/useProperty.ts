import { getPropertyById } from '@/api/property.api'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'
import { PropertyFilters } from '@/models/property.type.ts'

export const useProperty = (propertyId: number) => {
  const { data: propertyData, isLoading: propertyIsLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => getPropertyById(propertyId),
    enabled: propertyId !== undefined
  })
  return { propertyData, propertyIsLoading }
}

export const usePropertyFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const cityId = parseInt(searchParams.get('cityId') || '0')
  const districtId = parseInt(searchParams.get('districtId') || '0')
  const roomTypeId = parseInt(searchParams.get('roomTypeId') || '0')
  const minPrice = parseInt(searchParams.get('minPrice') || '0')
  const maxPrice = parseInt(searchParams.get('maxPrice') || '0')
  const minArea = parseInt(searchParams.get('minArea') || '0')
  const maxArea = parseInt(searchParams.get('maxArea') || '0')
  const numOfDays = parseInt(searchParams.get('numOfDays') || '0')
  const sortBy = searchParams.get('sortBy') || ''
  const pageNumber = parseInt(searchParams.get('pageNumber') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '5')

  const setFilters = useCallback(
    (filters: PropertyFilters) => {
      setSearchParams(
        (params) => {
          if (filters.search !== undefined) {
            if (filters.search) {
              params.set('search', filters.search)
            } else {
              params.delete('search')
            }
          }

          if (filters.cityId !== undefined) {
            params.set('cityId', String(filters.cityId))
            params.set('pageNumber', '1')
          }

          if (filters.districtId !== undefined) {
            params.set('districtId', String(filters.districtId))
            params.set('pageNumber', '1')
          }

          if (filters.roomTypeId !== undefined) {
            params.set('roomTypeId', String(filters.roomTypeId))
            params.set('pageNumber', '1')
          }

          if (filters.minPrice !== undefined) {
            params.set('minPrice', String(filters.minPrice))
            params.set('pageNumber', '1')
          }

          if (filters.maxPrice !== undefined) {
            params.set('maxPrice', String(filters.maxPrice))
            params.set('pageNumber', '1')
          }

          if (filters.minArea !== undefined) {
            params.set('minArea', String(filters.minArea))
            params.set('pageNumber', '1')
          }

          if (filters.maxArea !== undefined) {
            params.set('maxArea', String(filters.maxArea))
            params.set('pageNumber', '1')
          }

          if (filters.numOfDays !== undefined) {
            params.set('numOfDays', String(filters.numOfDays))
            params.set('pageNumber', '1')
          }

          if (filters.pageNumber !== undefined) {
            params.set('pageNumber', String(filters.pageNumber))
          }

          if (filters.pageSize !== undefined) {
            params.set('pageSize', String(filters.pageSize))
          }

          if (filters.sortBy !== undefined) {
            if (filters.sortBy) {
              params.set('sortBy', filters.sortBy)
            } else {
              params.delete('sortBy')
            }
          }

          return params
        },
        { replace: true }
      )
    },
    [setSearchParams]
  )

  return {
    search,
    cityId,
    districtId,
    roomTypeId,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    numOfDays,
    sortBy,
    pageNumber,
    pageSize,
    setFilters
  }
}
