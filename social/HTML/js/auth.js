/* auth.js provides LOGIN-related functions */

"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
// Backup server (mirror): "https://microbloglite.onrender.com"

// NOTE: API documentation is available at /docs
// For example: http://microbloglite.us-east-2.elasticbeanstalk.com/docs

// Helper function to handle API requests
async function apiRequest(endpoint, options = {}) {
    const response = await fetch(apiBaseURL + endpoint, options);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }
    return data;
}

// Retrieve login data from local storage
function getLoginData() {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
}

// Check if the user is logged in
function isLoggedIn() {
    return Boolean(getLoginData().token);
}

// Process user login
async function login(loginData) {
    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        };

        const data = await apiRequest("/auth/login", options);

        window.localStorage.setItem("login-data", JSON.stringify(data));
        window.location.assign("/social/HTML/index.html"); // Redirect to posts page
        return data;
    } catch (error) {
        console.error(error.message);
        // Display error notification to the user
        return null;
    }
}

// Process user logout
async function logout() {
    const { token } = getLoginData();
    if (!token) return;

    const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${loginData.token}` },
    };

    try {
        await apiRequest("/auth/logout", options);
    } catch (error) {
        console.error(error.message);
        // Proceed with local logout even if API request fails
    } finally {
        window.localStorage.removeItem("login-data"); // Remove login data from local storage
        window.location.assign("/"); // Redirect to landing page
    }
}

// Handle user signup
async function signup(signupData) {
    const options = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: signupData.username,
            fullName: signupData.fullname,
            password: signupData.password,
        }),
    };

    try {
        const data = await apiRequest("/api/users", options);
        // Automatically log the user in after successful signup
        return login({ username: signupData.username, password: signupData.password });
    } catch (error) {
        console.error(error.message);
        // Display error notification to the user
        return null;
    }
}
