import usePropertyStore from '@/store/propertyStore.ts'

export const PropertyDetailBreadcrumb = () => {
  const name = usePropertyStore((state) => state.name)
  return <span>{name}</span>
}