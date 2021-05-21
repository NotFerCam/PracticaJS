document.getElementById("iniciar").addEventListener("click",function(){
    var user = $("#user").val();
    var pass = $("#pass").val();

    localStorage.setItem("nombre","root");
    localStorage.setItem("passw","toor");    

    if(user==localStorage.getItem("nombre") && pass==localStorage.getItem("passw")){
        window.location = "adminSite.html"; 
    }else{
        document.getElementById("error").textContent = "Uusario o contraseña no válido"   
    }
})