import styled from 'styled-components';
import backgroundImage from "../public/images/backgroundLogin.png";

export const AppContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f5f8fa;
    overflow-y: auto;
    
`;

export const SidebarContainer = styled.div`
    width: 80px;
    background-color: #edf5f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    height: 95%;
`;

export const Container = styled.div`
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const IconButton = styled.div`
    margin: 15px 0;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
`;

export const ActiveIconButton = styled(IconButton)`
    background-color: #33d69f;
    color: white;
`;

export const AvatarContainer = styled.div`
    margin-top: auto;
    padding: 10px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

export const WarningMessage = styled.div`
    background-color: #ffdddd;
    color: #ff5b5b;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 14px;
`;

export const ToggleSwitch = styled.div`
    width: 50px;
    height: 25px;
    border-radius: 15px;
    background-color: #e0f7fa;
`;

export const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto;
    background-color: #f7f8fa;
`;

export const ContentContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const PlantAndCarouselRow = styled.div`
    display: flex;
    gap: 20px;
`;


export const PlantCardContainer = styled.div`
    position: relative;
    display: flex;
    flex: max-content;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    width: 220px;
    height: 180px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    ${({ isActive }) => isActive && `border: 2px solid #33d69f;`}
    &:hover .MuiSvgIcon-root {
        display: block;
    }
`;

export const PlantOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
    &:hover {
        opacity: 1;
    }
`;

export const EditIcon = styled.div`
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: white;
`;


export const PlantGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
    gap: 25px; 
    padding: 20px;
    width: 100%;
    box-sizing: border-box; 
`;




export const PlantImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
`;


export const PlantTitle = styled.h3`
    font-size: 14px;
    color: #ffffff;
`;

export const PlantStatus = styled.span`
    font-size: 12px;
    color: #00e676;
`;

export const SensorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`;

export const SensorCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SensorIcon = styled.div`
    font-size: 24px;
    color: #555;
`;

export const SensorTitle = styled.h3`
    font-size: 16px;
    color: #333;
`;

export const SensorValue = styled.p`
    font-size: 24px;
    color: #555;
`;

export const SensorStatus = styled.span`
    font-size: 12px;
    color: ${({ status }) =>
            status === "Good" ? "#00e676" : status === "Moderate" ? "#ffcc00" : "#ff5b5b"};
    margin-top: 5px;
`;


export const ChartContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;
`;



export const Background = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
`;


export const CardContainer = styled.div`
    perspective: 1500px; /* Enables 3D effect */
`;

export const CardWrapper = styled.div`
    width: 400px;
    height: 550px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    transform: ${({ $isLogin }) => ($isLogin ? "rotateY(0)" : "rotateY(180deg)")};
`;

export const CardInner = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
`;

export const CardFront = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    padding: 30px;
`;

export const CardBack = styled(CardFront)`
    transform: rotateY(180deg);
`;

export const ToggleButton = styled.button`
    margin-top: 20px;
    padding: 12px 25px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    text-align: center;
`;

export const Input = styled.input`
    margin: 12px 0;
    padding: 12px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    background-color: #f9f9f9;
`;

export const Button = styled.button`
    margin-top: 15px;
    padding: 12px;
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;


export const RefreshButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;

    &:hover {
        background-color: #0056b3;
    }
`;

export const CarouselWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CarouselTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    color: #333;
`;

export const CarouselContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
`;

export const CarouselImage = styled.img`
    width: 100%;
    height: 550px; /* Adjust height to fit your layout */
    object-fit: cover;
    border-radius: 8px;
`;

