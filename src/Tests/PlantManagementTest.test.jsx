// PlantManagementTest.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlantManagement from "../components/settings/PlantManagement.jsx";
import * as PlantService from "../services/PlantService.jsx";

// Mock the PlantService functions
jest.mock("../services/PlantService.jsx");

describe("PlantManagement Component", () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    test("adds a new plant profile", async () => {
        // Mock initial empty profiles
        PlantService.getPlantProfiles.mockResolvedValueOnce([]);

        // Mock addPlantProfile and updated profiles including valid date fields
        PlantService.addPlantProfile.mockResolvedValueOnce({
            id: 1,
            name: "Cactus",
            lightOnTime: "2024-01-01T10:00:00.000Z",
            lightOffTime: "2024-01-01T22:00:00.000Z"
        });
        PlantService.getPlantProfiles.mockResolvedValueOnce([
            { id: 1, name: "Cactus", lightOnTime: "2024-01-01T10:00:00.000Z", lightOffTime: "2024-01-01T22:00:00.000Z" }
        ]);

        render(<PlantManagement />);

        // Wait for initial fetch
        await waitFor(() => {
            expect(screen.queryByText(/Cactus/i)).not.toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/add new plant profile/i));
        fireEvent.change(screen.getByPlaceholderText(/plant name/i), {
            target: { value: "Cactus" },
        });
        fireEvent.click(screen.getByText(/save changes/i));

        // After save, the component should refetch profiles and find "Cactus"
        await waitFor(() =>
            expect(screen.getByText(/Cactus/i)).toBeInTheDocument()
        );
    });

    test("edits an existing plant profile", async () => {
        // Initial profiles including "Aloe Vera" with valid date fields
        const initialProfiles = [
            {
                id: 1,
                name: "Aloe Vera",
                lightOnTime: "2024-01-01T10:00:00.000Z",
                lightOffTime: "2024-01-01T22:00:00.000Z"
            },
            {
                id: 2,
                name: "Tomato",
                lightOnTime: "2024-01-02T09:00:00.000Z",
                lightOffTime: "2024-01-02T21:00:00.000Z"
            }
        ];
        PlantService.getPlantProfiles.mockResolvedValueOnce(initialProfiles);

        // Mock updatePlantProfile
        PlantService.updatePlantProfile.mockResolvedValueOnce({});
        // After update, return updated "Aloe Vera" with valid dates
        PlantService.getPlantProfiles.mockResolvedValueOnce([
            {
                id: 1,
                name: "Updated Aloe Vera",
                lightOnTime: "2024-01-01T10:00:00.000Z",
                lightOffTime: "2024-01-01T22:00:00.000Z"
            },
            {
                id: 2,
                name: "Tomato",
                lightOnTime: "2024-01-02T09:00:00.000Z",
                lightOffTime: "2024-01-02T21:00:00.000Z"
            }
        ]);

        render(<PlantManagement />);

        await waitFor(() => expect(screen.getByText(/Aloe Vera/i)).toBeInTheDocument());

        fireEvent.click(screen.getByTestId("edit-icon-1"));
        fireEvent.change(screen.getByPlaceholderText(/plant name/i), {
            target: { value: "Updated Aloe Vera" },
        });
        fireEvent.click(screen.getByText(/save changes/i));

        await waitFor(() =>
            expect(screen.getByText(/Updated Aloe Vera/i)).toBeInTheDocument()
        );
    });

    test("deletes a plant profile", async () => {
        // Initial profiles including "Aloe Vera" with valid date fields
        const initialProfiles = [
            {
                id: 1,
                name: "Aloe Vera",
                lightOnTime: "2024-01-01T10:00:00.000Z",
                lightOffTime: "2024-01-01T22:00:00.000Z"
            },
            {
                id: 2,
                name: "Tomato",
                lightOnTime: "2024-01-02T09:00:00.000Z",
                lightOffTime: "2024-01-02T21:00:00.000Z"
            }
        ];
        PlantService.getPlantProfiles.mockResolvedValueOnce(initialProfiles);

        // Mock deletePlantProfile
        PlantService.deletePlantProfile.mockResolvedValueOnce({});
        // After deletion, return only "Tomato" with valid dates
        PlantService.getPlantProfiles.mockResolvedValueOnce([
            {
                id: 2,
                name: "Tomato",
                lightOnTime: "2024-01-02T09:00:00.000Z",
                lightOffTime: "2024-01-02T21:00:00.000Z"
            }
        ]);

        render(<PlantManagement />);

        await waitFor(() => expect(screen.getByText(/Aloe Vera/i)).toBeInTheDocument());

        fireEvent.click(screen.getByTestId("delete-icon-1"));

        await waitFor(() =>
            expect(screen.queryByText(/Aloe Vera/i)).not.toBeInTheDocument()
        );
    });
});
