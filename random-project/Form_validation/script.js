var name_error = document.getElementById("name-error")
var phone_error = document.getElementById("phone-error")
var email_error = document.getElementById("email-error")
var message_error = document.getElementById("message-error")
var submit_error = document.getElementById("submit-error")

function validate_name() {
    var name = document.getElementById("contact-name").value;
    if (name.length == 0) {
        name_error.innerHTML = 'Name is required'
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        name_error.innerHTML = "Write full name"
        return false;
    }
    name_error.innerHTML = `<i class="fa fa-check-circle" style="color: green"></i>`;
    return true;

}


function validate_phone() {
    var phone = document.getElementById("contact-phone").value;
    if (phone.length == 0) {
        phone_error.innerHTML = "Phone no. is required";
        return false;
    }
    if (phone.length !== 10) {
        phone_error.innerHTML = "Phone no. should be 10 digits";
        return false;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
        phone_error.innerHTML = "Phone no. should be 10 digits";
        return false;
    }
    phone_error.innerHTML = `<i class="fa fa-check-circle" style="color: green"></i>`;
    return true;
}

function validate_email() {
    var email = document.getElementById("contact-email").value;
    if (email.length == 0) {
        email_error.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        email_error.innerHTML = "Email Invalid";
        return false
    }
    email_error.innerHTML = `<i class="fa fa-check-circle" style="color: green"></i>`;
    return true;
    
}

function validate_message(){
    var message = document.getElementById("contact-message").value;
    var required = 30;

    var left = required-message.length;

    if(left>0){
        message_error.innerHTML = left + ' more characters required';
        return false;
    }
    message_error.innerHTML = `<i class="fa fa-check-circle" style="color: green"></i>`;
    return true
}

function validate_form(){
    if(!validate_name() || !validate_phone() || !validate_email || !validate_message){
        submit_error.style.display = 'block'
        submit_error.innerHTML = "Please fix the error to submit"
        setTimeout(() => {
            submit_error.style.display = 'none'
        }, 3000);
        return false;
    }
}