import React from 'react';
interface ButtonProps {
    text: String;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
declare const FreeTextButton: React.FC<ButtonProps>;
export default FreeTextButton;
