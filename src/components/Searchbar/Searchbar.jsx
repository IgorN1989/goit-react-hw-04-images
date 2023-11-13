import { FiSearch } from 'react-icons/fi';
import {
  SearchbarContainer,
  SearchbarForm,
  SearchbarFormBtn,
  SearchbarFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmitSearch }) => (
  <SearchbarContainer>
    <SearchbarForm
      onSubmit={evt => {
        evt.preventDefault();
        onSubmitSearch(evt.target.input.value);
      }}
    >
      <SearchbarFormBtn type="submit">
        <FiSearch />
      </SearchbarFormBtn>

      <SearchbarFormInput
        name="input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </SearchbarForm>
  </SearchbarContainer>
);
