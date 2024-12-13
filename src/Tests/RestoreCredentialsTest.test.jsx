// RestoreCredentialsTest.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RestoreCredentials from "../auth/RestoreCredentials";
import UserService from "../services/UserService";

jest.mock("../services/UserService", () => ({
    getSecurityQuestion: jest.fn(),
    recoverPassword: jest.fn(),
}));

describe("RestoreCredentials Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders restore password form", () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <RestoreCredentials />
            </MemoryRouter>
        );

        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("security-answer-input")).toBeInTheDocument();
        expect(screen.getByTestId("reset-button")).toBeInTheDocument();
    });

    test("shows security question on valid email", async () => {
        UserService.getSecurityQuestion.mockResolvedValue("What is your pet's name?");

        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <RestoreCredentials />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@test.com" } });
        fireEvent.blur(screen.getByTestId("email-input"));

        await waitFor(() =>
            expect(screen.getByDisplayValue(/What is your pet's name\?/i)).toBeInTheDocument()
        );
    });

    test("shows error on invalid security answer", async () => {
        // Mock the security question first
        UserService.getSecurityQuestion.mockResolvedValue("What is your pet's name?");

        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <RestoreCredentials />
            </MemoryRouter>
        );

        // Fetch the question
        fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@test.com" } });
        fireEvent.blur(screen.getByTestId("email-input"));

        await waitFor(() =>
            expect(screen.getByDisplayValue(/What is your pet's name\?/i)).toBeInTheDocument()
        );

        // Now mock a rejected recovery
        UserService.recoverPassword.mockRejectedValue({
            response: { data: "Incorrect answer" }
        });

        // Use placeholder text query to select the answer input
        fireEvent.change(screen.getByPlaceholderText(/answer to security question/i), {
            target: { value: "wrong" },
        });

        fireEvent.click(screen.getByTestId("reset-button"));


    });
});
