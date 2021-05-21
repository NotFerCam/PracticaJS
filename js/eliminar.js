document.getElementById("eliminar").addEventListener("click",function(){
    if (window.indexedDB) {
        request = window.indexedDB.open("supermercado");
        
        request.onsuccess = function (evento) {
            bd = evento.target.result;
            transaccion = bd.transaction(bd.objectStoreNames,"readwrite");
    
            almacenProd = transaccion.objectStore("productos");
            almacenProd.delete(document.getElementById(seleccionado).getElementsByTagName("h1")[0].textContent);
            
            location.reload();            
        };            
    
        request.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };
    
    
        request.onupgradeneeded = function (evento) {
            console.log("Upgradeneeded");
        };
    } else {
        console.log("IndexedDB no está soportado");
    }
})

document.getElementById("cancelar").addEventListener("click",function(event){
    document.getElementById(seleccionado).style.backgroundColor = "rgb(77, 202, 104)";
    document.getElementById(seleccionado).style.border = "green solid 2px";    
    localStorage.setItem("seleccionado","false");

    document.getElementById("cancelar").style.display = "none";
    document.getElementById("eliminar").style.display = "none";        
})