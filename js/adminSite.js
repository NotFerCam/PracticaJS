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
                prods = [];

                for(j=0;j<i;j++){
                    prods[j] = document.getElementById("prod"+j);                    
                }


                localStorage.setItem("seleccionado","false");

                for(i=0;i<prods.length;i++){
                    prods[i].addEventListener("click",function(){
                        if(localStorage.getItem("seleccionado")=="false"){
                            this.style.backgroundColor = "pink";
                            this.style.border = "red solid 2px";
                            localStorage.setItem("seleccionado","true");   
                            
                            document.getElementById("eliminar").style.display = "inline";
                            document.getElementById("cancelar").style.display = "inline";

                            seleccionado = this.id;
                        }                     
                    })  
                    prods[i].addEventListener("drag",function(){
                        nombrePrecio = this.getElementsByTagName("h1");   
                        fotoDrag = this.getElementsByTagName("img");
                    })                                                    
                }  

                document.getElementById("mod").addEventListener("dragenter",function(){
                    document.getElementById("nombreDrag").value = nombrePrecio[0].textContent;
                    document.getElementById("precioDrag").value = nombrePrecio[1].textContent;                    
                })
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

document.getElementById("limpiar").addEventListener("click",function(){
    document.getElementById("nombreDrag").value = "";
    document.getElementById("precioDrag").value = "";                    
})

window.addEventListener("storage",function(){
    console.log("fdsf")    
})
