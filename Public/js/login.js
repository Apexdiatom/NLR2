// script.js
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = e.target.username.value;
    const password = e.target.password.value;
  
    // Mock login validation
    if (username === "admin" && password === "1234") {
      document.getElementById('message').textContent = "Login successful!";
      document.getElementById('message').style.color = "green";
    } else {
      document.getElementById('message').textContent = "Invalid credentials.";
      document.getElementById('message').style.color = "red";
    }
  });
  