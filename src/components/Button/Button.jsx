import { StyledButton } from './Button.styled';

export const Button = ({ onLoadMoreBtn, text }) => (
  <StyledButton type="button" onClick={onLoadMoreBtn}>
    {text}
  </StyledButton>
);
