// src/tests/PlantManagementTest.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlantManagement from "../components/PlantManagement/PlantManagement.jsx";
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
            lightOffTime: "2024-01-01T22:00:00.000Z",
            phMin: 5.5,
            phMax: 6.5,
            temperatureMin: 20.0,
            temperatureMax: 25.0,
            lightMin: 300.0,
            lightMax: 500.0,
            ecMin: 1.2,
            ecMax: 2.0,
            isDefault: false,
            imageUrl: "strawberry.jpg" // Assuming default image
        });
        PlantService.getPlantProfiles.mockResolvedValueOnce([
            { id: 1, name: "Cactus", lightOnTime: "2024-01-01T10:00:00.000Z", lightOffTime: "2024-01-01T22:00:00.000Z", phMin: 5.5, phMax: 6.5, temperatureMin: 20.0, temperatureMax: 25.0, lightMin: 300.0, lightMax: 500.0, ecMin: 1.2, ecMax: 2.0, isDefault: false, imageUrl: "strawberry.jpg" }
        ]);

        render(<PlantManagement />);

        // Wait for initial fetch to complete and ensure "Cactus" is not present
        await waitFor(() => {
            expect(screen.queryByText(/Cactus/i)).not.toBeInTheDocument();
        });

        // Click on "Add New Plant Profile" button
        fireEvent.click(screen.getByText(/add new plant profile/i));

        // Fill in the "Plant Name" input
        fireEvent.change(screen.getByPlaceholderText(/plant name/i), {
            target: { value: "Cactus" },
        });

        // Optionally, fill other fields if required by the form

        // Click on "Save Changes" button
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
                lightOffTime: "2024-01-01T22:00:00.000Z",
                phMin: 6.0,
                phMax: 7.5,
                temperatureMin: 22.0,
                temperatureMax: 27.0,
                lightMin: 250.0,
                lightMax: 450.0,
                ecMin: 1.5,
                ecMax: 2.5,
                isDefault: false,
                imageUrl: "strawberry.jpg"
            },
            {
                id: 2,
                name: "Tomato",
                lightOnTime: "2024-01-02T09:00:00.000Z",
                lightOffTime: "2024-01-02T21:00:00.000Z",
                phMin: 6.0,
                phMax: 7.5,
                temperatureMin: 22.0,
                temperatureMax: 27.0,
                lightMin: 250.0,
                lightMax: 450.0,
                ecMin: 1.5,
                ecMax: 2.5,
                isDefault: false,
                imageUrl: "tomato.jpg"
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
                lightOffTime: "2024-01-01T22:00:00.000Z",
                phMin: 6.0,
                phMax: 7.5,
                temperatureMin: 22.0,
                temperatureMax: 27.0,
                lightMin: 250.0,
                lightMax: 450.0,
                ecMin: 1.5,
                ecMax: 2.5,
                isDefault: false,
                imageUrl: "strawberry.jpg"
            },
            {
                id: 2,
                name: "Tomato",
                lightOnTime: "2024-01-02T09:00:00.000Z",
                lightOffTime: "2024-01-02T21:00:00.000Z",
                phMin: 6.0,
                phMax: 7.5,
                temperatureMin: 22.0,
                temperatureMax: 27.0,
                lightMin: 250.0,
                lightMax: 450.0,
                ecMin: 1.5,
                ecMax: 2.5,
                isDefault: false,
                imageUrl: "tomato.jpg"
            }
        ]);

        render(<PlantManagement />);

        // Wait for initial profiles to load
        await waitFor(() => expect(screen.getByText(/Aloe Vera/i)).toBeInTheDocument());

        // Click on the edit icon for "Aloe Vera"
        fireEvent.click(screen.getByTestId("edit-icon-1"));

        // Change the "Plant Name" input
        fireEvent.change(screen.getByPlaceholderText(/plant name/i), {
            target: { value: "Updated Aloe Vera" },
        });

        // Click on "Save Changes" button
        fireEvent.click(screen.getByText(/save changes/i));

        // After save, the component should refetch profiles and find "Updated Aloe Vera"
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
                lightOffTime: "2024-01-01T22:00:00.000Z",
                phMin: 6.0,
                phMax: 7.5,
                temperatureMin: 22.0,
                temperatureMax: 27.0,
                lightMin: 250.0,
                lightMax: 450.0,
                ecMin: 1.5,
                ecMax: 2.5,
                isDefault: false,
                imageUrl: "strawberry.jpg"
            },
            {
                id: 2,
                name: "Tomato",
                lightOnTime: "2024-01-02T09:00:00.000Z",
                lightOffTime: "2024-01-02T21:00:00.000Z",
                phMin: 6.0,
                phMax: 7.5,
                temperatureMin: 22.0,
                temperatureMax: 27.0,
                lightMin: 250.0,
                lightMax: 450.0,
                ecMin: 1.5,
                ecMax: 2.5,
                isDefault: false,
                imageUrl: "tomato.jpg"
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
                lightOffTime: "2024-01-02T21:00:00.000Z",
                phMin: 6.0,
                phMax: 7.5,
                temperatureMin: 22.0,
                temperatureMax: 27.0,
                lightMin: 250.0,
                lightMax: 450.0,
                ecMin: 1.5,
                ecMax: 2.5,
                isDefault: false,
                imageUrl: "tomato.jpg"
            }
        ]);

        render(<PlantManagement />);

        // Wait for initial profiles to load
        await waitFor(() => expect(screen.getByText(/Aloe Vera/i)).toBeInTheDocument());

        // Click on the delete icon for "Aloe Vera"
        fireEvent.click(screen.getByTestId("delete-icon-1"));

        // After deletion, "Aloe Vera" should no longer be in the document
        await waitFor(() =>
            expect(screen.queryByText(/Aloe Vera/i)).not.toBeInTheDocument()
        );
    });
});
