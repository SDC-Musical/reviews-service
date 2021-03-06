import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

const StyledLink = styled.span`
  border: 2px solid #000000;
  border-radius: 5px;
  border-style: ${({ borderStyle }) => borderStyle};
  color: #1a73e8;
  cursor: pointer;
 `;

const LinkText = ({ pressLink, linkText }) => {
  const [borderStyle, setBorderStyle] = useState('hidden');

  LinkText[`handleClickOutside_${linkText}`] = () => setBorderStyle('hidden');

  return (
    <StyledLink
      borderStyle={borderStyle}
      onClick={() => pressLink()}
      onMouseDown={() => setBorderStyle('solid')}
      onMouseUp={() => setBorderStyle('hidden')}
    >
      {linkText}
    </StyledLink>
  );
};

const clickOutsideConfig = {
  handleClickOutside: ({ props }) => LinkText[`handleClickOutside_${props.linkText}`],
};

export default onClickOutside(LinkText, clickOutsideConfig);
