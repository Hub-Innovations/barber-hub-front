import styled, { keyframes } from 'styled-components';

interface ModalEventButtonProps {
  outline?: boolean;
}

export const ModaEventButton = styled.button`
  cursor: pointer;
  color: #000000;
  font-family: 'Roboto', 'sans-serif';
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  background-color: ${(p: ModalEventButtonProps) =>
    p.outline ? '#ffffff' : '#ffdd00'};
  border: ${(p: ModalEventButtonProps) =>
    p.outline ? '2px solid #ffdd00' : 'none'};

  border-radius: 8px;
  min-width: 120px;
  height: 44px;
  display: grid;
  place-items: center;
  transition: 0.4s;

  :hover {
    box-shadow: 0 0 0 2px #ffdd00;
  }

  :disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

export const ModalEventButtonFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-bottom: 20px;
  margin-top: 40px;
`;

export const CalendarButtonAddEvent = styled.button`
  margin-top: 24px;
  cursor: pointer;
  display: block;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
  font-family: 'Poppins', 'sans-serif';
  border-radius: 8px;
  background: #ffdd00;
  padding: 8px;
  transition: 0.4s;
  min-width: 220px;
  min-height: 44px;

  :hover {
    box-shadow: 0 0 0 2px #ffdd00;
  }
`;

export const AddEventFormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: 769px) {
    grid-template-columns: 1fr;
  }
`;

export const AddEventFLexItems = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

export const AnimeShowInput = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-30px,0,0);
  }
  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;

export const AnimeBox = styled.div`
  animation: ${AnimeShowInput} 0.6s;
`;

export const HelpRequiredInputText = styled.p`
  font-family: 14px;
  color: #000000;
  font-weight: 600;
  font-family: 'Poppins', 'sans-serif';

  @media (max-width: 769px) {
    font-size: 12px;
  }
`;
