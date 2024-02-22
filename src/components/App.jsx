import s from './styles/styles.module.css'
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImagesWithQuery } from '../api';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    searchQuery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  handleSetQuery = searchQuery => {
    this.setState({ searchQuery });
  };

  fetchImages = async () => {
    const { searchQuery } = this.state;
    this.setState({ images: [] });
    try {
      this.setState({ isLoading: true });
      const images = await fetchImagesWithQuery(searchQuery, 1);
      this.setState({ images, page: 1 });
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMoreImages = async () => {
    const { searchQuery, page } = this.state;
    const nextPage = page + 1;
    try {
      this.setState({ isLoading: true });
      const newImages = await fetchImagesWithQuery(searchQuery, nextPage);
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        page: nextPage,
      }));
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleOpenModal = largeImageURL => {
    document.body.style.overflow = 'hidden';
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    document.body.style.overflow = 'auto';
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { showModal, largeImageURL, images, isLoading } = this.state;
    return (
      <div className={s.app}>
        <Searchbar handleSetQuery={this.handleSetQuery} />
        <ImageGallery images={images} onItemClick={this.handleOpenModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMoreImages} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}


























// import React from "react";
// import './styles/styles.css'
// import ImageGallery from './ImageGallery/ImageGallery'
// import Searchbar from './Searchbar/Searchbar'
// import Button from './Button/Button'
// // import {fetchImagesByQuery} from '../api'
// import { fetchPosts } from '../api'
// import { Loader } from './Loader/Loader'
// import Modal from './Button/Button'



// export class App extends React.Component {
//   state = {
//     images: [],
//     totalImages: 0,
//     loading: false,
//     error: null,
//     page: 1,
//     query: '',
//     searchPerformed: false,
//     showLoadMoreButton: false, // Додали новий стан
//     showModal: false, // Стан для показу модального вікна
//     selectedImage: null // Стан для зберігання обраного зображення
//   }

//   async componentDidMount() {
//     this.fetchImages();
//   }

//   async componentDidUpdate(prevProps, prevState) {
//     if (prevState.page !== this.state.page || prevState.query !== this.state.query) {
//       this.fetchImages();
//     }
//   }

//   async fetchImages() {
//     try {
//       const { query, page } = this.state;
//       this.setState({ loading: true });
//       const { hits, total } = await fetchPosts(query, { page });
//       this.setState(prev => ({
//         images: [...prev.images, ...hits],
//         totalImages: total,
//         loading: false,
//         showLoadMoreButton: hits.length > 0 && prev.searchPerformed // Показуємо кнопку, якщо отримано нові зображення
//       }));
//     } catch (error) {
//       this.setState({ error, loading: false });
//     }
//   }

//   handleSetQuery = query => {
//     this.setState({ query, images: [], page: 1, searchPerformed: true });
//   }

//   handleLoadMore = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   }

//   // Метод для відкриття модального вікна
//   handleOpenModal = image => {
//     this.setState({ showModal: true, selectedImage: image });
//   }

//   // Метод для закриття модального вікна
//   handleCloseModal = () => {
//     this.setState({ showModal: false, selectedImage: null });
//   }

//   render() {
//     const { images, loading, searchPerformed, showLoadMoreButton, showModal, selectedImage } = this.state;
//     return (
//       <div>
//         <Searchbar handleSetQuery={this.handleSetQuery} />
//         {searchPerformed && <ImageGallery hits={images} handleOpenModal={this.handleOpenModal} />} {/* Передаємо метод handleOpenModal у властивість */}
//         {loading && <Loader />}
//         {showLoadMoreButton && images.length > 0 && <Button handleLoadMore={this.handleLoadMore} />}
//         {showModal && selectedImage && ( /* Відображаємо модальне вікно тільки якщо воно відкрите і є обране зображення */
//           <Modal selectedImage={selectedImage} handleCloseModal={this.handleCloseModal} />
//         )}
//       </div>
//     )
//   }
// }

























// export class App extends React.Component {

//   state = {
//     images: [],
//     totalImages: 0,
//     loading: false,
//     error: null,
//     page: 1,
//     query:'',
    
// }


//   async componentDidMount() {
//     try {
//       this.setState({loading: true})
//       const { hits, total } = await fetchPosts()
//       this.setState({ images: hits, totalImages: total})
//     } catch (error) {
//       this.setState({error})
//     }
//     finally {
//       this.setState({ loading: false})
//     }
//   }
  
//   async componentDidUpdate(prevProps, prevState) {
//     if (prevState.page !== this.state.page || prevState.query !== this.state.query) {
//       try {
//         const { hits, total } = await fetchPosts({ page: this.state.page })
//         this.setState(prev => ({ images: [...prev.images, ...hits], totalImages: total}))
//     } catch(error){}
//   }
//   }
  

//   handleSetQuery = query => {
// 		this.setState({ query, images: [], page: 1 })
// 	}


  
//   handleLoadMore = () => {
//     this.setState(prev => ({page: prev.page +1}))
//   }
  
  

//   render() {
//       const {images, loading} = this.state
//         return (
//         <div>
//             <Searchbar handleSetQuery={this.handleSetQuery } />
//             <ImageGallery hits={images} />
//             {loading && <Loader />} 
            
//             {images.length ? <Button handleLoadMore={this.handleLoadMore} /> : null}
            
//         </div>
//         )
//     }
// }
