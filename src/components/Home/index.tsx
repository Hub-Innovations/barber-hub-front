import React from 'react';
import * as Styled from './style';
import TheHeader from '../TheHeader';
import TheFooter from '../TheFooter';
import HomePopularServices from '../HomePopularServices';
import HomeWhyUseBarberHub from '../HomeWhyUseBarberHub';
import HomeHowMakeAppointment from '../HomeHowMakeAppointment';
import Image from 'next/image';
import ImgIntroHome from '../../assets/barber-img-decoration.jpg';

function HomePage() {
  return (
    <>
      <TheHeader />
      <Styled.ImageIntroHome>
        <Image alt="Barber intro" src={ImgIntroHome} />
      </Styled.ImageIntroHome>
      <HomePopularServices />
      <HomeWhyUseBarberHub />
      <HomeHowMakeAppointment />
      <TheFooter />
    </>
  );
}

export default HomePage;
