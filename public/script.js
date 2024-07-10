
        document.getElementById('send-button').addEventListener('click', async () => {
            const message = document.getElementById('message-input').value;
            const chatBox = document.getElementById('chat-box');

            // Añadir mensaje del usuario al chat
            const userMessageDiv = document.createElement('div');
            userMessageDiv.classList.add('message', 'user-message');
            userMessageDiv.textContent = message;
            chatBox.appendChild(userMessageDiv);

            // Enviar mensaje al servidor
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            // Añadir mensaje del bot al chat
            const botMessageDiv = document.createElement('div');
            botMessageDiv.classList.add('message', 'bot-message');
            botMessageDiv.textContent = data.response;
            chatBox.appendChild(botMessageDiv);

            // Desplazar hacia abajo
            chatBox.scrollTop = chatBox.scrollHeight;

            // Limpiar el campo de entrada de mensaje
            document.getElementById('message-input').value = '';
        });
      