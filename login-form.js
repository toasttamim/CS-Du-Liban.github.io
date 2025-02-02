// Tab Navigation
function openTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));

  document.getElementById(tabName).classList.add('active');
  document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Login Validation
function validateLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  document.getElementById('login-username-warning').style.display = username ? 'none' : 'block';
  document.getElementById('login-password-warning').style.display = password ? 'none' : 'block';

  if (username && password) {
    const savedData = JSON.parse(localStorage.getItem('users')) || {};
    if (savedData[username] && savedData[username] === password) {
      alert('Login Successful!');
      // Redirect to another page after successful login
      window.location.href = 'dashboard.html'; // Replace 'dashboard.html' with the page you want to redirect to
    } else {
      alert('Invalid username or password.');
    }
  }
}

// Sign-Up Validation
function validateSignUp() {
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  const ageCheck = document.getElementById('signup-age-check').checked;

  document.getElementById('signup-username-warning').style.display = username ? 'none' : 'block';
  document.getElementById('signup-email-warning').style.display = email ? 'none' : 'block';
  document.getElementById('signup-password-warning').style.display = password ? 'none' : 'block';
  document.getElementById('signup-age-warning').style.display = ageCheck ? 'none' : 'block';

  if (username && email && password && ageCheck) {
    let savedData = JSON.parse(localStorage.getItem('users')) || {};
    if (savedData[username]) {
      alert('Username already exists. Please choose another one.');
    } else {
      savedData[username] = password;
      localStorage.setItem('users', JSON.stringify(savedData));
      alert('Sign-Up Successful! You can now log in.');
      // Redirect to another page after successful sign-up
      window.location.href = 'welcome.html'; // Replace 'welcome.html' with the page you want to redirect to
    }
  }
}
