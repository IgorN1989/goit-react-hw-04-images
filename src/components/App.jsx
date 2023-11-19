import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Container } from './Container/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { fetchImages } from 'api/pixabay-service';

export const App = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(query, page);
        const totalHits = data.total;
        const images = data.hits;

        setGalleryItems(prevState => [...prevState, ...images]);
        setTotalHits(totalHits);

        if (totalHits === 0) {
          toast('Sorry, there are no matching images. Please try again.');
          return;
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images!`);
        }
      } catch (error) {
        setError(true);
        toast.error('Please reload this page');
      } finally {
        setLoading(false);
      }
    }

    if (query === '') {
      return;
    }
    loadImages();
  }, [query, page]);

  const submitSearch = newQuery => {
    if (!newQuery.trim()) {
      toast.error('Please, enter your search query.');
      return;
    }

    if (newQuery === query) {
      return;
    }

    setGalleryItems([]);
    setQuery(newQuery);
    setPage(1);
  };

  const increasePage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmitSearch={submitSearch} />
      {galleryItems.length > 0 && <ImageGallery images={galleryItems} />}
      {loading && <Loader />}
      {error}
      {galleryItems.length > 0 && galleryItems.length < totalHits && (
        <Button onLoadMoreBtn={increasePage} text="Load more" />
      )}
      <Toaster position="top-right" />
    </Container>
  );
};
