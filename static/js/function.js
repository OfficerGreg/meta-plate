// Simulate a loading animation
        const chatContainer = document.querySelector('.chat-container');
        const loadingElement = document.querySelector('.loading');
        const form = document.querySelector('#chat-form');
        const inputField = document.querySelector('#input-field');
        const submitButton = document.querySelector('#submit-button');
        function showLoadingAnimation() {
            loadingElement.style.display = 'block';
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function hideLoadingAnimation() {
            loadingElement.style.display = 'none';
        }
        function submitContent(){
             showLoadingAnimation();
                // Continue with the form submission
                form.submit();
        }
         // Add an event listener to the form submission
        form.addEventListener('submit', function(event) {
            if (inputField.value.trim() === '') {
                 // Block the form submission
                event.preventDefault();
                alert('Bitte geben Sie etwas ein.'); // Display an error message
            } else {
               submitContent();
            }
        });