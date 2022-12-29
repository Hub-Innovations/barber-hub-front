import {
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Grid,
  Box,
  Flex,
  Spinner,
  CircularProgress,
} from '@chakra-ui/react';
import { formatToCurrency } from 'helpers/Currency/formatCurrency';
import React, { useReducer } from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import * as Styled from './style';
import * as BarberGeneralServices from '../style';
import { http } from '../../../../api/http';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import {
  ErrorMessage,
  FormInputs,
  Input,
  Label,
} from 'components/StyledComponents/Form/AdminInputs';
import { FaExclamationTriangle } from 'react-icons/fa';
import { CurrencyInput, Currencies, Locales } from 'input-currency-react';
import CurrencyFormat from 'react-currency-format';
import ToastALert from 'components/Alerts/ToastAlert';

type Inputs = {
  price?: number | string;
  name: string;
};

const getBarberServices = async () => {
  const token = localStorage.getItem('token');

  const { data } = await http.get('/barberservice', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const addService = async (data: any) => {
  const token = localStorage.getItem('token');

  const { data: response } = await http.put('/barberservice', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

interface ToastProps {
  title?: string;
  message?: string;
  status: 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;
}

interface ServicesProps {
  barberId?: string;
  name?: string;
  price?: number;
  _id?: string;
}

function BarberRegisterServices() {
  const getBarberServicesItems = useQuery('getBarber', getBarberServices);
  const [isOpenBarberServicesModal, setIsOpenBarberServicesModal] =
    React.useState(false);
  const [checkForm, setCheckForm] = React.useState(true);
  const [price, setPrice] = React.useState(0.0);
  const [editService, setEditService] = React.useState<Boolean>(false);
  const [serviceToEdit, setServiceToEdit] = React.useState<Object | null>(null);
  const queryClient = useQueryClient();
  const [showToast, setShowToast] = React.useState(false);
  const [toast, setToast] = React.useState<ToastProps>({
    status: 'error',
  });
  const [deleteServiceModal, setDeleteServiceModal] = React.useState(false);
  const [serviceDelete, setServiceDelete] = React.useState(false);
  const [serviceToDelete, setServiceToDelete] =
    React.useState<ServicesProps | null>(null);

  // para colocar o toast sempre pra false e não chamar duas vezes quando invalidar um query
  React.useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 100);
  }, [showToast]);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  function handleCloseModalService() {
    setIsOpenBarberServicesModal(false);
  }

  const { mutate, isLoading } = useMutation(addService, {
    onSuccess: (data) => {
      console.log('%c⧭', 'color: #7f7700', 'chamei no delete');
      setShowToast(true);
      setToast({
        title: 'default',
        status: 'success',
        message: 'default',
      });
      setIsOpenBarberServicesModal(false);
      setDeleteServiceModal(false);
      queryClient.invalidateQueries('getBarber');
    },
    onError: (err: any) => {
      setShowToast(true);
      setToast({
        title: 'default',
        status: 'error',
        message: 'default',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!serviceDelete) {
      if (data.name && data.price) {
        setCheckForm(true);
        let barberService;

        if (!editService) {
          barberService = [
            ...getBarberServicesItems.data,
            {
              price: data.price,
              name: data.name,
            },
          ];
        }

        if (editService) {
          if (serviceToEdit) {
            // pega o index do item para editar
            // limpa a array para enviar pro back
            // clone a array original
            // edita exatamente na posição index

            let indexServiceToEdit =
              getBarberServicesItems.data.indexOf(serviceToEdit);

            let newArrayService = getBarberServicesItems.data.map(
              (item: any) => {
                return {
                  name: item.name,
                  price: item.price,
                };
              }
            );

            newArrayService[indexServiceToEdit] = {
              name: data.name,
              price: data.price,
            };

            barberService = newArrayService;
          }
        }

        mutate({
          barberService,
        });
      } else {
        setCheckForm(false);
      }
    }

    if (serviceDelete) {
      let barberService;

      let indexServiceToDelete =
        getBarberServicesItems.data.indexOf(serviceToDelete);

      let newArrayService = getBarberServicesItems.data.map((item: any) => {
        return {
          name: item.name,
          price: item.price,
        };
      });

      newArrayService.splice(indexServiceToDelete, 1);

      barberService = newArrayService;

      mutate({
        barberService,
      });
    }
  };

  function handleChangeValue(e: any) {
    setValue('price', e.floatValue);
  }

  // sempre zerar os estados de edit para não chamar o dialog com os dados
  function resetServicesEdit() {
    setEditService(false);
    setServiceToEdit(null);
    setValue('name', '');
    setValue('price', 0.0);
    setPrice(0.0);
  }

  function handleEditService(service: any) {
    resetServiceDelete();
    setEditService(true);
    setServiceToEdit(service);
    setValue('name', service.name);
    setValue('price', service.price);
    setPrice(service.price);
    setIsOpenBarberServicesModal(true);
  }

  function handleCloseDeleteServiceModal() {
    setDeleteServiceModal(false);
  }

  function resetServiceDelete() {
    if (serviceDelete) {
      setServiceDelete(false);
      setServiceToDelete(null);
    }
  }

  function handleDeleteService(service: any) {
    setDeleteServiceModal(true);
    setServiceDelete(true);
    setServiceToDelete(service);
  }

  function defineModalButtonText() {
    let text = 'Adicionar';

    if (editService) {
      text = 'Editar';
    }

    return text;
  }

  return (
    <>
      {getBarberServicesItems.status === 'loading' && (
        <Grid placeItems="center" mt="60px">
          <CircularProgress
            isIndeterminate
            color="#ffdd00"
            size="24"
            thickness="3px"
          />
        </Grid>
      )}
      {getBarberServicesItems.status !== 'loading' && (
        <>
          {getBarberServicesItems.data &&
            getBarberServicesItems.data.length > 0 && (
              <Box mt="40px">
                <TableContainer>
                  <Table variant="simple">
                    <TableCaption>
                      Serviços e preços da sua barbearia
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>
                          <Styled.TableTitleHead>Preço</Styled.TableTitleHead>
                        </Th>
                        <Th>
                          <Styled.TableTitleHead>Serviço</Styled.TableTitleHead>
                        </Th>
                        <Th isNumeric>
                          <Styled.TableTitleHead>Editar</Styled.TableTitleHead>
                        </Th>
                        <Th isNumeric>
                          <Styled.TableTitleHead>Deletar</Styled.TableTitleHead>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {getBarberServicesItems.data.map(
                        (item: any, i: number) => {
                          return (
                            <Tr key={i}>
                              <Td>{formatToCurrency(item.price)}</Td>
                              <Td>{item.name}</Td>
                              <Td isNumeric>
                                <Styled.TableSvg>
                                  <BsFillPencilFill
                                    onClick={() => handleEditService(item)}
                                    size="20"
                                    cursor="pointer"
                                    color="#023e8a"
                                  />
                                </Styled.TableSvg>
                              </Td>
                              <Td isNumeric>
                                <Styled.TableSvg>
                                  <BsFillTrashFill
                                    size="20"
                                    cursor="pointer"
                                    color="#d00000"
                                    onClick={() => handleDeleteService(item)}
                                  />
                                </Styled.TableSvg>
                              </Td>
                            </Tr>
                          );
                        }
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Styled.AddServiceButton
                  onClick={() => {
                    setIsOpenBarberServicesModal(true);
                    setEditService(false);
                    resetServicesEdit();
                    resetServiceDelete();
                  }}
                >
                  <GrAdd size="20" color="#000000" />
                </Styled.AddServiceButton>
              </Box>
            )}

          {getBarberServicesItems.data &&
            getBarberServicesItems.data.length === 0 && (
              <Box mt="60px">
                <Alert status="info">
                  <AlertIcon />
                  Você ainda não possui serviços adicionados ao cadastro, da sua
                  barbearia, que tal adicionar ums serviço, para melhorar a
                  visibilidade da sua barbearia entre os clientes!!
                </Alert>
                <Styled.AddFirstItemButton
                  onClick={() => {
                    setIsOpenBarberServicesModal(true);
                    resetServiceDelete();
                    resetServicesEdit();
                  }}
                >
                  Adicionar serviço
                </Styled.AddFirstItemButton>
                <Styled.AddFirstItemTitleCallBack>
                  Clique no botão para adicionar um serviço!!
                </Styled.AddFirstItemTitleCallBack>
              </Box>
            )}
          <Modal
            onClose={handleCloseModalService}
            isOpen={isOpenBarberServicesModal}
            isCentered
            size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Grid placeItems="center" mt="24px" gap="12px">
                  <BarberGeneralServices.SectionTitle>
                    {editService ? 'Editar serviços' : 'Adicionar serviços'}
                  </BarberGeneralServices.SectionTitle>
                  <Styled.ModalServiceSubTitle>
                    {editService
                      ? 'Preenche os campos abaixo para editar'
                      : 'Preenche os campos abaixo para adicionar'}
                  </Styled.ModalServiceSubTitle>
                </Grid>
              </ModalHeader>
              <ModalCloseButton />
              <form
                onSubmit={handleSubmit(onSubmit)}
                onClick={() => {
                  setCheckForm(true);
                  setShowToast(false);
                }}
              >
                <ModalBody>
                  <Grid gridTemplateColumns="140px 1fr" gap="20px">
                    <Label>
                      Valor:
                      <FormInputs>
                        <CurrencyFormat
                          value={price}
                          thousandSeparator={true}
                          prefix={'R$'}
                          onValueChange={(e: any) => handleChangeValue(e)}
                        />
                      </FormInputs>
                    </Label>
                    <Label>
                      Serviço:
                      <Input
                        type="text"
                        placeholder="corte navalhado"
                        {...register('name')}
                      />
                    </Label>
                  </Grid>
                  {!checkForm && (
                    <ErrorMessage>
                      <FaExclamationTriangle color="#d00000" />
                      Os campos acima são obrigatórios
                    </ErrorMessage>
                  )}
                </ModalBody>
                <Flex justifyContent="center" gap="40px" pb="20px">
                  <BarberGeneralServices.ModalButton
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpenBarberServicesModal(false);
                    }}
                  >
                    Fechar
                  </BarberGeneralServices.ModalButton>
                  <BarberGeneralServices.ModalButton disabled={isLoading}>
                    {isLoading ? (
                      <Spinner color="#181b23" />
                    ) : (
                      defineModalButtonText()
                    )}
                  </BarberGeneralServices.ModalButton>
                </Flex>
              </form>
            </ModalContent>
          </Modal>
          <Modal
            onClose={handleCloseDeleteServiceModal}
            isOpen={deleteServiceModal}
            isCentered
            size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Grid placeItems="center" mt="24px" gap="12px">
                  <BarberGeneralServices.SectionTitle>
                    Tem certeza que deseja deletar esse o serviço:{' '}
                    {serviceToDelete ? serviceToDelete.name : ''}?
                  </BarberGeneralServices.SectionTitle>
                </Grid>
              </ModalHeader>
              <ModalCloseButton />
              <form
                onSubmit={handleSubmit(onSubmit)}
                onClick={() => {
                  setShowToast(false);
                }}
              >
                <Flex justifyContent="center" gap="40px" pb="20px">
                  <BarberGeneralServices.ModalButton
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteServiceModal(false);
                    }}
                  >
                    Cancelar
                  </BarberGeneralServices.ModalButton>
                  <BarberGeneralServices.ModalButton disabled={isLoading}>
                    {isLoading ? <Spinner color="#181b23" /> : 'Deletar'}
                  </BarberGeneralServices.ModalButton>
                </Flex>
              </form>
            </ModalContent>
          </Modal>
        </>
      )}
      {showToast && (
        <ToastALert
          toastStatus={toast.status}
          messageText={toast.message}
          messageTitle={toast.title}
        />
      )}
    </>
  );
}

export default BarberRegisterServices;
