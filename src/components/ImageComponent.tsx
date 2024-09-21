import { PropertyImage } from '@/models/property.type.ts'
import { useState } from 'react'
import { Blurhash } from 'react-blurhash'

interface ImageComponentProps {
  image: PropertyImage
  className?: string
}

function ImageComponent({ image, className }: ImageComponentProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      {!imageLoaded && <Blurhash hash={image.blurhash} className='w-full h-full' />}

      <img
        src={image.imageUrl}
        alt={image.imageUrl}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
        className={className}
      />
    </>
  )
}

export default ImageComponent
