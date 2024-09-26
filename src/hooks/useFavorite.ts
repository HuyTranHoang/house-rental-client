import { addFavorite, getFavoritePropertiesByUserId, getFavoritesByUserId, removeFavorite } from '@/api/favorite.api.ts'
import { Favorite } from '@/types/favorite.type.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useFavoriteByUserId = (userId: number | undefined) => {
  const { data: favorites, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: async () => getFavoritesByUserId(userId!),
    enabled: userId !== undefined
  })
  return { favorites, isLoadingFavorites }
}

export const useFavoritePropertyByUserId = (userId: number | undefined) => {
  const { data: favortieProperties, isLoading: isLoadingFavoriteProperties } = useQuery({
    queryKey: ['favoriteProperty', userId],
    queryFn: async () => getFavoritePropertiesByUserId(userId!),
    enabled: userId !== undefined
  })
  return { favortieProperties, isLoadingFavoriteProperties }
}

export const useAddFavorite = () => {
  const queryClient = useQueryClient()

  const { mutate: addFavoriteMutate, isPending: isPendingAddFavorite } = useMutation({
    mutationFn: addFavorite,
    onSuccess: (data) => {
      queryClient.setQueryData(['favorites', data?.userId], (oldData: Favorite[]) => {
        return [...oldData, data]
      })
    }
  })

  return { addFavoriteMutate, isPendingAddFavorite }
}

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient()

  const { mutate: removeFavoriteMutate, isPending: isPendingRemoveFavorite } = useMutation({
    mutationFn: removeFavorite,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(['favorites', variables.userId], (oldData: Favorite[]) => {
        return oldData.filter((favorite) => favorite.propertyId !== variables.propertyId)
      })

      queryClient.invalidateQueries({ queryKey: ['favoriteProperty'] })
    }
  })

  return { removeFavoriteMutate, isPendingRemoveFavorite }
}
