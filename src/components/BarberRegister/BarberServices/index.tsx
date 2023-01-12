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
  Text,
  useToast,
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
import useMedia from 'hooks/useMedia';
import { useAddService } from './api/usePostServices';
import { useDeleteService } from './api/useDeleteService';
import { useUpdateService } from './api/useUpdateService';
import { useGetBarberServices } from './api/useGetServices';
import {
  errorDefaultToast,
  successDefaultToast,
} from 'helpers/Toast/Messages/Default';
import CurrencyInput from 'react-currency-input-field';

type Inputs = {
  price?: number | string;
  name: string;
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
  _id: string;
}

function BarberRegisterServices() {
  const getBarberServicesItems = useGetBarberServices();
  const [isOpenBarberServicesModal, setIsOpenBarberServicesModal] =
    React.useState(false);
  const [checkForm, setCheckForm] = React.useState(true);
  const [price, setPrice] = React.useState(0.0);
  const [editService, setEditService] = React.useState<Boolean>(false);
  const [serviceToEdit, setServiceToEdit] =
    React.useState<ServicesProps | null>(null);
  const queryClient = useQueryClient();
  const [deleteServiceModal, setDeleteServiceModal] = React.useState(false);
  const [serviceDelete, setServiceDelete] = React.useState(false);
  const [serviceToDelete, setServiceToDelete] =
    React.useState<ServicesProps | null>(null);
  const mobile = useMedia('(max-width: 769px)');
  const [btnLoading, setBtnLoading] = React.useState<boolean>(false);
  const toast = useToast();
  const [disabledAddService, setDisabledAddService] =
    React.useState<boolean>(false);

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

  const addServiceMutation = useAddService();
  const deleteServiceMutation = useDeleteService();
  const updateServiceMutation = useUpdateService();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!serviceDelete) {
      if (data.name && data.price) {
        setCheckForm(true);
        let barberService;

        if (!editService) {
          addServiceMutation.mutate({
            price: data.price,
            name: data.name,
          });
        }

        if (editService) {
          if (serviceToEdit) {
            updateServiceMutation.mutate({
              _id: serviceToEdit._id,
              name: data.name,
              price: data.price,
            });
          }
        }
      } else {
        setCheckForm(false);
      }
    }

    if (serviceDelete) {
      if (serviceToDelete) {
        deleteServiceMutation.mutate(serviceToDelete._id);
      }
    }
  };

  function handleChangeValue(servicePrice: any) {
    if (servicePrice) {
      let formattedPrice = Number(servicePrice.replace(',', '.'));
      setValue('price', formattedPrice);
    }
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

  const showSuccessMessage = React.useCallback(() => {
    toast({ status: 'success', ...successDefaultToast });
    setIsOpenBarberServicesModal(false);
    setDeleteServiceModal(false);
  }, [toast]);

  const showErrorMessage = React.useCallback(() => {
    toast({ status: 'error', ...errorDefaultToast });
  }, [toast]);

  React.useEffect(() => {
    if (
      addServiceMutation.isLoading ||
      deleteServiceMutation.isLoading ||
      updateServiceMutation.isLoading
    ) {
      setBtnLoading(true);
    } else {
      setBtnLoading(false);
    }
  }, [
    addServiceMutation.isLoading,
    deleteServiceMutation.isLoading,
    updateServiceMutation.isLoading,
  ]);

  //efeitos para sucesso das ações de add - delete- edit - serviço
  React.useEffect(() => {
    if (addServiceMutation.isSuccess) {
      showSuccessMessage();
    }
  }, [addServiceMutation.isSuccess, showSuccessMessage]);

  React.useEffect(() => {
    if (deleteServiceMutation.isSuccess) {
      showSuccessMessage();
    }
  }, [deleteServiceMutation.isSuccess, showSuccessMessage]);

  React.useEffect(() => {
    if (updateServiceMutation.isSuccess) {
      showSuccessMessage();
    }
  }, [updateServiceMutation.isSuccess, showSuccessMessage]);

  //efeitos para erro das ações de add - delete- edit - serviço
  React.useEffect(() => {
    if (addServiceMutation.isError) {
      showErrorMessage();
    }
  }, [addServiceMutation.isError, showErrorMessage]);

  React.useEffect(() => {
    if (deleteServiceMutation.isError) {
      showErrorMessage();
    }
  }, [deleteServiceMutation.isError, showErrorMessage]);

  React.useEffect(() => {
    if (updateServiceMutation.isError) {
      showErrorMessage();
    }
  }, [updateServiceMutation.isError, showErrorMessage]);

  // previvindo add quando tiver 20 items
  React.useEffect(() => {
    if (
      getBarberServicesItems.data &&
      getBarberServicesItems.data.length >= 20
    ) {
      setDisabledAddService(true);
    } else {
      setDisabledAddService(false);
    }
  }, [getBarberServicesItems.data]);

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
                {disabledAddService && (
                  <Alert status="warning" mb="20px" mt="12px">
                    <AlertIcon />
                    <Styled.AlertDisabledAddMoreService>
                      Você atingiu o limite de serviços (20), para adicionar
                      mais serviços, por favor delete um item na tabela e
                      coloque o novo serviço.
                    </Styled.AlertDisabledAddMoreService>
                  </Alert>
                )}
                <Styled.AddServiceButton
                  onClick={() => {
                    setIsOpenBarberServicesModal(true);
                    setEditService(false);
                    resetServicesEdit();
                    resetServiceDelete();
                  }}
                  disabled={disabledAddService}
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
            size={mobile ? 'xs' : 'lg'}
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
                }}
              >
                <ModalBody>
                  <Grid gridTemplateColumns="140px 1fr" gap="20px">
                    <Label>
                      Valor:
                      <FormInputs>
                        {/* <CurrencyFormat
                          value={price}
                          prefix={'R$'}
                          onValueChange={(e: any) => handleChangeValue(e)}
                          decimalSeparator={','}
                        /> */}
                        <CurrencyInput
                          prefix="R$"
                          decimalSeparator=","
                          groupSeparator="."
                          intlConfig={{ locale: 'pt-BR', currency: 'BRl' }}
                          onValueChange={(e: any) => handleChangeValue(e)}
                          defaultValue={price}
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
                  <BarberGeneralServices.ModalButton disabled={btnLoading}>
                    {btnLoading ? (
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
            size={mobile ? 'xs' : 'lg'}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Grid placeItems="center" mt="24px" gap="12px">
                  <BarberGeneralServices.SectionTitle>
                    Deletar serviço
                  </BarberGeneralServices.SectionTitle>

                  <Alert status="warning" borderRadius={'8px'} mt="12px">
                    <AlertIcon />
                    <Text
                      fontFamily="Roboto"
                      fontSize="18px"
                      fontWeight="normal"
                      color="#000000"
                    >
                      Tem certeza que deseja deletar o serviço:{' '}
                      <Text fontWeight="bold" display="inline">
                        {serviceToDelete ? serviceToDelete.name : ''}?
                      </Text>
                    </Text>
                  </Alert>
                </Grid>
              </ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex justifyContent="center" gap="40px" pb="20px">
                  <BarberGeneralServices.ModalButton
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteServiceModal(false);
                    }}
                  >
                    Cancelar
                  </BarberGeneralServices.ModalButton>
                  <BarberGeneralServices.ModalButton disabled={btnLoading}>
                    {btnLoading ? <Spinner color="#181b23" /> : 'Deletar'}
                  </BarberGeneralServices.ModalButton>
                </Flex>
              </form>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

export default BarberRegisterServices;
