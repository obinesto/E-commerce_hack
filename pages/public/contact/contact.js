function CustomAlert(message) {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'custom-alert';

    const alertMessage = document.createElement('p');
    alertMessage.textContent = message;
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'OK';
    closeButton.className = 'custom-alert-button';

    alertContainer.appendChild(alertMessage);
    alertContainer.appendChild(closeButton);

    document.body.appendChild(alertContainer);

    closeButton.addEventListener('click', function() {
        document.body.removeChild(alertContainer);
    });
}
    

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            const contactName = document.querySelector('.input-box').value.trim();
            const contactEmail = document.querySelector('.email-input').value.trim();
            const contactText = document.querySelector('.text-area').value.trim();
            const contactInput = document.querySelector('input[name="question"]:checked');

            if (contactName === '' || contactEmail === '' || contactText === '' || !contactInput) {

                    CustomAlert('please fill the form properly!')
            } else{
                    CustomAlert('Thank you for signing up!')
                        setInterval(() => {
                        window.location.reload()
                        }, 2000);
            }

        });
    }
});
