import React from 'react';
import { MessageBanner as StyledMessageBanner } from "../PlantStyles.js";

const MessageBanner = ({ type, message }) => {
    return (
        <StyledMessageBanner type={type}>
            {message}
        </StyledMessageBanner>
    );
};

export default MessageBanner;
