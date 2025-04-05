document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.getElementById("chat-messages");
  
    function addMessage(text, sender = "user") {
      const msg = document.createElement("div");
      msg.className = sender;
      msg.textContent = text;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    function simulateAIResponse(userText) {
      setTimeout(() => {
        const response = `🤖 Interesting question! Here's a historical fact related to: "${userText}".`;
        addMessage(response, "ai");
      }, 800);
    }
  
    sendBtn.addEventListener("click", () => {
      const text = userInput.value.trim();
      if (text !== "") {
        addMessage(text, "user");
        simulateAIResponse(text);
        userInput.value = "";
      }
    });
  
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendBtn.click();
    });
  });
  