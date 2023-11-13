import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Container } from './Container/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { fetchImages } from 'api/pixabay-service';

export class App extends Component {
  state = {
    galleryItems: [],
    query: '',
    page: 1,
    loading: false,
    error: false,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.loadImages();
    }
  }

  loadImages = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ loading: true, error: false });
      const data = await fetchImages(query, page);
      const totalHits = data.total;
      const images = data.hits;

      this.setState(prevState => ({
        galleryItems: [...prevState.galleryItems, ...images],
        totalHits,
      }));

      if (totalHits === 0) {
        toast('Sorry, there are no matching images. Please try again.');
        return;
      }

      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} images!`);
      }
    } catch (error) {
      this.setState({ error: true });
      toast.error('Please reload this page');
    } finally {
      this.setState({ loading: false });
    }
  };

  submitSearch = newQuery => {
    if (!newQuery.trim()) {
      toast.error('Please, enter your search query.');
      return;
    }

    if (newQuery === this.state.query) {
      return;
    }

    this.setState({
      galleryItems: [],
      query: newQuery,
      page: 1,
    });
  };

  increasePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { galleryItems, loading, error, totalHits } = this.state;
    return (
      <Container>
        <Searchbar onSubmitSearch={this.submitSearch} />
        {galleryItems.length > 0 && <ImageGallery images={galleryItems} />}
        {loading && <Loader />}
        {error}
        {galleryItems.length > 0 && galleryItems.length < totalHits && (
          <Button onLoadMoreBtn={this.increasePage} text="Load more" />
        )}
        <Toaster position="top-right" />
      </Container>
    );
  }
}
