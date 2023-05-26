// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const disInput = document.querySelector('#dis');
const catInput = document.querySelector('#cat');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    if(amountInput.value === '' || disInput.value === '' || catInput.value === '') {
        // alert('Please enter all fields');
       alert("input all fields")
    
    }
        else{
    let amount = amountInput.value;
    let description = disInput.value;
    let category = catInput.value;
    let obj ={
        amount,
        description, category
    }


    // storing the items 
    const existingData = JSON.parse(localStorage.getItem(amount)) || [];
    existingData.push(obj);

    localStorage.setItem(amount, JSON.stringify(existingData));

    var lii = document.createElement('li');

    // Add class
    lii.className = 'list-group-item';
    // Add text node with input value
    lii.appendChild(document.createTextNode("Amount="+amountInput.value + ' ' + '||'+" "));
    lii.appendChild(document.createTextNode(disInput.value + ' ' + '||'+" "));
    lii.appendChild(document.createTextNode(catInput.options[catInput.selectedIndex].textContent+ ' '));
    userList.appendChild(lii);

    // Create del button element
    var deleteBtn = document.createElement('button');

    // Add classes to del button
    deleteBtn.className = 'btn btn-danger btn-sm float-end';

    // Append text node
    deleteBtn.appendChild(document.createTextNode('Delete'));

    // Append del button to li
    lii.appendChild(deleteBtn);

    // Append li to list
    userList.appendChild(lii);

    // Create del button element
    var editBtn = document.createElement('button');

    // Add classes to del button
    editBtn.className = 'btn btn-warning  btn-sm float-end';

    // Append text node
    editBtn.appendChild(document.createTextNode('Edit'));

    // Append del button to li
    lii.appendChild(editBtn);

    // Append li to list
    userList.appendChild(lii);


  deleteBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const existingData = JSON.parse(localStorage.getItem(amount)) || [];

    existingData.splice(existingData.findIndex(itemm => itemm.amount === amount && itemm.description === dis && itemm.category === cat), 1);
      localStorage.setItem(amount, JSON.stringify(existingData));
      if(existingData.length === 0) {
        localStorage.removeItem(amount);
      }

    lii.remove();
  });
  
   editBtn.addEventListener('click', function(e) {
    e.preventDefault();
   
 // retrieve the name and email from the clicked list item and display them in the form fields
 amountInput.value = amount;
 disInput.value = dis;
 catInput.value = cat;
 
 const existingData = JSON.parse(localStorage.getItem(amount)) || [];

 existingData.splice(existingData.findIndex(itemm => itemm.amount === amount && itemm.description === dis  && itemm.category === cat), 1);
      localStorage.setItem(amount, JSON.stringify(existingData));
      if(existingData.length === 0) {
        localStorage.removeItem(amount);
      }

 // remove the list item from the DOM
 lii.remove();
    
  });

  // clear the fields 
  amountInput.value ='' ;
  disInput.value = '';
  catInput.selectedIndex = 0;
  }
}
