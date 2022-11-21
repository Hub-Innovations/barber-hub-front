import React from 'react';
import * as Styled from './style';
import TheTitle from '../TheTitle';
import Image from 'next/image';
import ImgExampleImg from '../../assets/img-corte-exemplo.jpg';

function HomePopularServices() {
  return (
    <Styled.PopularServicesContainer>
      <TheTitle title="Serviços populares" />
      <Styled.PopularServicesList>
        <li>
          <Image src={ImgExampleImg} alt="Imagem de exemplo de corte" />
          <Styled.PopularServicesSubTitle>
            Corte navalhado
          </Styled.PopularServicesSubTitle>
          <Styled.PopularServicesText>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Styled.PopularServicesText>
        </li>
        <li>
          <Image src={ImgExampleImg} alt="Imagem de exemplo de corte" />
          <Styled.PopularServicesSubTitle>
            Corte navalhado
          </Styled.PopularServicesSubTitle>
          <Styled.PopularServicesText>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Styled.PopularServicesText>
        </li>
        <li>
          <Image src={ImgExampleImg} alt="Imagem de exemplo de corte" />
          <Styled.PopularServicesSubTitle>
            Corte navalhado
          </Styled.PopularServicesSubTitle>
          <Styled.PopularServicesText>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Styled.PopularServicesText>
        </li>
      </Styled.PopularServicesList>
    </Styled.PopularServicesContainer>
  );
}

export default HomePopularServices;
