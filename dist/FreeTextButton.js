"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const FreeTextButton = ({ text, onClick }) => {
    const buttonStyle = {
        padding: '10px 20px 10px 20px',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'linear-gradient(to right, #e342c7, #ca51d3, #af5ddc, #9166e1, #706de3, #567dec, #378af2, #0097f5, #00affc, #00c5f8, #00d8ec, #11e9db)',
        backgroundImage: 'linear-gradient(to right, #e342c7, #ca51d3, #af5ddc, #9166e1, #706de3, #567dec, #378af2, #0097f5, #00affc, #00c5f8, #00d8ec, #11e9db)',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    };
    const buttonHoverStyle = {
        backgroundImage: 'none',
        borderWidth: 1,
        borderColor: '#0097f5',
        color: '#9166e1',
    };
    const handleMouseEnter = (event) => {
        Object.assign(event.currentTarget.style, buttonHoverStyle);
    };
    const handleMouseLeave = (event) => {
        Object.assign(event.currentTarget.style, buttonStyle);
    };
    return ((0, jsx_runtime_1.jsxs)("button", { style: buttonStyle, onClick: onClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [text, " W3Connector"] }));
};
exports.default = FreeTextButton;
//# sourceMappingURL=FreeTextButton.js.map