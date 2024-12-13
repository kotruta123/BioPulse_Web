// src/Tests/LoginTest.test.jsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../auth/Login";
import { useAuth } from "../auth/AuthContext";

jest.mock("../auth/AuthContext", () => ({
    useAuth: jest.fn(),
}));

describe("Login Component", () => {
    const mockLogin = jest.fn();

    beforeEach(() => {
        useAuth.mockReturnValue({
            login: mockLogin,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders login form", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        // Check for presence of email and password fields
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

        // Check for login and forgot password buttons
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /forgot password/i })).toBeInTheDocument();
    });

    test("displays success message on successful login", async () => {
        mockLogin.mockResolvedValueOnce({ success: true });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@test.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        // Wait for the success message
        const successMessage = await screen.findByText(/logged in successfully/i);
        expect(successMessage).toBeInTheDocument();
    });

    test("displays error for incorrect login", async () => {
        mockLogin.mockResolvedValueOnce({
            success: false,
            message: "Invalid credentials",
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: "wrong@test.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "wrongpassword" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        // Wait for the error message
        const errorMessage = await screen.findByText(/invalid credentials/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
