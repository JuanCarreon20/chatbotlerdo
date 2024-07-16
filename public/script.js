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
    let botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('message', 'bot-message');

    if (typeof data.response === 'string') {
        // Mensaje simple
        botMessageDiv.innerHTML = data.response.replace(/\n/g, '<br>');
    } else if (Array.isArray(data.response)) {
        // Lista de carreras
        botMessageDiv.innerHTML = data.response.map(career => `
            <div>
                <strong>Carrera:</strong> ${career.name}<br>
                <strong>Descripción:</strong> ${career.description}<br>
            </div>
        `).join('');
    } else {
        // Información de la universidad
        botMessageDiv.innerHTML = `
            <strong>Información:</strong> ${data.response.location}<br>
            <strong>Historia:</strong> ${data.response.history}<br>
            <strong>Costos:</strong> ${data.response.costs}<br>
            <strong>Plan de estudios:</strong> ${data.response.study_plans}<br>
            <strong>Galería:</strong> <a href="${data.response.gallery}">${data.response.gallery}</a><br>
            <strong>Duración:</strong> ${data.response.duration}<br>
            <strong>Foros:</strong> <a href="${data.response.forums}">${data.response.forums}</a><br>
            <strong>Extracurricular:</strong> <a href="${data.response.extracurricular}">${data.response.extracurricular}</a><br>
            <strong>Instalaciones:</strong> ${data.response.facilities}<br>
            <strong>Aula Segura:</strong> ${data.response.safe_classroom}<br>
            <strong>Contáctanos:</strong> <a href="${data.response.whatsapp_contact}">${data.response.whatsapp_contact}</a><br>
        `;
    }

    chatBox.appendChild(botMessageDiv);

    // Desplazar hacia abajo
    chatBox.scrollTop = chatBox.scrollHeight;

    // Limpiar el campo de entrada de mensaje
    document.getElementById('message-input').value = '';
});
