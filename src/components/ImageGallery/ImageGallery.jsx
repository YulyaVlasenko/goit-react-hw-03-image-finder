import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import React from 'react'
import { Gallery } from './ImageGallery.styled'
import PropTypes from 'prop-types'

const ImageGallery = ({ hits, onOpenModal }) => {
  return (
      
     <Gallery>
      {hits.map(hit =>
        <ImageGalleryItem key={hit.id} hit={hit} onOpenModal={onOpenModal} />)}
      </Gallery>
    
  )
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })).isRequired,
  onOpenModal: PropTypes.func.isRequired
}

export default ImageGallery