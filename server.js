const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path'); // 👈 required for res.sendFile

const app = express();
const PORT = 3000;

const USERNAME = 'Apex';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

// Serve static files like CSS/JS from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Serve the sign-in page at the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Login route
app.post('/login', (req, res) => {
  const { username } = req.body;

  if (username === USERNAME) {
    req.session.loggedIn = true; // 👈 set session flag
    res.redirect('/dashboard');
  } else {
    res.send('Invalid username. <a href="/">Try again</a>');
  }
});

// Middleware to protect dashboard
function requireLogin(req, res, next) {
  if (req.session.loggedIn) { // 👈 match this to your login flag
    next();
  } else {
    res.redirect('/');
  }
}

// Protected dashboard
app.get('/dashboard', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Error destroying session:', err);
      return res.send('Logout error');
    }
    res.redirect('/');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
