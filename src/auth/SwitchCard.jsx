import React, { useState } from "react";
import Login from "./Login";
import RestoreCredentials from "./RestoreCredentials";
import {
    CardContainer,
    CardWrapper,
    CardInner,
    CardFront,
    CardBack,
    ToggleButton,
    Background,
} from "../styles";

const SwitchCard = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Background>
            <CardContainer>
                <CardWrapper $isLogin={isLogin}>
                    <CardInner>
                        <CardFront>
                            <Login onSwitchToRestore={() => setIsLogin(false)} />
                        </CardFront>
                        <CardBack>
                            <RestoreCredentials />
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
