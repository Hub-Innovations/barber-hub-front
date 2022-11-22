import React from 'react';
import TheTitle from '../TheTitle';
import * as Styled from './style';
import ImgAgendamento from '../../assets/img-agendamento.jpg';
import Image from 'next/image';

function HomeHowMakeAppointment() {
  return (
    <>
      <Styled.HowMakeAppointmentContainer>
        <TheTitle title="Agendamentos" />
        <Styled.HowMakeAppointmentContent>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
          </p>
          <Image src={ImgAgendamento} alt="Imagem exemplo agendamento" />
        </Styled.HowMakeAppointmentContent>
      </Styled.HowMakeAppointmentContainer>
    </>
  );
}

export default HomeHowMakeAppointment;
