const users = [];
let editingIndex = null; 
document.getElementById('registerUserForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const cpf = document.getElementById('cpf').value;
    const address = document.getElementById('address').value;
    const role = document.getElementById('role').value;

    
    if (editingIndex !== null) {
        
        users[editingIndex] = { username, email, phone, cpf, address, role };
        editingIndex = null; 
    } else {
        
        const user = { username, email, phone, cpf, address, role };
        users.push(user);
    }

    
    updateUsersTable();
    
    
    this.reset();
});

function updateUsersTable() {
    const tbody = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; 

    users.forEach((user, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = user.username;
        row.insertCell(1).innerText = user.email;
        row.insertCell(2).innerText = user.phone;
        row.insertCell(3).innerText = user.cpf;
        row.insertCell(4).innerText = user.address;
        row.insertCell(5).innerText = user.role;

        
        const editCell = row.insertCell(6);
        const editButton = document.createElement('button');
        editButton.innerText = 'Editar';
        editButton.onclick = function() {
            editUser(index); 
        };
        editCell.appendChild(editButton);

       
        const deleteCell = row.insertCell(7);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Excluir';
        deleteButton.onclick = function() {
            users.splice(index, 1); 
            updateUsersTable(); 
        };
        deleteCell.appendChild(deleteButton);
    });
}

function editUser(index) {
    const user = users[index];
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    document.getElementById('cpf').value = user.cpf;
    document.getElementById('address').value = user.address;
    document.getElementById('role').value = user.role;

    editingIndex = index; 
}