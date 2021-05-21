document.getElementById("modificar").addEventListener("click",function(){
    if (window.indexedDB) {
        request = window.indexedDB.open("supermercado");

        request.onsuccess = function (evento) {
            bd = evento.target.result;
            transaccion = bd.transaction(bd.objectStoreNames,"readwrite");

            almacenProds = transaccion.objectStore("productos");

            if(document.getElementById("nombreDrag").value!=""){
                var nombreP = document.getElementById("nombreDrag").value;
                var precioP = document.getElementById("precioDrag").value;
                var fotoP = document.getElementById("fileFotoDrag").files[0].name;
                almacenProds.put({nombre:nombreP,precio:precioP,foto:"fotos/"+fotoP});    
                location.reload();
            }
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