const logout = async () => {
  console.log('Sending logout request...')
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log("User logged out")
    document.location.replace('/login');
    alert("User logged out")
  } else {
    alert('Error logging out');
  }
};

document.querySelector('.logout').addEventListener('click', logout);
