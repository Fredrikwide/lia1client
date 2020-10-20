import React from 'react';
import './Button.css';

const STYLES = ['btn--primary', 'btn--outline', 'btn--secondary', 'btn--warning'];
const SIZES = ['btn--medium', 'btn--large', 'btn--mobile', 'btn--wide'];
const TYPES = ['click', 'submit']
const COLOR = ['primary', 'black', 'red', 'green', 'orange', 'outline', 'outline-active'];

export const Button = ({
    children,
    value,
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
            value={value}
        >
            {children}
        </button>
    );
};