import { Component } from "react";
import { ModalStyles, Overlay } from "./Modal.styled";
import PropTypes from 'prop-types'

class Modal extends Component {


    componentDidMount() {
        document.addEventListener('keydown', this.handleEscape)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEscape)
    } 

    
    handleEscape = (event) => {
        if (event.code === 'Escape') {
            this.props.onCloseModal()
        }
    }

      handleImageClick = (event) => {
    event.stopPropagation();
  };

    render() { 
        const {children, onCloseModal} = this.props
        return (
            <>
                <Overlay className="overlay" onClick={onCloseModal}>
                    <ModalStyles className="modal" onClick={this.handleImageClick}>
                        {children}
                    </ModalStyles>
                </Overlay>
            </>
        );
    }
}
 

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}


export default Modal;