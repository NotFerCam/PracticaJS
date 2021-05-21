document.getElementById("genPDF").addEventListener("click",function(){    
    var peticion, bd, transaccion, almacenProductos, contrasenya;    
    if(window.indexedDB) {
        peticion = window.indexedDB.open("supermercado");
        peticion.onsuccess = function (evento) {
            bd = peticion.result;
            transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            transaccion.oncomplete = function(evento) {
                console.log("Consulta terminada")
            };
            almacenProductos = transaccion.objectStore("productos");
            
            var todosProductos = almacenProductos.getAll();
            todosProductos.onsuccess = function(evento) { 
                console.log("papilla")     
                var productos = todosProductos.result;    
                console.log(productos);                                    
                var doc = new jsPDF();
                for(elemento in productos){					
                    doc.text(40, 20, productos[elemento].nombre);					
                    //doc.text(40, 20, productos[elemento].precio);		
                    //doc.text(40, 20, productos[elemento].foto);	
                    console.log("fsfdasedf")				
                }
                doc.save("productos.pdf");
                var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
                if(es_chrome) {
                    var win = window.open();
                    win.document.write('<iframe src="' + doc.output('datauri')  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
                }
                var es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                if(es_firefox) {
                    doc.output('datauri');
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