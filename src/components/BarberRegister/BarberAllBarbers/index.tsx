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
  InputGroup,
  InputRightElement,
  Tooltip,
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
// nao pode pehar de barberContact
import {
  ErrorMessage,
  FormInputs,
  Input,
  Label,
} from 'components/StyledComponents/Form/AdminInputs';
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import {
  errorDefaultToast,
  successDefaultToast,
} from 'helpers/Toast/Messages/Default';
import Image from 'next/image';

type Inputs = {
  comission: number | string;
  name: string;
  barberImgProfile: string | ArrayBuffer | null;
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
  const [barberPreviewImage, setBarberPreviewImage] =
    React.useState<string>('');

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
      if (data.name && data.comission && data.barberImgProfile) {
        setCheckForm(true);
        let comissionToString = String(data.comission);
        let numberComission = Number(comissionToString.replace(',', '.'));

        console.log('%c⧭', 'color: #007300', data);
        if (!editBarber) {
          addBarberMutation.mutate({
            comission: numberComission,
            name: data.name,
            //  barberProfileImage: data.barberImgProfile
          });
        }

        if (editBarber) {
          if (barberToEdit) {
            updateBarberMutation.mutate({
              _id: barberToEdit._id,
              name: data.name,
              comission: numberComission,
              //  barberProfileImage: data.barberImgProfile
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
    setBarberPreviewImage('');
    setValue('barberImgProfile', null);
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
    // a lógica para editar vai ser o que estão entre parenteses, precisa dar um set no value e no preview da imagem, por hr para não bugar vamos só retirar a imagem da edição
    // setBarberPreviewImage(barber.barberProfileImage);
    // setValue('barberImgProfile', barber.barberProfileImage);
    setBarberPreviewImage('');
    setValue('barberImgProfile', null);
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

  function handleConvertImage(e: React.ChangeEvent<HTMLInputElement>) {
    // 1- pegando o input que carrega  imagem pois no event ele não vem completo
    const inputImage = (
      document.getElementById('barberImage') as HTMLInputElement | null
    )?.files;

    // se existir realmente uma imagem vamos fazer a lógica para para transformar a imagem em base64
    if (inputImage && inputImage.length) {
      // pegando a imagem dentro da array filed
      let barberImage = inputImage[0];
      let readBarberImage = new FileReader();
      readBarberImage.onload = function (loadedBarberImage) {
        if (loadedBarberImage.target) {
          // imagem em base 64
          let barberImageBase64 = loadedBarberImage.target.result;
          setValue('barberImgProfile', barberImageBase64);

          // tem que verificar se existe pois o src de uma imagem não aceita null e tem que por o toString pois o src da imagem não aceita uma ArrayBuffer
          if (barberImageBase64) {
            setBarberPreviewImage(barberImageBase64.toString());
          }
        }
      };
      readBarberImage.readAsDataURL(barberImage);
    }
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
                  <Styled.FormGap>
                    <Label>
                      Nome:
                      <Input
                        type="text"
                        placeholder="Nome exemplo"
                        {...register('name')}
                      />
                    </Label>
                    {/* tem que ser um label sem ser o componente, para não desalinhar o icone de % */}
                    <label>
                      <Text
                        fontFamily="Poppins, sans-serif"
                        fontWeight="400"
                        color="#000000"
                        fontSize={mobile ? '16px' : '18px'}
                        mb="8px"
                      >
                        Comissão:
                        <Tooltip
                          label="Valor em porcentagem"
                          placement="right-end"
                          bg="#495057"
                          color="#f1f1f1"
                          fontFamily="Poppins, sans-serif"
                          fontSize="14px"
                          fontWeight="600"
                          letterSpacing="0.015rem"
                          closeOnClick={false}
                        >
                          <button type="button" id="buttonTooltip">
                            <FaInfoCircle color="#ffdd00" size="16" />
                          </button>
                        </Tooltip>
                      </Text>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="Phone number"
                          {...register('comission')}
                        />
                        <InputRightElement pointerEvents="none">
                          %
                        </InputRightElement>
                      </InputGroup>
                    </label>

                    <label htmlFor="barberImage">
                      <Text
                        fontFamily="Poppins, sans-serif"
                        fontWeight="400"
                        color="#000000"
                        fontSize={mobile ? '16px' : '18px'}
                        mb="8px"
                      >
                        Imagem para perfil
                      </Text>
                    </label>
                    <input
                      id="barberImage"
                      type="file"
                      onChange={(e) => handleConvertImage(e)}
                    />
                    {barberPreviewImage.length > 0 && (
                      <Styled.BarberPreviewProfileImage>
                        {/* tem que usar uma tag html e não a do next se não rola conflito, pelo src, se um base64 */}
                        <img src={barberPreviewImage} alt="barberImage" />
                      </Styled.BarberPreviewProfileImage>
                    )}
                  </Styled.FormGap>
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
