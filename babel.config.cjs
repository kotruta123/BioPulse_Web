module.exports = {
    presets: [
        ["@babel/preset-env"],
        ["@babel/preset-react", { runtime: "automatic" }], // Enables automatic React imports for JSX
    ],
};
