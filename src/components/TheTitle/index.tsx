import React from 'react';
import * as Styled from './style';

interface TitleProps {
  title: string;
}

function TheTitle({ title }: TitleProps) {
  return <Styled.Title>{title}</Styled.Title>;
}

export default TheTitle;
