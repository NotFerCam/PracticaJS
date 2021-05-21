document.getElementById("fileFoto").addEventListener("change",function(){
    fotop = "fotos/"+document.getElementById("fileFoto").files[0].name;
})
document.getElementById("insertar").addEventListener("click",function(){    
    if (window.indexedDB) {
        var nombrep = $("#nombreprod").val();
        var preciop = $("#precioprod").val();
        request = window.indexedDB.open("supermercado");
    
        request.onsuccess = function (evento) {
            console.log("Success");
    
            bd = evento.target.result;
            transaccion = bd.transaction(bd.objectStoreNames,"readwrite");
    
            almacenProd = transaccion.objectStore("productos");
            
            almacenProd.add({nombre:nombrep,precio:preciop+"€",foto:fotop});
            
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