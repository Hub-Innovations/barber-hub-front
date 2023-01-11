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
  Text,
  useDisclosure,
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
import { setHours, setMinutes } from 'date-fns';
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
import { FaExclamationTriangle } from 'react-icons/fa';
import { useGetBarberServices } from 'components/BarberRegister/BarberServices/api/useGetServices';
import { useAddEvent } from './api/useNewEvent';
import ToastALert from 'components/Alerts/ToastAlert';
import SuccessModal from 'components/Modals/SuccessModal';
import { useGetALlEvents } from './api/useGetAllEvents';

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
}

interface serviceProps {
  value: string;
}

interface ToastProps {
  title?: string;
  message?: string;
  status: 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;
}

// tem que ser um state pois as options vai vir do back

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
  const [showToast, setShowToast] = React.useState(false);
  const [toast, setToast] = React.useState<ToastProps>({
    status: 'error',
  });
  const [showAlertCheckForm, setShowAlertCheckForm] = React.useState(false);
  const [requiredServiceInputMessage, setRequiredServiceInputMessage] =
    React.useState(false);
  const [allFormIsRequired, setAllFormIsRequired] = React.useState(true);
  const [addEventSuccess, setAddEventSuccessModal] = React.useState(false);
  const useNewEventMutation = useAddEvent();
  const useGetAllEventsMutation = useGetALlEvents();
  const [allEvents, setAllEvents] = React.useState([]);

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

  function handleShowEvent(e: any) {
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
    queryClient.invalidateQueries({ queryKey: ['getEvents'] });
  }

  function resetModalValues() {
    setValue('name', '');
    setValue('cellphone', '');
    setValue('email', '');
    setValue('documentNumber', '');
    setOnlinePayment('true');
  }

  interface ServiceOptionsProps {
    name: string;
    _id: string;
  }

  // pegando as options de serviços
  React.useEffect(() => {
    if (barberServices.isSuccess) {
      let formattedServices = barberServices.data.map(
        (service: ServiceOptionsProps) => {
          return {
            label: service.name,
            value: service._id,
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
      setShowToast(true);
      setToast({
        title: 'default',
        status: 'error',
        message: 'default',
      });
    }
  }, [useNewEventMutation.isError]);

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
  React.useEffect(() => {
    setShowToast(true);
    setToast({
      title: 'default',
      status: 'error',
      message: 'default',
    });
  }, [useGetAllEventsMutation.isError]);

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
          <Calendar
            messages={messages}
            culture="pt-BR"
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
          />
          <Styled.CalendarButtonAddEvent
            onClick={() => {
              setShowModalAddEvent(true);
              resetModalValues();
              setShowToast(false);
              setAddEventSuccessModal(false);
            }}
          >
            Marcar horário
          </Styled.CalendarButtonAddEvent>

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
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  onClick={() => {
                    setShowToast(false);
                  }}
                >
                  <Styled.AddEventFormGrid>
                    {/* items que no futuro serão todos obrigatórios */}
                    <div>
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
                {showToast && (
                  <ToastALert
                    toastStatus={toast.status}
                    messageText={toast.message}
                    messageTitle={toast.title}
                  />
                )}
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
                Conteúdo que vai vir do get pelo id, trazendo todas as
                informações desse serviço...
              </ModalBody>
              <Styled.ModalEventButtonFlex>
                <Styled.ModaEventButton
                  onClick={() => setShowModalEvent(false)}
                >
                  Fechar
                </Styled.ModaEventButton>
                <Styled.ModaEventButton>Deletar</Styled.ModaEventButton>
              </Styled.ModalEventButtonFlex>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
};
