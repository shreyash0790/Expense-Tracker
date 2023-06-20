const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const disInput = document.querySelector('#dis');
const catInput = document.querySelector('#cat');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  if (amountInput.value === '' || disInput.value === '' || catInput.value === '') {
    alert("input all fields");
  } else {
    let amount = amountInput.value;
    let description = disInput.value;
    let category = catInput.options[catInput.selectedIndex].textContent;
    let obj = {
      amount,
      description,
      category
    };

    axios.post("https://crudcrud.com/api/9d5642ba72d84acf8a032bca74cf6f84/objDATA", obj)
      .then((response) => {
        console.log(response);
        createListItem(obj); // Create and append list item
        clearFields(); // Clear input fields
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  axios.get('https://crudcrud.com/api/9d5642ba72d84acf8a032bca74cf6f84/objDATA')
    .then((response) => {
      const users = response.data; // Assuming the response contains an array of user objects

      // Clear the user list
      userList.innerHTML = '';

      // Iterate over each user and create list items
      users.forEach((user) => {
        createListItem(user);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

function createListItem(user) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(`${user.category} => ${user.description} || ${user.amount}`));

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-end';
  deleteBtn.appendChild(document.createTextNode('Delete'));

  // Create edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-warning btn-sm float-end';
  editBtn.appendChild(document.createTextNode('Edit'));

  // Append buttons to list item
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  // Append list item to user list
  userList.appendChild(li);

  // Delete button click event handler
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userId = user._id;
    axios.delete(`https://crudcrud.com/api/9d5642ba72d84acf8a032bca74cf6f84/objDATA/${userId}`)
      .then((response) => {
        console.log(response);
        li.remove();
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Edit button click event handler
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const userId = user._id;
    amountInput.value = user.amount;
    disInput.value = user.description;
    catInput.selectedIndex = user.category;

    li.remove();
    performUpdate();

    function performUpdate() {
      const updatedamount = amountInput.value;
      const updateddiscription = disInput.value;
      const updatedcategory = catInput.selectedIndex;

      // Update the user object
      const updatedUser = {
        _id: userId,
        amount: updatedamount,
        discription: updateddiscription,
        category: updatedcategory
      };

      // Send a PUT request to the CRUD API to update the user
      axios.put(`https://crudcrud.com/api/9d5642ba72d84acf8a032bca74cf6f84/objDATA/${userId}`, updatedUser)
        .then((response) => {
          // Handle successful update
          console.log(response);

          // Update the list item text with the updated values
          li.firstChild.textContent = `${updatedamount} => ${updateddiscription}  => ${updatedcategory}`;

          clearFields(); // Clear input fields
        })
        .catch((error) => {
          // Handle error during update
          console.log(error);
        });
      axios.delete(`https://crudcrud.com/api/9d5642ba72d84acf8a032bca74cf6f84/objDATA/${userId}`)
        .then((response) => {
          console.log(response);
          li.remove();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}

function clearFields() {
  amountInput.value = '';
  disInput.value = '';
  catInput.selectedIndex = 0;
}