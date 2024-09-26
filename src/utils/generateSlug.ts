import slugify from 'slugify'

export function generateSlug(title: string, id: number): string {
  return slugify(title, { lower: true }) + '-' + id
}
