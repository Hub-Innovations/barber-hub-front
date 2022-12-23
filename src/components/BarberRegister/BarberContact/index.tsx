import { Stack } from '@chakra-ui/layout';
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { http } from '../../../../api/http';
import * as Styled from './style';
import { Label, Input } from './style';
import { useQueryClient, useMutation } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Spinner } from '@chakra-ui/react';

type Inputs = {
  cellphone: number;
  fixCellphone: number;
  email: string;
  address: string;
  addressNumber?: number;
  addressComplement: string;
};

const createEmployee = async (data: Inputs) => {
  const { data: response } = await http.post('/auth/login', data);
  return response;
};

function BarberRegisterContact() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isLoading } = useMutation(createEmployee, {
    onSuccess: (data) => {
      console.log('%c⧭', 'color: #917399', data);
    },
    onError: (err: any) => {
      console.log('%c⧭', 'color: #0088cc', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user = {
      ...data,
    };
    mutate(user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Styled.FormGrid>
        <Stack gap="20px">
          <Styled.SectionTitle>Dados para contato</Styled.SectionTitle>
          <Label>
            Celular:
            <Input type="tel" {...register('cellphone', { required: true })} />
            {errors.cellphone && (
              <Styled.ErrorMessage>
                <FaExclamationTriangle color="#d00000" />
                This field is required
              </Styled.ErrorMessage>
            )}
          </Label>
          <Label>
            Telefone:
            <Input type="tel" {...register('fixCellphone')} />
          </Label>
          <Label>
            Email:
            <Input type="tel" {...register('email', { required: true })} />
            {errors.email && (
              <Styled.ErrorMessage>
                <FaExclamationTriangle color="#d00000" />
                This field is required
              </Styled.ErrorMessage>
            )}
          </Label>
        </Stack>
        <Stack gap="20px">
          <Styled.SectionTitle>Informações de localização</Styled.SectionTitle>
          <Label>
            Endereço:
            <Input type="tel" {...register('address', { required: true })} />
            {errors.address && (
              <Styled.ErrorMessage>
                <FaExclamationTriangle color="#d00000" />
                This field is required
              </Styled.ErrorMessage>
            )}
          </Label>
          <Label>
            Complemento:
            <Input
              type="tel"
              {...register('addressComplement', { required: true })}
            />
            {errors.addressComplement && (
              <Styled.ErrorMessage>
                <FaExclamationTriangle color="#d00000" />
                This field is required
              </Styled.ErrorMessage>
            )}
          </Label>
          <Label>
            Número:
            <Input
              type="tel"
              {...register('addressNumber', { required: true })}
            />
            {errors.addressNumber && (
              <Styled.ErrorMessage>
                <FaExclamationTriangle color="#d00000" />
                This field is required
              </Styled.ErrorMessage>
            )}
          </Label>
        </Stack>
        {/* dasabilitar botao no loadin */}
        <Styled.FormButton>
          {isLoading ? <Spinner color="#181b23" /> : 'Salvar'}
        </Styled.FormButton>
      </Styled.FormGrid>
    </form>
  );
}

export default BarberRegisterContact;
