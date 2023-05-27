// Signup page
const signupForm = document.getElementById('signup-form');
const signupMessage = document.getElementById('signup-message');

signupForm.addEventListener('submit', handleSignup);

function handleSignup(e) {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (name && email && password) {
    const accessToken = generateAccessToken();
    const user = { name, email, password, accessToken };

    // Save user to local storage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    signupMessage.textContent = 'Signup successful!';
    signupMessage.classList.remove('error');
    signupMessage.classList.add('success');

    setTimeout(() => {
      showProfilePage();
    }, 1500);
  } else {
    signupMessage.textContent = 'Please fill in all fields.';
    signupMessage.classList.remove('success');
    signupMessage.classList.add('error');
  }
}

function generateAccessToken() {
  // Generate a random 16 byte string (not cryptographically secure)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 16;
  let accessToken = '';

  for (let i = 0; i < tokenLength; i++) {
    accessToken += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return accessToken;
}

// Profile page
const profilePage = document.getElementById('profile-page');
const profileInfo = document.getElementById('profile-info');
const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', handleLogout);

function showProfilePage() {
  const user = JSON.parse(localStorage.getItem('user'));
  profileInfo.textContent = `Name: ${user.name}\nEmail: ${user.email}`;

  document.getElementById('signup-page').style.display = 'none';
  profilePage.style.display = 'block';
}

function handleLogout() {
  localStorage.clear();
  location.reload();
}

// Check authentication
if (localStorage.getItem('accessToken')) {
  showProfilePage();
} else {
  document.getElementById('signup-page').style.display = 'block';
}
