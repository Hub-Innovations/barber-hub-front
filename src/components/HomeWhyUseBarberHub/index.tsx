import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import TheTitle from '../TheTitle';
import * as Styled from './style';

function HomeWhyUseBarberHub() {
  return (
    <>
      <Styled.WhyUseBarberHubContainer>
        <TheTitle title="Porque usar o barber-hub?" />
        <Styled.WhyUserBarberHubContent>
          <Styled.WhyUseBarberHubList>
            <li>
              <FaPhoneAlt size={'120px'} />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
            </li>
            <li>
              <FaRegCheckCircle size={'120px'} />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
            </li>
            <li>
              <FaMapMarkerAlt size={'120px'} />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
            </li>
          </Styled.WhyUseBarberHubList>
        </Styled.WhyUserBarberHubContent>
      </Styled.WhyUseBarberHubContainer>
    </>
  );
}

export default HomeWhyUseBarberHub;
