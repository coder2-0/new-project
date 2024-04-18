function login() {
    var fullname = document.getElementById('fullname').value;
    var contact = document.getElementById('contact').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var message = document.getElementById('message');

    if (!fullname || !contact || !email || !password) {
        message.innerHTML = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

   
    if (email.endsWith('@owner.com')) {
        window.location.href = 'owner.html';
    } else if (email.endsWith('@worker.com')) {
        window.location.href = 'employee.html';  
    } else {
        message.innerHTML = "Please use a valid company email to log in.";
        message.style.color = "red";
    }
    
}
