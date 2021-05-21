if(window.indexedDB){
  const dbName = "supermercado";
  var request = indexedDB.open(dbName, 2);
  const productData = [
    {nombre: "Dinosaurus", precio:2, foto: "fotos/dinosaurs.jpg" },
    {nombre: "Oreo", precio:3, foto: "fotos/oreo.jpg" }
  ];

  request.onerror = function(event) {

  };
  request.onupgradeneeded = function(event) {
    var db = event.target.result;

    var objectStore = db.createObjectStore("productos", { keyPath: "nombre" });

    objectStore.createIndex("nombre", "nombre", { unique: true });

    objectStore.createIndex("precio", "precio", { unique: false });

    objectStore.createIndex("foto", "foto", { unique: true });

    objectStore.transaction.oncomplete = function(event) {
      var productObjectStore = db.transaction("productos", "readwrite").objectStore("productos");
      for (var i in productData) {
        productObjectStore.add(productData[i]);
      }
    }   
  }
}