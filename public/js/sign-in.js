var nameForm = document.querySelector("#user");

const addUser = event => {
    event.preventDefault();
    const username = nameForm.querySelector("#username").value;
    const email = nameForm.querySelector("#email").value;

    const formData = { username, email };
    fetch('/api/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(postResponse => {
            alert("User created successfully!");
            console.log(postResponse);
        })
        .catch(err => {
            console.log(err);

        })


}

nameForm.addEventListener("submit", addUser);