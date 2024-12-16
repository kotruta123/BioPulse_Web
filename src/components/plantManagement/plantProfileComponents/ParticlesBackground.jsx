import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = ({
                                 particleCount = 50,
                                 particleSpeed = 1.5,
                                 color = ["#4a90e2", "#8c9eff", "#ff8a80"],
                                 opacity = 0.4,
                                 zIndex = -1,
                                 enableHoverEffect = true,
                                 customStyle = {},
                             }) => {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: { value: "transparent" },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: enableHoverEffect,
                            mode: "bubble",
                        },
                        onClick: { enable: true, mode: "push" },
                    },
                    modes: {
                        bubble: {
                            distance: 200,
                            size: 8,
                            duration: 1.5,
                            opacity: 0.6,
                        },
                        push: { quantity: 4 },
                    },
                },
                particles: {
                    color: { value: color },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.3,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: particleSpeed,
                        random: true,
                        direction: "none",
                        outModes: { default: "out" },
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: particleCount,
                    },
                    opacity: {
                        value: opacity,
                        random: true,
                    },
                    shape: {
                        type: ["circle", "triangle", "star"],
                        polygon: { sides: 5 },
                    },
                    size: {
                        value: { min: 1, max: 4 },
                        random: true,
                    },
                },
                detectRetina: true,
            }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: zIndex,
                ...customStyle,
            }}
        />
    );
};

export default ParticlesBackground;
