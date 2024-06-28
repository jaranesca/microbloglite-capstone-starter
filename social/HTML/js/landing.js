/* landing-page.js */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector("#tab-1 form");
    const signupForm = document.querySelectorAll("#tab-2 form, #tab-3 form, #tab-4 form");
    const sign_in_btn = document.querySelector(".sign-control li[data-tab='tab-1'] a");
    const sign_up_btn = document.querySelector(".sign-control li[data-tab='tab-2'] a");
    const container = document.querySelector(".signin-popup .signin-pop");

    // Handle login form submission
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const loginData = {
            username: loginForm.querySelector("input[name='username']").value,
            password: loginForm.querySelector("input[name='password']").value,
        };

        // Simulate login process
        console.log("Logging in with:", loginData);

        // Example: Replace with actual login logic
        // loginForm.querySelector("button[type='submit']").disabled = true;
        // try {
        //     await login(loginData);
        //     // Redirect to index.html after successful login
        //     window.location.href = "social/html/index.html";
        // } catch (error) {
        //     console.error(error.message);
        //     // Display error notification to the user
        // } finally {
        //     loginForm.querySelector("button[type='submit']").disabled = false;
        // }

        // Simulate successful login redirect
        window.location.href = "social/HTML/index.html"; // Remove this line and uncomment the above block after implementing actual login logic
    });

    // Toggle to sign-up mode
    sign_up_btn.addEventListener('click', (event) => {
        event.preventDefault();
        container.classList.add("sign-up-mode");
    });

    // Toggle to sign-in mode
    sign_in_btn.addEventListener('click', (event) => {
        event.preventDefault();
        container.classList.remove("sign-up-mode");
    });

    // Handle signup form submission
    signupForm.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const signupData = {
                username: form.querySelector("input[name='name']").value,
                password: form.querySelector("input[name='password']").value,
                repeatPassword: form.querySelector("input[name='repeat-password']").value,
            };

            // Simulate signup process
            console.log("Signing up with:", signupData);

            // Example: Replace with actual signup logic
            // form.querySelector("button[type='submit']").disabled = true;
            // try {
            //     await signup(signupData);
            //     // Redirect to index.html after successful signup
            //     window.location.href = "social/html/index.html";
            // } catch (error) {
            //     console.error(error.message);
            //     // Display error notification to the user
            // } finally {
            //     form.querySelector("button[type='submit']").disabled = false;
            // }

            // Simulate successful signup redirect
            window.location.href = "social/HTML/index.html"; // Remove this line and uncomment the above block after implementing actual signup logic
        });
    });
});

