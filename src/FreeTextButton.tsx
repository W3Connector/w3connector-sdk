import React from 'react';
import { CSSProperties } from '@material-ui/styles';

interface ButtonProps {
  text: String;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const FreeTextButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  const buttonStyle: CSSProperties = {
    padding: '10px 20px 10px 20px',
    borderRadius: 20,
    borderWidth: 1,
    borderColor:
        'linear-gradient(to right, #e342c7, #ca51d3, #af5ddc, #9166e1, #706de3, #567dec, #378af2, #0097f5, #00affc, #00c5f8, #00d8ec, #11e9db)',
    backgroundImage:
        'linear-gradient(to right, #e342c7, #ca51d3, #af5ddc, #9166e1, #706de3, #567dec, #378af2, #0097f5, #00affc, #00c5f8, #00d8ec, #11e9db)',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  };

  const buttonHoverStyle: CSSProperties = {
    backgroundImage: 'none',
    borderWidth: 1,
    borderColor: '#0097f5',
    color: '#9166e1',
  };

  const handleMouseEnter: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    Object.assign(event.currentTarget.style, buttonHoverStyle);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    Object.assign(event.currentTarget.style, buttonStyle);
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text} W3Connector
    </button>
  );
};

export default FreeTextButton;
