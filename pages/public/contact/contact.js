// Show a small centered alert with an OK button.
function CustomAlert(message) {
    const alertContainer = document.createElement("div");
    alertContainer.className = "custom-alert";

    const alertMessage = document.createElement("p");
    alertMessage.textContent = message;

    const closeButton = document.createElement("button");
    closeButton.textContent = "OK";
    closeButton.className = "custom-alert-button";

    alertContainer.appendChild(alertMessage);
    alertContainer.appendChild(closeButton);

    document.body.appendChild(alertContainer);

    // Close the custom alert.
    closeButton.addEventListener("click", function () {
        document.body.removeChild(alertContainer);
    });
}

// Contact page: validate the form, alert the outcome, and reload.
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        // Validate the contact form and either warn or thank the sender.
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const contactName = document.querySelector(".input-box").value.trim();
            const contactEmail = document.querySelector(".email-input").value.trim();
            const contactText = document.querySelector(".text-area").value.trim();
            const contactInput = document.querySelector(
                'input[name="question"]:checked',
            );

            if (
                contactName === "" ||
                contactEmail === "" ||
                contactText === "" ||
                !contactInput
            ) {
                CustomAlert("please fill the form properly!");
            } else {
                CustomAlert("Thank you for signing up!");
                setInterval(() => {
                    window.location.reload();
                }, 2000);
            }
        });
    }
});
