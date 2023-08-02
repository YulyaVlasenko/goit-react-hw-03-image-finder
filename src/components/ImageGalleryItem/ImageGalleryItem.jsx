
import React from 'react'
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled'
import PropTypes from 'prop-types'

const ImageGalleryItem = ({hit, onOpenModal}) => {
  return (
      <GalleryItem onClick={()=>onOpenModal(hit.largeImageURL)}>
      <GalleryItemImage src={hit.webformatURL} alt="SmallImage" />
      </GalleryItem>
  )
}

ImageGalleryItem.propTypes = {
  hit: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired
}

export default ImageGalleryItem