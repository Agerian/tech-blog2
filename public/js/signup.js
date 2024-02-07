const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log('Signup form submitted')
    
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();

    if (!email || !password || !username) {
        alert('Please enter a valid email, username, and password');
        return;
    }

    const response = await fetch('/api/user', { 
        method: 'POST',
        body: JSON.stringify({ email, password, username }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        try {
            const error = await response.json();
            alert(error.message);
        } catch (err) {
            console.error(err);
            alert('Failed to sign up');
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);