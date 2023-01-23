import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CircularProgress,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Tag,
  Text,
  Toast,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import useMedia from 'hooks/useMedia';
import React, { CSSProperties } from 'react';
import { SectionTitle } from 'components/BarberRegister/BarberContact/style';
import * as Styled from './style';
import {
  CheckBox,
  CheckBoxFlex,
  ErrorMessage,
  FormInputs,
  Input,
  Label,
} from 'components/StyledComponents/Form/AdminInputs';
import Select, { StylesConfig } from 'react-select';
import { registerLocale } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import { parseISO, setHours, setMinutes } from 'date-fns';
import { http } from '../../../api/http';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
registerLocale('pt', pt);
import InputMask from 'react-input-mask';
import {
  regexpRemoveAllNoIsNumber,
  regexpToEmail,
  regexpCleanCelPhoneNumber,
} from 'helpers/Form/regexp';
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { useGetBarberServices } from 'components/BarberRegister/BarberServices/api/useGetServices';
import { useAddEvent } from './api/useNewEvent';
import SuccessModal from 'components/Modals/SuccessModal';
import { useGetALlEvents } from './api/useGetAllEvents';
import { useGetEvent } from './api/useGetEvent';
import { formatToCurrency } from 'helpers/Currency/formatCurrency';
import {
  errorDefaultToast,
  successDefaultToast,
} from 'helpers/Toast/Messages/Default';
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineCopy } from 'react-icons/ai';
import {
  erroCustomizableToast,
  successCustomizableToast,
} from 'helpers/Toast/Messages/Customizable';
import { useDeleteEvent } from './api/useDeleteEvent';
import { useGetCheckRegisterBarber } from 'components/BarberRegister/BarberContact/api/useGetCheckRegisterBarber';
import Link from 'next/link';

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

type Inputs = {
  name: string;
  allDay: boolean;
  cellphone: string;
  email: string;
  documentNumber: string;
};

interface dataModalEventPros {
  title: string;
  _id: string;
  calendar: {
    start: string | number;
    end: string;
  };
  payment: {
    paymentUrl: string;
    status: string;
  };
  services: Array<object>;
  customer: {
    name: string;
    email: string;
    phone: {
      areaCode: string;
      number: string;
    };
  };
}

interface serviceProps {
  value: string;
}

interface EventStatusProps {
  color: string;
  statusText: string;
}

export const CalendarComponent = () => {
  const mobile = useMedia('(max-width: 769px)');
  const mobileM = useMedia('(max-width: 380px)');
  const [showModalEvent, setShowModalEvent] = React.useState(false);
  const [dataToModalEvent, setDataToModalEvent] =
    React.useState<dataModalEventPros>();
  const [showModalAddEvent, setShowModalAddEvent] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const queryClient = useQueryClient();
  const [onlinePayment, setOnlinePayment] = React.useState('true');
  const [services, setServices] = React.useState([]);
  const [checkEmail, setCheckEmail] = React.useState(true);
  const [serviceAllDay, setServiceAllDay] = React.useState(false);
  const barberServices = useGetBarberServices();
  const [serviceOptions, setServiceOptions] = React.useState([]);
  const [showAlertCheckForm, setShowAlertCheckForm] = React.useState(false);
  const [requiredServiceInputMessage, setRequiredServiceInputMessage] =
    React.useState(false);
  const [allFormIsRequired, setAllFormIsRequired] = React.useState(true);
  const [addEventSuccess, setAddEventSuccessModal] = React.useState(false);
  const useNewEventMutation = useAddEvent();
  const useGetAllEventsMutation = useGetALlEvents();
  const useDeleteEventMutation = useDeleteEvent();
  // @ts-ignore
  // const useGetEventMutation = useGetEvent();
  const [allEvents, setAllEvents] = React.useState([]);
  const [selectedServicesTotalPrice, setSelectedServicesTotalPrice] =
    React.useState(0);
  const toast = useToast();
  const [eventStatus, setEventStatus] = React.useState<EventStatusProps | null>(
    null
  );
  const [showModalCanceledEvent, setShowModalCanceledEvent] =
    React.useState(false);
  const [eventToCanceled, setEventToCanceled] = React.useState<
    string | undefined
  >(undefined);
  const [showMessageRequiredRegister, setShowMessageRequiredRegister] =
    React.useState(true);
  const checkBarberIsRegister = useGetCheckRegisterBarber();

  function copyToClipboard(itemToCopy: string | undefined) {
    if (itemToCopy) {
      navigator.clipboard.writeText(itemToCopy).then(() => {
        toast({
          status: 'success',
          title: 'Copiado com sucesso!',
          description: 'Link copiado com sucesso para o clip board',
          ...successCustomizableToast,
        });

        // importante setar o toast pra false
      });
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let cleanServicesId = services.map((service: serviceProps) => {
      return service.value;
    });

    let phone = {};
    if (data.cellphone) {
      // quebrando o número numa array item[0] é o dd o item[1] é o número
      // em seguida limpando os caracteres especiais para mandar para o back
      let cellPhoneNumberSplit = data.cellphone?.split(' ');

      // verificando se não o typeScript fica reclamando
      //  montando o objeto phone (dd + numero)
      if (cellPhoneNumberSplit) {
        let areaCode = cellPhoneNumberSplit[0].replace(
          regexpCleanCelPhoneNumber,
          ''
        );

        let number = cellPhoneNumberSplit[1].replace(
          regexpCleanCelPhoneNumber,
          ''
        );

        phone = {
          areaCode,
          number,
        };
      }
    }

    let identification = {};
    if (data.documentNumber) {
      identification = {
        type: 'CPF',
        number: data.documentNumber.replace(regexpRemoveAllNoIsNumber, ''),
      };
    }

    if (services.length && startDate && startTime && endTime) {
      let event = {
        title: data.name,
        servicesId: cleanServicesId,
        calendar: {
          start: formattedDates(false),
          end: formattedDates(true),

          // por enquanto vai ser o nome, mas futuramente pode mudar
          title: data.name,
          allDay: data.allDay,
        },
        customer: {
          // por enquanto vai ser o nome, mas futuramente pode mudar
          name: data.name,
          phone,
          email: data.email,
          //   por hora vai ficar fixo cpf porém pode der outro documento para identificar o usuário futuramente
          identification,
        },
        hasPayment: onlinePayment === 'true',
      };

      useNewEventMutation.mutate(event);
    }
  };

  function checkServices() {
    if (!services.length) {
      setRequiredServiceInputMessage(true);
    }
  }

  // por enquanto o get by id está com axios mas devemos ajustar a config do react query para pa usar ele
  const [startDateEventById, setStartDateEventById] = React.useState<string>();
  const [endDateEventById, setEndDateEventById] = React.useState<string>();
  const [eventToDeleteId, setEventToDeleteId] = React.useState<string>();
  const [loadingModaEvent, setLoadingModaEvent] =
    React.useState<boolean>(false);
  async function getEventById(id: string) {
    const token = localStorage.getItem('token');
    setEventToDeleteId(id);

    await axios
      .get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/event/calendar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDataToModalEvent(response.data);
        setStartDateEventById(response.data.calendar.start);
        setEndDateEventById(response.data.calendar.end);
        if (response.data.payment) {
          defineStatusEvent(response.data.payment.status);
        }
      })
      .catch((err) => {
        toast({ status: 'error', ...errorDefaultToast });
      });
    setLoadingModaEvent(false);
  }

  function handleShowEvent(e: any) {
    //useGetEventMutation.refetch('1');
    setShowModalEvent(true);
    setLoadingModaEvent(true);
    getEventById(e._id);
  }

  function handleShowModalCanceledEvent() {
    setShowModalCanceledEvent(true);
    setEventToCanceled(dataToModalEvent?.title);
  }

  function handleCanceledEvent() {
    if (eventToDeleteId) {
      useDeleteEventMutation.mutate(eventToDeleteId);
    }
  }

  function defineStatusEvent(status: string) {
    switch (status) {
      case 'pending':
        setEventStatus({
          color: 'yellow',
          statusText: 'Pendente',
        });
        break;
      case 'paid':
        setEventStatus({
          color: 'green',
          statusText: 'Aprovado',
        });
        break;
      case 'canceled':
        setEventStatus({
          color: 'red',
          statusText: 'Cancelado',
        });
        break;
    }
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

  // estilos do multiSelect
  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: '#ffffff',
      border: '2px solid #181b23',
      color: '#000000',
      minHeight: '44px',
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

  function formattedDates(isEndDate: boolean) {
    // valores das data de inicio de um evento
    let startDateYear = startDate.getFullYear();
    let startDateMonth = startDate.getMonth() + 1;
    let startDateDay = startDate.getDate();

    // valores dos horários de um evento /  inicio
    let startTimeHours = startTime.getHours();
    let startTimeMinutes = startTime.getMinutes();

    // valores dos horários de um evento / fim
    let endTimeHours = endTime.getHours();
    let endTimeMinutes = endTime.getMinutes();

    // horário de entrada + data
    let mountedStartDate = `${startDateYear}-${startDateMonth}-${startDateDay} ${startTimeHours}:${
      startTimeMinutes !== 0 ? startTimeMinutes : '00'
    }:00`;

    // horário de saída + data
    // caso seja um evento que dure um dia inteiro ele vai cair no if e vai pegar a data do outro datePicker
    // se isso não ocorrer ele pega a data do mesmo dia
    let mountedEndDate;
    if (serviceAllDay) {
      // valores das data de inicio de um evento
      let endDateYear = endDate.getFullYear();
      let endDateMonth = endDate.getMonth() + 1;
      let endDateDay = endDate.getDate();

      mountedEndDate = `${endDateYear}-${endDateMonth}-${endDateDay} ${endTimeHours}:${
        endTimeMinutes !== 0 ? endTimeMinutes : '00'
      }:00`;
    } else {
      mountedEndDate = `${startDateYear}-${startDateMonth}-${startDateDay} ${endTimeHours}:${
        endTimeMinutes !== 0 ? endTimeMinutes : '00'
      }:00`;
    }

    // por padrão retorna a data
    if (isEndDate) {
      return mountedEndDate;
    } else {
      return mountedStartDate;
    }
  }

  function handleSelectedServices(e: any) {
    setServices(e);
  }

  function handleCheckEmail(e: any) {
    let regexp = regexpToEmail;
    let emailIsValid = regexp.test(e.target.value);

    if (emailIsValid) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  }

  function handleChangeCheckEmail() {
    if (!checkEmail) {
      setCheckEmail(true);
    }
  }

  function handleCloseSuccessModal() {
    setAddEventSuccessModal(false);
    setShowModalAddEvent(false);
  }

  function resetModalValues() {
    setValue('name', '');
    setValue('cellphone', '');
    setValue('email', '');
    setValue('documentNumber', '');
    setOnlinePayment('true');
    setServices([]);
  }

  interface ServiceOptionsProps {
    name: string;
    _id: string;
    price: number;
  }

  // pegando as options de serviços
  React.useEffect(() => {
    if (barberServices.isSuccess) {
      let formattedServices = barberServices.data.map(
        (service: ServiceOptionsProps) => {
          return {
            label: service.name,
            value: service._id,
            price: service.price,
          };
        }
      );

      setServiceOptions(formattedServices);
    }
  }, [barberServices.isSuccess, barberServices.data]);

  // na adição de um novo evento - sucesso
  React.useEffect(() => {
    if (useNewEventMutation.isSuccess) {
      setAddEventSuccessModal(true);
    }
  }, [useNewEventMutation.isSuccess]);

  // na adição de um novo evento - erro
  React.useEffect(() => {
    if (useNewEventMutation.isError) {
      toast({ status: 'error', ...errorDefaultToast });
    }
  }, [useNewEventMutation.isError, toast]);

  // efeito para verificar os campos que não são required
  React.useEffect(() => {
    if (onlinePayment === 'true') {
      setAllFormIsRequired(true);
    } else {
      setAllFormIsRequired(false);
    }
  }, [onlinePayment]);

  // pegando os eventos marcados
  interface CalendarOptionsProps {
    start: string;
    end: string;
  }

  // preenchendo a array de options do calendar
  React.useEffect(() => {
    if (useGetAllEventsMutation.isSuccess) {
      const events = useGetAllEventsMutation.data.map(
        ({ start, end, ...rest }: CalendarOptionsProps) => {
          return {
            start: new Date(Date.parse(start)),
            end: new Date(Date.parse(end)),
            ...rest,
          };
        }
      );
      setAllEvents(events);
    }
  }, [useGetAllEventsMutation.isSuccess, useGetAllEventsMutation.data]);

  // verificando quando o get dos eventos der erro
  // deu erro 400 quer dizer que não fez o cadastro da barbearia então alert de aviso para  completar o cadastro
  // qualquer outro erro, vai dar o toast padrão
  React.useEffect(() => {
    if (
      useGetAllEventsMutation.isError &&
      // @ts-ignore
      useGetAllEventsMutation.error.response.status === 400
    ) {
      toast({
        status: 'warning',
        title: 'Ops! Você não concluiu o cadastro da sua barbearia',
        description:
          'Para visualizar os seus agendamentos, marcar um evento, complete o cadastro da sua barbearia',
        ...erroCustomizableToast,
      });
    } else if (useGetAllEventsMutation.isError) {
      toast({ status: 'error', ...errorDefaultToast });
    }
  }, [useGetAllEventsMutation.isError, toast, showMessageRequiredRegister]);

  // efeito para somar os valores total dos serviços escolhidos
  React.useEffect(() => {
    if (services.length) {
      let servicesSelectedValues = services.map(
        (service: ServiceOptionsProps) => {
          return service.price;
        }
      );

      const totalSum: number = servicesSelectedValues.reduce((sum, i) => {
        return sum + i;
      });

      let formattedToTalSum = Number(totalSum.toFixed(2));

      setSelectedServicesTotalPrice(formattedToTalSum);
    } else {
      setSelectedServicesTotalPrice(0);
    }
  }, [services, selectedServicesTotalPrice]);

  // efeito para deletar um event
  React.useEffect(() => {
    if (useDeleteEventMutation.isSuccess) {
      toast({ status: 'success', ...successDefaultToast });
      setShowModalCanceledEvent(false);
      setShowModalEvent(false);
    }
  }, [useDeleteEventMutation.isSuccess, toast]);

  // verificando se a babearia já possui um cadastro feito para marcar um evento
  React.useEffect(() => {
    if (checkBarberIsRegister.isError) {
      // @ts-ignore
      if (checkBarberIsRegister.error.response.status === 403) {
        setShowMessageRequiredRegister(true);
      } else {
        setShowMessageRequiredRegister(false);
        toast({ status: 'error', ...errorDefaultToast });
      }
    }
  }, [checkBarberIsRegister.isError, checkBarberIsRegister.error, toast]);

  React.useEffect(() => {
    if (checkBarberIsRegister.isSuccess) {
      setShowMessageRequiredRegister(false);
    }
  }, [checkBarberIsRegister.isSuccess]);

  return (
    <>
      {useGetAllEventsMutation.isLoading ? (
        <Grid placeItems="center" mt="60px">
          <CircularProgress
            isIndeterminate
            color="#ffdd00"
            size="24"
            thickness="3px"
          />
        </Grid>
      ) : (
        <Box padding={mobile ? '40px 20px 40px 20px' : '40px 60px 60px 60px'}>
          {/* big calendar */}
          <Box>
            <SectionTitle>Marcar horário?</SectionTitle>
            {showMessageRequiredRegister && (
              <Box mt="10px">
                <Alert status="warning">
                  <AlertIcon />
                  <Text
                    fontFamily="Roboto, sans-serif"
                    fontSize="16px"
                    lineHeight="1.4"
                    color="#000000"
                    fontWeight="bold"
                  >
                    Para conseguir fazer um agendamento, primeiro você precisa
                    fazer o cadastro da sua barbearia, clique no link abaixo,
                    para finalizar seu cadastro.
                    <Text color="#000000" textDecoration="underline">
                      <Link href="/profile">Finalizar cadastro</Link>
                    </Text>
                  </Text>
                </Alert>
              </Box>
            )}
            <Styled.CalendarButtonAddEvent
              disabled={showMessageRequiredRegister}
              onClick={() => {
                setShowModalAddEvent(true);
                resetModalValues();
                setAddEventSuccessModal(false);
              }}
            >
              Marcar horário
            </Styled.CalendarButtonAddEvent>
          </Box>
          <Box>
            <Box mb="16px">
              <SectionTitle>Seus agendamentos</SectionTitle>
              <Styled.HelpEventText>
                <FaExclamationTriangle color="#ffdd00" size="16px" />
                Clique em qualquer agendamento, para abrir as informações desse
                evento.
              </Styled.HelpEventText>
            </Box>
            <Calendar
              messages={messages}
              culture="pt-BR"
              localizer={localizer}
              events={allEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              onSelectEvent={(e) => handleShowEvent(e)}
            />
          </Box>
          {/* modal para adicionar um evento */}
          <Modal
            size={(mobile && !mobileM && 'sm') || (mobileM && 'xs') || '4xl'}
            isOpen={showModalAddEvent}
            onClose={() => setShowModalAddEvent(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <SectionTitle>Marcar horário</SectionTitle>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)} onClick={() => {}}>
                  <Styled.AddEventFormGrid>
                    {/* items que no futuro serão todos obrigatórios */}
                    <div>
                      <Stat
                        border="1px"
                        borderColor="#cccccc"
                        borderRadius="4px"
                        padding="8px"
                      >
                        <StatLabel>Total dos serviços (R$)</StatLabel>
                        <StatNumber>
                          {formatToCurrency(selectedServicesTotalPrice)}
                        </StatNumber>
                      </Stat>
                      <Box mt="20px">
                        <Label>O pagamento será feito de forma online?</Label>
                        <RadioGroup
                          mt="12px"
                          onChange={setOnlinePayment}
                          value={onlinePayment}
                        >
                          <Stack direction="row">
                            <Radio value="true">
                              <Text
                                fontSize="16px"
                                fontWeight="normal"
                                color="#000000"
                                fontFamily="Roboto, sans-serif"
                              >
                                Sim
                              </Text>
                            </Radio>
                            <Radio value="false">
                              <Text
                                fontSize="16px"
                                fontWeight="normal"
                                color="#000000"
                                fontFamily="Roboto, sans-serif"
                              >
                                Não
                              </Text>
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </Box>
                      <Box mt="20px">
                        <Label>
                          Nome do cliente *
                          <Input
                            type="text"
                            {...register('name', { required: true })}
                          />
                          {errors.name && (
                            <ErrorMessage>
                              <FaExclamationTriangle />
                              This field is required
                            </ErrorMessage>
                          )}
                        </Label>
                      </Box>
                      <Box
                        mt="20px"
                        onClick={() => setRequiredServiceInputMessage(false)}
                      >
                        <Label>Serviço(s) *</Label>
                        <Select
                          options={serviceOptions}
                          isMulti
                          styles={colourStyles}
                          placeholder="Selecione"
                          onChange={(e) => handleSelectedServices(e)}
                        />
                        {requiredServiceInputMessage && (
                          <ErrorMessage>
                            <FaExclamationTriangle />
                            This field is required
                          </ErrorMessage>
                        )}
                      </Box>
                      <Box mt="20px">
                        <Label>
                          {serviceAllDay ? 'Data de inicio' : 'Data'} *
                        </Label>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={startDate}
                          locale="pt"
                          onChange={(date: Date) => {
                            setStartDate(date);
                          }}
                        />
                      </Box>
                      {serviceAllDay && (
                        <Styled.AnimeBox>
                          <Box mt="20px">
                            <Label>Data final*</Label>
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              selected={endDate}
                              locale="pt"
                              onChange={(date: Date) => {
                                setEndDate(date);
                              }}
                            />
                          </Box>
                        </Styled.AnimeBox>
                      )}
                      <Box>
                        <CheckBoxFlex>
                          <CheckBox
                            type="checkbox"
                            {...register('allDay')}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setServiceAllDay(!serviceAllDay);
                            }}
                          />
                          <p>Esse atendimento vai durar mais quem um dia?</p>
                        </CheckBoxFlex>
                      </Box>
                      <Styled.AddEventFLexItems>
                        <Box mt="20px">
                          <Label>Horário inicial *</Label>
                          <DatePicker
                            selected={startTime}
                            onChange={(date: Date) => setStartTime(date)}
                            timeFormat="HH:mm"
                            showTimeSelect
                            showTimeSelectOnly
                            dateFormat="HH:mm"
                          />
                        </Box>
                        <Box mt="20px">
                          <Label>Horário final *</Label>
                          <DatePicker
                            selected={endTime}
                            onChange={(date: Date) => setEndTime(date)}
                            timeFormat="HH:mm"
                            showTimeSelect
                            showTimeSelectOnly
                            dateFormat="HH:mm"
                          />
                        </Box>
                      </Styled.AddEventFLexItems>
                    </div>
                    {/* items que não serão obrigatórios */}
                    <div>
                      <Box mt="20px">
                        <FormInputs>
                          <label id="mask">
                            Celular {allFormIsRequired && '*'}
                            <InputMask
                              className="mask"
                              mask={'(99) 99999-9999'}
                              alwaysShowMask={false}
                              type={'tel'}
                              placeholder="(99) 99999-9999"
                              {...register('cellphone', {
                                required: allFormIsRequired,
                              })}
                            />
                            {allFormIsRequired && errors.cellphone && (
                              <ErrorMessage>
                                <FaExclamationTriangle />
                                This field is required
                              </ErrorMessage>
                            )}
                          </label>
                        </FormInputs>
                      </Box>
                      <Box mt="20px">
                        <Label
                          onBlur={(e) => handleCheckEmail(e)}
                          onChange={handleChangeCheckEmail}
                        >
                          Email {allFormIsRequired && '*'}
                          <Input
                            type="email"
                            {...register('email', {
                              required: allFormIsRequired,
                            })}
                          />
                          {allFormIsRequired && errors.email && (
                            <ErrorMessage>
                              <FaExclamationTriangle />
                              This field is required
                            </ErrorMessage>
                          )}
                          {!checkEmail && (
                            <ErrorMessage>
                              <FaExclamationTriangle />
                              Este formato de email não é válido
                            </ErrorMessage>
                          )}
                        </Label>
                      </Box>
                      <Box mt="20px">
                        <FormInputs>
                          <label id="mask">
                            Cpf {allFormIsRequired && '*'}
                            <InputMask
                              className="mask"
                              mask={'999.999.999-99'}
                              alwaysShowMask={false}
                              type={'text'}
                              placeholder="000.000.000-00"
                              {...register('documentNumber', {
                                required: allFormIsRequired,
                              })}
                            />
                            {allFormIsRequired && errors.documentNumber && (
                              <ErrorMessage>
                                <FaExclamationTriangle />
                                This field is required
                              </ErrorMessage>
                            )}
                          </label>
                        </FormInputs>
                      </Box>
                    </div>
                  </Styled.AddEventFormGrid>
                  {allFormIsRequired}
                  <Alert status="warning" mt="10px">
                    <AlertIcon />
                    <Styled.HelpRequiredInputText>
                      {allFormIsRequired
                        ? 'Preencha todos os campos acima para adicionar um evento.'
                        : 'Somente os campos com anterísticos são necessários para criar este evento'}
                    </Styled.HelpRequiredInputText>
                  </Alert>
                  <Styled.ModalEventButtonFlex>
                    <Styled.ModaEventButton
                      outline={true}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModalAddEvent(false);
                      }}
                    >
                      Fechar
                    </Styled.ModaEventButton>
                    <Styled.ModaEventButton
                      type="submit"
                      outline={false}
                      disabled={useNewEventMutation.isLoading}
                      onClick={() => {
                        checkServices();
                      }}
                    >
                      {useNewEventMutation.isLoading ? (
                        <Spinner color="#181b23" />
                      ) : (
                        'Marcar'
                      )}
                    </Styled.ModaEventButton>
                  </Styled.ModalEventButtonFlex>
                </form>
                <SuccessModal
                  open={addEventSuccess}
                  modalTitle="Evento marcado com sucesso"
                  modalMensagem="Seu evento foi marcado com sucesso e já está na sua agenda"
                  showButtonClose={false}
                  showActionButton={true}
                  actionButtonText="Fechar"
                  actionButtonMethod={handleCloseSuccessModal}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Modal
            size={mobile ? 'xs' : '3xl'}
            isOpen={showModalEvent}
            onClose={() => setShowModalEvent(false)}
            isCentered
          >
            <ModalOverlay />
            {loadingModaEvent ? (
              <ModalContent>
                <ModalHeader>
                  <SectionTitle>Carregando evento...</SectionTitle>
                </ModalHeader>
                <ModalCloseButton />
                <Grid placeItems="center" pb="20px">
                  <CircularProgress
                    isIndeterminate
                    color="#ffdd00"
                    size="20"
                    thickness="3px"
                  />
                </Grid>
              </ModalContent>
            ) : (
              <ModalContent>
                <ModalHeader>
                  <SectionTitle>{dataToModalEvent?.title}</SectionTitle>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {/* seção de info de pagamento */}
                  <Box>
                    <Styled.EventModalSectionTitle>
                      <Flex
                        gap="8px"
                        alignItems="center"
                        flexWrap={mobile ? 'wrap' : 'nowrap'}
                      >
                        Informações de pagamento:
                        {dataToModalEvent?.payment ? (
                          <Tag colorScheme="red">{eventStatus?.statusText}</Tag>
                        ) : (
                          <Tag colorScheme="green">Pagar no local</Tag>
                        )}
                      </Flex>
                    </Styled.EventModalSectionTitle>
                    {dataToModalEvent?.payment && (
                      <Styled.EventModalLabel>
                        <span className="flex">
                          Link de pagamento{' '}
                          <BsArrowRight color="#181b23" size="16" />
                        </span>
                        <span className="link">
                          <Link
                            data-copy="paymentUrl"
                            target="_blank"
                            href={dataToModalEvent?.payment.paymentUrl}
                          >
                            {dataToModalEvent?.payment.paymentUrl.substring(
                              0,
                              40
                            )}
                            ...
                          </Link>
                          <AiOutlineCopy
                            onClick={() =>
                              copyToClipboard(
                                dataToModalEvent?.payment.paymentUrl
                              )
                            }
                          />
                        </span>
                      </Styled.EventModalLabel>
                    )}
                  </Box>
                  {/* seção dos horários */}
                  <Box mt="40px">
                    <Styled.EventModalSectionTitle>
                      Horários:
                    </Styled.EventModalSectionTitle>
                    <Styled.EventModalLabel>
                      <span className="flex">Horário de entrada:</span>
                      <span>
                        {startDateEventById &&
                          format(
                            parseISO(startDateEventById),
                            'dd/MM/yyyy HH:mm'
                          )}
                      </span>
                    </Styled.EventModalLabel>
                    <Styled.EventModalLabel>
                      <span className="flex">Horário de saída:</span>
                      <span>
                        {endDateEventById &&
                          format(
                            parseISO(endDateEventById),
                            'dd/MM/yyyy HH:mm',
                            {
                              locale: ptBR,
                            }
                          )}
                      </span>
                    </Styled.EventModalLabel>
                  </Box>
                  {/* seção dos serviços */}
                  <Box mt="40px">
                    <Styled.EventModalSectionTitle>
                      Serviços escolhidos:
                    </Styled.EventModalSectionTitle>
                    <Styled.EventModalServicesList>
                      {dataToModalEvent?.services.map(
                        // @ts-ignore
                        (service: ServiceOptionsProps, i) => {
                          return (
                            <li key={i}>
                              <span className="serviceName">
                                {service.name}
                              </span>
                              <span className="servicePrice">
                                {formatToCurrency(service.price)}
                              </span>
                            </li>
                          );
                        }
                      )}
                    </Styled.EventModalServicesList>
                  </Box>
                  {/* info do cliente */}
                  <Box mt="40px" pb="20px">
                    <Styled.EventModalSectionTitle>
                      Informações do cliente:
                    </Styled.EventModalSectionTitle>
                    <Styled.EventModalLabel>
                      <span className="flex">Nome:</span>
                      <span>{dataToModalEvent?.customer.name}</span>
                    </Styled.EventModalLabel>
                    {dataToModalEvent?.customer.email && (
                      <Styled.EventModalLabel>
                        <span className="flex">Email:</span>
                        <span>{dataToModalEvent?.customer.email}</span>
                      </Styled.EventModalLabel>
                    )}
                    {dataToModalEvent?.customer.phone && (
                      <Styled.EventModalLabel>
                        <span className="flex">Celular:</span>
                        <span>{`(${
                          dataToModalEvent?.customer.phone.areaCode
                        }) ${dataToModalEvent?.customer.phone.number.substring(
                          0,
                          5
                        )}-${dataToModalEvent?.customer.phone.number.substring(
                          5,
                          9
                        )}`}</span>
                      </Styled.EventModalLabel>
                    )}
                  </Box>
                  {/* cancelar agendamento */}
                  <Box pb="20px">
                    <Styled.EventModalSectionTitle beforeColor={'#d00000'}>
                      Cancelar agendamento?
                    </Styled.EventModalSectionTitle>
                    <Styled.ModalEventButtonCanceledEvent
                      onClick={(e) => handleShowModalCanceledEvent()}
                    >
                      Cancelar
                    </Styled.ModalEventButtonCanceledEvent>
                  </Box>
                </ModalBody>
              </ModalContent>
            )}
          </Modal>
          {/* modal para cancelar um evento */}
          <Modal
            size={mobile ? 'xs' : 'lg'}
            isOpen={showModalCanceledEvent}
            onClose={() => setShowModalCanceledEvent(false)}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <SectionTitle>Cancelar evento</SectionTitle>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Styled.ModalCanceledEventText>
                  tem certeza que deseja cancelar o event{' '}
                  <span className="event">{`${eventToCanceled}?`}</span> Essa
                  ação, ira remover o evento da sua agenda
                </Styled.ModalCanceledEventText>
                <Flex justifyContent="center" gap="20px" mt="20px" pb="20px">
                  <Styled.ModalEventButtonCanceledEvent
                    onClick={(e) => setShowModalCanceledEvent(false)}
                    flex={true}
                    outline={true}
                  >
                    Fechar
                  </Styled.ModalEventButtonCanceledEvent>
                  <Styled.ModalEventButtonCanceledEvent
                    onClick={(e) => handleCanceledEvent()}
                    disabled={useDeleteEventMutation.isLoading}
                  >
                    {useDeleteEventMutation.isLoading ? (
                      <Spinner color="#181b23" />
                    ) : (
                      'Cancelar'
                    )}
                  </Styled.ModalEventButtonCanceledEvent>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
};
