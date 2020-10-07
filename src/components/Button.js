import React from 'react';
import './Button.css';

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large', 'btn--mobile', 'btn--wide'];
const TYPES = ['click', 'submit']
const COLOR = ['primary', 'black', 'red', 'green'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonType,
    buttonSize,
    buttonColor
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    const checkButtonType = TYPES.includes(buttonType) ? buttonType : null

    const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : null;

    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor} ${checkButtonType}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};