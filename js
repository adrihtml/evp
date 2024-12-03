async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    const chatBox = document.getElementById("chat-box");

    // Exibe a mensagem do usuário
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Limpa o campo de entrada
    document.getElementById("user-input").value = "";

    // Faz chamada ao backend
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot-message");
        botMessage.textContent = data.response;
        chatBox.appendChild(botMessage);

        // Rolando para a última mensagem
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
    }
}
