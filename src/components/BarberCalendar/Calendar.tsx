import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import useMedia from 'hooks/useMedia';
import React, { CSSProperties } from 'react';
import { SectionTitle } from 'components/BarberRegister/BarberContact/style';
import * as Styled from './style';
import { Input, Label } from 'components/StyledComponents/Form/AdminInputs';
import Select, { StylesConfig } from 'react-select';
import { registerLocale } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
registerLocale('pt', pt);

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface dataModalEventPros {
  title: string;
}

// tem que ser um state pois as options vai vir do back
const serviceOptions = [
  { label: 'Corte navalhado', value: '1' },
  { label: 'Corte na tesoura', value: '2' },
  { label: 'Corte de máquina', value: '3' },
];

export const CalendarComponent = () => {
  const mobile = useMedia('(max-width: 769px)');
  const [showModalEvent, setShowModalEvent] = React.useState(false);
  const [dataToModalEvent, setDataToModalEvent] =
    React.useState<dataModalEventPros>();
  const [showModalAddEvent, setShowModalAddEvent] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());

  function handleShowEvent(e: any) {
    console.log('%c⧭', 'color: #00258c', e);
    setShowModalEvent(true);
    setDataToModalEvent(e);
  }

  const messages = {
    allDay: 'Dia Inteiro',
    previous: '<',
    next: '>',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    showMore: (total: number) => `+ (${total}) Eventos`,
  };
  const myEventList = [
    {
      _id: '63ac369a16d3a5d153048e60',
      start: new Date('2023-01-03T15:50:05.158Z'),
      end: new Date('2023-01-03T18:50:05.158Z'),
      title: 'José + Aroldo: Corte duplo',
      allDay: false,
      resource: {
        status: 1,
        services: ['63a8fd6ea78c0cda198e66d1', '63a8fd6ea78c0cda198e66d3'],
      },
      barberId: '63ab004032a0f08ebc6d0421',
      __v: 0,
    },
    {
      _id: '63ac37003355a75be1f5df73',
      start: new Date('2023-01-04T15:50:05.158Z'),
      end: new Date('2023-01-04T18:50:05.158Z'),
      title: 'José + Fred: Corte duplo',
      allDay: false,
      resource: {
        services: ['63a8fd6ea78c0cda198e66d1', '63a8fd6ea78c0cda198e66d3'],
      },
      barberId: '63ab004032a0f08ebc6d0421',
      __v: 0,
    },
    {
      _id: '63ac37003355a75be1f5df73',
      start: new Date('2023-01-05T15:50:05.158Z'),
      end: new Date('2023-01-05T18:50:05.158Z'),
      title: 'José + tio nelson: Corte navalhado',
      allDay: false,
      resource: {
        services: ['63a8fd6ea78c0cda198e66d1', '63a8fd6ea78c0cda198e66d3'],
      },
      barberId: '63ab004032a0f08ebc6d0421',
      __v: 0,
    },
    {
      _id: '63ac37003355a75be1f5df73',
      start: new Date('2023-01-06T15:50:05.158Z'),
      end: new Date('2023-01-06T18:50:05.158Z'),
      title: 'José + tia lucia: Corte de assas',
      allDay: false,
      resource: {
        services: ['63a8fd6ea78c0cda198e66d1', '63a8fd6ea78c0cda198e66d3'],
      },
      barberId: '63ab004032a0f08ebc6d0421',
      __v: 0,
    },
  ];

  // estilos do multiSelect
  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: '#ffffff',
      border: '2px solid #181b23',
      color: '#000000',
      height: '44px',
      minWidth: '120px',
      marginTop: '10px',
      ':hover': {
        borderColor: '#181b23',
      },
    }),
    option: (styles: any) => {
      return {
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        padding: '8px',
        ':hover': {
          backgroundColor: '#ffdd00',
        },
        fontSize: '16px',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '400',
        transition: '0.2s',
      };
    },
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: '#ffdd00',
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: '#000000',
      fontSize: '12px',
      fontWeight: 'normal',
      fontFamily: 'Roboto, sans-serif',
    }),
  };

  function handleSelectedServices(e: any) {
    console.log('%c⧭', 'color: #ffa280', e);
  }

  return (
    <Box padding={mobile ? '40px 20px 40px 20px' : '40px 60px 60px 60px'}>
      <Calendar
        messages={messages}
        culture="pt-BR"
        localizer={localizer}
        events={myEventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={(e) => handleShowEvent(e)}
      />
      <Styled.CalendarButtonAddEvent onClick={() => setShowModalAddEvent(true)}>
        Marcar horário
      </Styled.CalendarButtonAddEvent>

      {/* modal para adicionar um evento */}
      <Modal
        size={mobile ? 'xs' : 'xl'}
        isOpen={showModalAddEvent}
        onClose={() => setShowModalAddEvent(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <SectionTitle>Marcar horário</SectionTitle>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Label>
                Identificador
                <Input type="text" />
              </Label>
              <Box mt="20px">
                <Label>Serviço(s)</Label>
                <Select
                  options={serviceOptions}
                  isMulti
                  styles={colourStyles}
                  placeholder="Selecione"
                  onChange={(e) => handleSelectedServices(e)}
                />
              </Box>
              <Box>
                <Label>Data</Label>
              </Box>
              <DatePicker
                selected={startDate}
                locale="pt"
                onChange={(date: Date) => {
                  setStartDate(date);
                  console.log(startDate);
                }}
              />
            </form>
          </ModalBody>
          <Styled.ModalEventButtonFlex>
            <Styled.ModaEventButton onClick={() => setShowModalAddEvent(false)}>
              Fechar
            </Styled.ModaEventButton>
            <Styled.ModaEventButton>Deletar</Styled.ModaEventButton>
          </Styled.ModalEventButtonFlex>
        </ModalContent>
      </Modal>

      {/* modal para ver os detalhes de evento já marcado */}
      <Modal
        size={mobile ? 'xs' : 'md'}
        isOpen={showModalEvent}
        onClose={() => setShowModalEvent(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <SectionTitle>{dataToModalEvent?.title}</SectionTitle>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Conteúdo que vai vir do get pelo id, trazendo todas as informações
            desse serviço...
          </ModalBody>
          <Styled.ModalEventButtonFlex>
            <Styled.ModaEventButton onClick={() => setShowModalEvent(false)}>
              Fechar
            </Styled.ModaEventButton>
            <Styled.ModaEventButton>Deletar</Styled.ModaEventButton>
          </Styled.ModalEventButtonFlex>
        </ModalContent>
      </Modal>
    </Box>
  );
};
