import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { CardContainer, CardWrapper, CardInner, CardFront, CardBack, ToggleButton, Background } from '../styles';

const SwitchCard = () => {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register

    return (
        <Background>
            <CardContainer>
                <CardWrapper isLogin={isLogin}>
                    <CardInner>
                        <CardFront>
                            <Login />
                            <ToggleButton onClick={() => setIsLogin(false)}>
                                Go to Register
                            </ToggleButton>
                        </CardFront>
                        <CardBack>
                            <Register />
                            <ToggleButton onClick={() => setIsLogin(true)}>
                                Go to Login
                            </ToggleButton>
                        </CardBack>
                    </CardInner>
                </CardWrapper>
            </CardContainer>
        </Background>
    );
};

export default SwitchCard;
