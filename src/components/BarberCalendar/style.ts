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

interface ModalEventButtonCanceledEventProps {
  outline?: boolean;
  flex?: boolean;
}

export const ModalEventButtonCanceledEvent = styled.button`
  cursor: pointer;
  color: ${(p: ModalEventButtonCanceledEventProps) =>
    p.outline ? '#000000' : '#ffffff'};
  font-family: 'Roboto', 'sans-serif';
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  background-color: ${(p: ModalEventButtonCanceledEventProps) =>
    p.outline ? '#ffffff' : '#d00000'};
  border: ${(p: ModalEventButtonCanceledEventProps) =>
    p.outline ? '2px solid #d00000' : 'none'};
  border-radius: 8px;
  min-width: 120px;
  height: 38px;
  display: grid;
  place-items: center;
  transition: 0.4s;
  margin-left: ${(p: ModalEventButtonCanceledEventProps) =>
    p.flex ? '0px' : '18px'};
  margin-top: 8px;

  :hover {
    box-shadow: 0 0 0 2px #d00000;
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
  margin-bottom: 40px;

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

interface EventModalSectionTitleProps {
  beforeColor?: string;
}

export const EventModalSectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  font-family: 'Poppins', 'sans-serif';
  display: flex;
  align-items: center;
  gap: 8px;

  ::before {
    content: '';
    display: inline-block;
    background-color: ${(p: EventModalSectionTitleProps) =>
      p.beforeColor ? p.beforeColor : '#ffdd00'};
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  @media (max-width: 769px) {
    font-size: 14px;
  }
`;

export const EventModalLabel = styled.span`
  font-family: 'Roboto', 'sans-serif';
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  margin-top: 16px;
  margin-left: 18px;

  display: flex;
  align-items: center;
  gap: 20px;

  span[class='flex'] {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    color: #181b23;
  }

  span[class='link'] {
    text-decoration: underline;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const EventModalServicesList = styled.ul`
  margin-top: 16px;
  margin-left: 18px;

  li + li {
    margin-top: 16px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 40px;
    font-size: 14px;
    font-weight: 400;
    font-family: 'Roboto', 'sans-serif';
    color: #000000;
    border-bottom: 1px solid #ccc;
    padding-bottom: 4px;

    span[class='serviceName'] {
      display: flex;
      align-items: center;
      gap: 8px;

      ::before {
        content: '';
        display: inline-block;
        background-color: #000000;
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
    }

    span[class='servicePrice'] {
      color: #000000;
      font-weight: bold;
    }
  }
`;

export const ModalCanceledEventText = styled.p`
  font-size: 16px;
  text-align: center;
  color: #000000;
  font-family: 'Roboto', 'sans-serif';
  font-weight: 400;
  line-height: 1.4;

  span[class='event'] {
    font-weight: bold;
  }
`;

export const HelpEventText = styled.p`
  font-size: 16px;
  color: #000000;
  font-weight: 600;
  font-family: 'Poppins', 'sans-serif';
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;

  @media (max-width: 769px) {
    font-size: 14px;
  }
`;
