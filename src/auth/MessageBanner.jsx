import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity:0; transform: translateY(-10px); }
  to { opacity:1; transform: translateY(0); }
`;

const Banner = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  text-align: center;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  z-index: 1000;
  background: #4caf50;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const MessageBanner = ({ message }) => {
    if (!message) return null;
    return <Banner>{message}</Banner>;
};

export default MessageBanner;
