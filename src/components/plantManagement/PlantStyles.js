import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Form, Input } from "../../styles";

// Global Styles
export const GlobalStyle = createGlobalStyle`
    body {
        position: relative;
    }
`;

// Keyframe Animations
export const fadeIn = keyframes`
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
`;

export const fadeOut = keyframes`
    from {opacity:1;}
    to {opacity:0;}
`;


export const PlantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

export const AddButton = styled.button`
    font-size: 16px;
    background: linear-gradient(to right, #4a90e2, #0072ff);
    color: #fff;
    border-radius: 8px;
    padding: 12px 20px;
    cursor: pointer;
    border: none;
    margin-top: 20px;
    transition: transform 0.2s ease-in-out, background 0.3s;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);

    &:hover {
        transform: scale(1.03);
        background: linear-gradient(to right, #0072ff, #4a90e2);
    }
`;

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    animation: ${fadeIn} 0.3s ease forwards;
`;

export const FormContainer = styled(Form)`
    background: #ffffff;
    border-radius: 12px;
    padding: 30px 30px 40px;
    max-width: 700px;
    width: 90%;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    animation: ${fadeIn} 0.5s ease forwards;
    position: relative;
`;

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    font-size: 22px;
    color: #999;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 20px;

    &:hover {
        color: #666;
    }
`;

export const FormHeader = styled.h3`
    font-size: 22px;
    margin-bottom: 25px;
    color: #333;
    text-align: center;
    font-weight: 700;
`;

export const FullWidthGroup = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #333;
        text-align: center;
    }

    ${Input} {
        text-align: center;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        background: #fafafa;
        width: 70%;
        max-width: 300px;
        transition: border 0.2s;
        &:focus {
            border-color: #4a90e2;
            outline: none;
        }
    }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #333;
    }

    ${Input} {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        background: #fafafa;
        transition: border 0.2s;
        &:focus {
            border-color: #4a90e2;
            outline: none;
        }
    }
`;

export const TwoColumnRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    grid-column: 1 / -1; /* full width of the grid */
    margin-top: 20px;
`;

export const SaveButton = styled.button`
    margin-top: 30px;
    width: 100%;
    background: linear-gradient(to right, #4a90e2, #0072ff);
    padding: 14px 0;
    font-size: 16px;
    font-weight: 600;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, background 0.3s;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);

    &:hover {
        transform: scale(1.02);
        background: linear-gradient(to right, #0072ff, #4a90e2);
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
    margin-top: 5px;
`;

export const DataCard = styled.div`
    background: #f9fafc;
    border-radius: 10px;
    margin-top: 30px;
    padding: 30px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    animation: ${fadeIn} 0.5s ease forwards;
    max-width: 700px;
    width: 100%;
    margin: 30px auto;

    h4 {
        font-size: 20px;
        margin-bottom: 25px;
        font-weight: 700;
        color: #333;
        text-align: center;
    }

    .data-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
    }

    .data-item {
        background: #fff;
        border-radius: 8px;
        padding: 12px;
        border: 1px solid #eee;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        span.label {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
        }

        span.value {
            font-size: 14px;
            font-weight: 600;
            color: #333;
        }
    }
`;

// Success and Error banners
export const MessageBanner = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    text-align: center;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    z-index: 1000;
    animation: ${fadeIn} 0.3s ease forwards;
    ${({ type }) => type === 'success' && `background: #4caf50;`}
    ${({ type }) => type === 'error' && `background: #f44336;`}
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Update PageContainer to include animated gradient background
export const PageContainer = styled.div`
    padding: 20px;
    animation: ${fadeIn} 0.5s ease forwards;
    min-height: 100vh;
    background: linear-gradient(-45deg, #f0f2f5, #a8edea, #fed6e3, #ffecd2);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite, ${fadeIn} 0.5s ease forwards;
    position: relative;
`;