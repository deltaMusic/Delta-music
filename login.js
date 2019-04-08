//var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("usrnm").value;
var password = document.getElementById("passwd").value;
if ( username == "deltaStand" && password == "delta1234"){
alert ("Login successfully");
window.location = "homepage.html"; // Redirecting to other page.
return false;
}

else{
alert("The username or the password is wrong");
return false;

} 
}