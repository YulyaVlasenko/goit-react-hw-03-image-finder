import { getImagesBySearch } from "api/images";
import { Component } from "react";
import { GlobalStyles } from "utils/GlobalStyles";
import ImageGallery from "./ImageGallery/ImageGallery";
import { AppStyle } from "./App.styled";
import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import { Toaster, toast } from "react-hot-toast";
import Modal from "./Modal/Modal";


class App extends Component {
  state = {
    searchQuery: '',
    hits: [],
    isLoading: false,
    error: '',
    totalPages: 0,
    currentPage: 1,
    showModal: false,
    imageModal: ''
  } 


  componentDidUpdate = (prevProps, prevState) => {
    const { searchQuery, currentPage} = this.state
    
    if (prevState.searchQuery !== searchQuery ||
    prevState.currentPage !== currentPage)
       { this.apiImages()}
  }
  

  handleSubmit = (text) => {

     if (this.state.searchQuery === text) {
      return toast.error(`Sorry,  you just looked ${text}`);
    }

    this.setState({
      hits: [],
      searchQuery: text,
      currentPage: 1,
    });
}

  handleLoader = () => {
    this.setState( prevValue => ({
      currentPage: prevValue.currentPage + 1
    })
    )
  }

  apiImages = async () => {
      const {searchQuery, currentPage} = this.state
        try {
            this.setState({isLoading:true})
          const data = await getImagesBySearch(searchQuery, currentPage)

          if (data.hits.length === 0) {
          return toast.error('Images not found')
          } 

        this.setState((prevValue) => ({ hits: [...prevValue.hits, ...data.hits], totalPages: Math.floor(data.totalHits / 12) }))
        toast.success(`page: ${currentPage}`)  
           
        } catch (error) {
            console.log('error :>> ', error);
            this.setState({
                error: error.message
            })
            toast.error(error.message)
        } finally {
            this.setState({isLoading:false})
        }
        
  }

  handleOpenModal = (imageURL) => {
    this.setState({showModal: true, imageModal: imageURL})
  }

  handleCloseModal = () => {
    this.setState({showModal: false, imageModal: ''})
  }



  render() { 
    const {hits, isLoading, totalPages, currentPage, showModal, imageModal} = this.state
    return (
      <AppStyle>
        <Searchbar onSubmit={this.handleSubmit} currentPage={currentPage} />
        {hits.length > 0 && <ImageGallery hits={hits} onOpenModal={this.handleOpenModal}/>}
        {hits.length > 0 && totalPages !== currentPage && !isLoading && <Button onClick={this.handleLoader} />}
        {isLoading && <Loader />}
        {showModal && <Modal onCloseModal={this.handleCloseModal}>
          <img src={imageModal} alt={hits.tags}/>
        </Modal>}
        <GlobalStyles />
        <Toaster/>
    </AppStyle>
    )
  }
}
 
export default App;

