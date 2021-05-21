var peticion, bd, transaccion, almacenProductos, contrasenya;

window.addEventListener("load",function(){        
    if(window.indexedDB) {
        peticion = window.indexedDB.open("supermercado");
        peticion.onsuccess = function (evento) {
            bd = peticion.result;
            transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            almacenProductos = transaccion.objectStore("productos");
            
            var todosProductos = almacenProductos.getAll();
            todosProductos.onsuccess = function(evento) {      
				productos = todosProductos.result;    
				console.log(productos);    
				var i = 0;                                 
				for(elemento in productos){					
					document.getElementById("listadoProductos").insertAdjacentHTML("beforeend","<div class='prod' id='prod"+i+"' draggable='true'></div")
					document.getElementById("prod"+i).insertAdjacentHTML("beforeend","<h1 class='nombre'>"+productos[elemento].nombre+"</h3>")					
					document.getElementById("prod"+i).insertAdjacentHTML("beforeend","<h1 class='precio'>"+productos[elemento].precio+"€</h3>")					
					document.getElementById("prod"+i).insertAdjacentHTML("beforeend","<img src='"+productos[elemento].foto+"'>")					
					i++;
				}
            }
            bd.close();
        };
        peticion.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };        
    } else {
        console.log("IndexedDB no está soportado");
    }
})