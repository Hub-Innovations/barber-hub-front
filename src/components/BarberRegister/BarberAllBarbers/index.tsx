import {
  Alert,
  AlertIcon,
  Box,
  CircularProgress,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Text,
} from '@chakra-ui/react';
import { formatToCurrency } from 'helpers/Currency/formatCurrency';
import useMedia from 'hooks/useMedia';
import React from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { useGetAllBarbers } from './api/useGetBarbers';
import * as Styled from './style';
import * as ALlBarbersStyled from '../style';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddBarber } from './api/usePostBarbers';
import { useUpdateBarber } from './api/useUpdateBarber';
import { useDeleteBarber } from './api/useDeleteBarber';
import { Input, Label } from '../BarberContact/style';
import {
  ErrorMessage,
  FormInputs,
} from 'components/StyledComponents/Form/AdminInputs';
import { FaExclamationTriangle } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import CurrencyInput from 'react-currency-input-field';
import {
  errorDefaultToast,
  successDefaultToast,
} from 'helpers/Toast/Messages/Default';

type Inputs = {
  comission: number | string;
  name: string;
};

interface BarberProps {
  name?: string;
  comission?: number | string;
  _id: string;
  barbershopId: string;
}

const BarberAllBarbers = () => {
  const getAllBarbersItems = useGetAllBarbers();
  const [editBarber, setEditBarber] = React.useState<Boolean>(false);
  const [barberDelete, setBarberDelete] = React.useState(false);
  const [checkForm, setCheckForm] = React.useState(true);
  const [barberToEdit, setBarberToEdit] = React.useState<BarberProps | null>(
    null
  );
  const [barberToDelete, setBarberToDelete] =
    React.useState<BarberProps | null>(null);
  const [comission, setComission] = React.useState(0.0);
  const [isOpenBarberModal, setIsOpenBarberModal] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState<boolean>(false);
  const [deleteBarberModal, setDeleteBarberModal] = React.useState(false);
  const toast = useToast();

  // apis
  const addBarberMutation = useAddBarber();
  const updateBarberMutation = useUpdateBarber();
  const deleteBarberMutation = useDeleteBarber();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const mobile = useMedia('(max-width: 769px)');

  function handleCloseModalAddBarber() {
    setIsOpenBarberModal(false);
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!barberDelete) {
      if (data.name && data.comission) {
        setCheckForm(true);

        if (!editBarber) {
          addBarberMutation.mutate({
            comission: data.comission,
            name: data.name,
          });
        }

        if (editBarber) {
          if (barberToEdit) {
            updateBarberMutation.mutate({
              _id: barberToEdit._id,
              name: data.name,
              comission: data.comission,
            });
          }
        }
      } else {
        setCheckForm(false);
      }
    }

    if (barberDelete) {
      if (barberToDelete) {
        deleteBarberMutation.mutate(barberToDelete._id);
      }
    }
  };

  function handleChangeValue(comissionPrice: any) {
    if (comissionPrice) {
      let formattedComission = Number(comissionPrice.replace(',', '.'));
      setValue('comission', formattedComission);
    }
  }

  function defineModalButtonText() {
    let text = 'Adicionar';

    if (editBarber) {
      text = 'Editar';
    }

    return text;
  }

  function resetServicesEdit() {
    setEditBarber(false);
    setBarberToEdit(null);
    setValue('name', '');
    setValue('comission', 0.0);
    setComission(0.0);
  }

  function resetServiceDelete() {
    if (barberToDelete) {
      setBarberDelete(false);
      setBarberToDelete(null);
    }
  }

  function handleEditBarber(barber: any) {
    resetServiceDelete();
    setEditBarber(true);
    setBarberToEdit(barber);
    setValue('name', barber.name);
    setValue('comission', barber.comission);
    setComission(barber.comission);
    setIsOpenBarberModal(true);
  }

  function handleDeleteBarber(barber: any) {
    setDeleteBarberModal(true);
    setBarberDelete(true);
    setBarberToDelete(barber);
  }

  const showSuccessMessage = React.useCallback(() => {
    toast({ status: 'success', ...successDefaultToast });
    setIsOpenBarberModal(false);
    setDeleteBarberModal(false);
  }, [toast]);

  const showErrorMessage = React.useCallback(() => {
    toast({ status: 'error', ...errorDefaultToast });
  }, [toast]);

  function handleCloseDeleteBarberModal() {
    setDeleteBarberModal(false);
  }

  // efeito geral dos loading do botão
  React.useEffect(() => {
    if (
      addBarberMutation.isLoading ||
      deleteBarberMutation.isLoading ||
      updateBarberMutation.isLoading
    ) {
      setBtnLoading(true);
    } else {
      setBtnLoading(false);
    }
  }, [
    addBarberMutation.isLoading,
    deleteBarberMutation.isLoading,
    updateBarberMutation.isLoading,
  ]);

  //efeitos para sucesso das ações de add - delete- edit - barbeiro
  React.useEffect(() => {
    if (addBarberMutation.isSuccess) {
      showSuccessMessage();
    }
  }, [addBarberMutation.isSuccess, showSuccessMessage]);

  React.useEffect(() => {
    if (deleteBarberMutation.isSuccess) {
      showSuccessMessage();
    }
  }, [deleteBarberMutation.isSuccess, showSuccessMessage]);

  React.useEffect(() => {
    if (updateBarberMutation.isSuccess) {
      showSuccessMessage();
    }
  }, [updateBarberMutation.isSuccess, showSuccessMessage]);

  //efeitos para erro das ações de add - delete- edit - barber
  React.useEffect(() => {
    if (addBarberMutation.isError) {
      showErrorMessage();
    }
  }, [addBarberMutation.isError, showErrorMessage]);

  React.useEffect(() => {
    if (deleteBarberMutation.isError) {
      showErrorMessage();
    }
  }, [deleteBarberMutation.isError, showErrorMessage]);

  React.useEffect(() => {
    if (updateBarberMutation.isError) {
      showErrorMessage();
    }
  }, [updateBarberMutation.isError, showErrorMessage]);

  return (
    <>
      {getAllBarbersItems.status === 'loading' && (
        <Grid placeItems="center" mt="60px">
          <CircularProgress
            isIndeterminate
            color="#ffdd00"
            size="24"
            thickness="3px"
          />
        </Grid>
      )}
      {getAllBarbersItems.status !== 'loading' && (
        <>
          {getAllBarbersItems.data && getAllBarbersItems.data.length > 0 && (
            <Box mt="40px">
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Todos os barbeiros</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>
                        <Styled.TableTitleHead>
                          Barbeiro(a)
                        </Styled.TableTitleHead>
                      </Th>
                      <Th>
                        <Styled.TableTitleHead>
                          Comissão(R$)
                        </Styled.TableTitleHead>
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
                    {getAllBarbersItems.data.map((item: any, i: number) => {
                      return (
                        <Tr key={i}>
                          <Td>{item.name}</Td>
                          <Td>{formatToCurrency(item.comission)}</Td>
                          <Td isNumeric>
                            <Styled.TableSvg>
                              <BsFillPencilFill
                                onClick={() => handleEditBarber(item)}
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
                                onClick={() => handleDeleteBarber(item)}
                              />
                            </Styled.TableSvg>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              <Styled.AddBarberButton
                onClick={() => {
                  setIsOpenBarberModal(true);
                  setEditBarber(false);
                  resetServicesEdit();
                  resetServiceDelete();
                }}
              >
                <GrAdd size="20" color="#000000" />
              </Styled.AddBarberButton>
            </Box>
          )}

          {/* modal para adicionar um barbeiro */}
          <Modal
            onClose={handleCloseModalAddBarber}
            isOpen={isOpenBarberModal}
            isCentered
            size={mobile ? 'xs' : 'lg'}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Grid placeItems="center" mt="24px" gap="12px">
                  <ALlBarbersStyled.SectionTitle>
                    {editBarber ? 'Editar Barbeiro' : 'Adicionar Barbeiro'}
                  </ALlBarbersStyled.SectionTitle>
                  <Styled.ModalServiceSubTitle>
                    {editBarber
                      ? 'Preenche os campos abaixo para editar'
                      : 'Preenche os campos abaixo para adiciona um barbeiro'}
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
                  <Grid gap="20px">
                    <Label>
                      Nome:
                      <Input
                        type="text"
                        placeholder="Nome exemplo"
                        {...register('name')}
                      />
                    </Label>
                    <Label>
                      Comissão:
                      <FormInputs>
                        <CurrencyInput
                          style={{ paddingLeft: '12px' }}
                          prefix="R$"
                          decimalSeparator=","
                          groupSeparator="."
                          intlConfig={{ locale: 'pt-BR', currency: 'BRl' }}
                          onValueChange={(e: any) => handleChangeValue(e)}
                          defaultValue={comission}
                        />
                      </FormInputs>
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
                  <ALlBarbersStyled.ModalButton
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpenBarberModal(false);
                    }}
                  >
                    Fechar
                  </ALlBarbersStyled.ModalButton>
                  <ALlBarbersStyled.ModalButton disabled={btnLoading}>
                    {btnLoading ? (
                      <Spinner color="#181b23" />
                    ) : (
                      defineModalButtonText()
                    )}
                  </ALlBarbersStyled.ModalButton>
                </Flex>
              </form>
            </ModalContent>
          </Modal>
          {/* modal para deletar um barbeiro */}
          <Modal
            onClose={handleCloseDeleteBarberModal}
            isOpen={deleteBarberModal}
            isCentered
            size={mobile ? 'xs' : 'lg'}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Grid placeItems="center" mt="24px" gap="12px">
                  <ALlBarbersStyled.SectionTitle>
                    Deletar barbeiro
                  </ALlBarbersStyled.SectionTitle>

                  <Alert status="warning" borderRadius={'8px'} mt="12px">
                    <AlertIcon />
                    <Text
                      fontFamily="Roboto"
                      fontSize="18px"
                      fontWeight="normal"
                      color="#000000"
                    >
                      Tem certeza que deseja deletar o barbeiro:{' '}
                      <Text fontWeight="bold" display="inline">
                        {barberToDelete ? barberToDelete.name : ''}?
                      </Text>
                    </Text>
                  </Alert>
                </Grid>
              </ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex justifyContent="center" gap="40px" pb="20px">
                  <ALlBarbersStyled.ModalButton
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteBarberModal(false);
                    }}
                  >
                    Cancelar
                  </ALlBarbersStyled.ModalButton>
                  <ALlBarbersStyled.ModalButton disabled={btnLoading}>
                    {btnLoading ? <Spinner color="#181b23" /> : 'Deletar'}
                  </ALlBarbersStyled.ModalButton>
                </Flex>
              </form>
            </ModalContent>
          </Modal>
        </>
      )}
      {getAllBarbersItems.data && getAllBarbersItems.data.length === 0 && (
        <Box mt="60px">
          <Alert status="info">
            <AlertIcon />
            Você ainda não cadastrou nenhum barbeiro, clique no botão abaixo,
            para cadastrar os profissionais da sua barbearia.
          </Alert>
          <Styled.AddFirstItemButton
            onClick={() => {
              setIsOpenBarberModal(true);
              resetServiceDelete();
              resetServicesEdit();
            }}
          >
            Adicionar barbeiro
          </Styled.AddFirstItemButton>
          <Styled.AddFirstItemTitleCallBack>
            Clique no botão para adicionar um barbeiro!!
          </Styled.AddFirstItemTitleCallBack>
        </Box>
      )}
    </>
  );
};

export default BarberAllBarbers;
