var config = {
        apiKey: "AIzaSyBmFKnM5JQIKgHUz7aB2eUbXqpeAXg0DWY",
        authDomain: "trabajosnet01.firebaseapp.com",
        databaseURL: "https://trabajosnet01.firebaseio.com",
        projectId: "trabajosnet01",
        storageBucket: "trabajosnet01.appspot.com",
        messagingSenderId: "519327363611"
    };


function cargar(carga) {
	$('#container').load(carga + ".html");
}

function register() {
	var nombre = $("#txt_nombre").val();
	var apellido = $("#txt_apellido").val();
	var edad = $("#txt_edad").val();
	var email = $("#txt_email").val();
	var telefono = $("#txt_telefono").val();
	var experiencias = $("#txt_experiencias").val();
	var password = $("#txt_password").val();

	console.log(nombre);
	console.log(apellido);
	console.log(edad);
	console.log(email);
	console.log(telefono);
	console.log(experiencias);
	console.log(password);


	var user = {
		"nombre": "",
		"apellido": "",
		"edad": "",
		"email": "",
		"telefono": "",
		"experiencias": "",
		"uid":"",
 	}

	console.log(user);

	user.nombre = nombre
	user.apellido = apellido
	user.edad = edad
	user.email = email
	user.telefono = telefono
	user.experiencias = experiencias

	firebase.auth().createUserWithEmailAndPassword(user.email, password).then(function(usuario) {
		var db = firebase.database();
		user.uid = usuario.uid
		db.ref("usuarios").push(user);
	}).catch(function(error) {
		console.log(error.code);
		console.log(error.message);
	});


}

function login() {
	var email = $('#txt_email').val();
	var password = $('#txt_password').val();

	var user = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		console.log(error.code);
		console.log(error.message);
	});

	console.log(user);
	cargar('personas');
}

function leerUsuarios() {
	databaseUsuarios = firebase.database().ref("usuarios")
}

function escribirDatos(json) {
    var elemento = firebase.database().ref("/usuario/").push(json);
    var storageRef = firebase.storage().ref().child("usuarios/" + elemento.key + ".jpg");
    var file = document.getElementById('SubirFoto').files[0];
    console.log(file);
    storageRef.put(file).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
    });
    cargarPersona();
}


//function cargarPersona() {
	//helper = "<div class='col-md-3'>\
	//<a href='#'>\
	//<img class='img-thumbnail' src='http://placehold.it/200x200' alt=''>\
	//</a>\
	//</div>\
	//<div class='col-md-5'>\
	//<h3>Project Two</h3>\
	//<p></p>\
	//<a class='btn btn-primary' href='#'>View Project</a>\
	//</div>"
	//let databaseUsuarios = firebase.database().ref('usuarios');
	//databaseUsuarios.on('value', snapshot =>{
  	//snapshot.forEach(snap => {
  	//	let div_padre = document.createElement('div');
  	//	let div = document.createElement('div');
  	//	let nombre_apellido = document.createElement('h3');
  	//	let datos = document.createElement('ul');
  	//	let edad = document.createElement('li');
  	//	let email = document.createElement('li');
  	//	let telefono = document.createElement('li');
  	//	let experiencias = document.createElement('li');
//
  	//	var imagen = document.createElement('img');
    //    firebase.storage().ref().child("usuarios/" + childSnapshot.key + ".jpg").getDownloadURL().then(function (url) {
    //    imagen.src = url;
    //    });
    //    imagen.classList = "card-img-top"
  	//	div_padre.className = "card";
  	//	div.className = "card-block";
  	//	nombre_apellido.className = "card-title";
  	//	nombre_apellido.innerText = snap.val().nombre + " " +snap.val().apellido;
  	//	edad.innerText = snap.val().edad;
	//	email.innerText = snap.val().email;
	//	telefono.innerText = snap.val().telefono;
	//	experiencias.innerText = snap.val().experiencias;
//
  	//	div.append(nombre_apellido);
  	//	datos.append(edad);
  	//	datos.append(email);
  	//	datos.append(telefono);
  	//	datos.append(experiencias);
  	//	div.append(datos);
  	//	div.append(imagen);
	//	div_padre.append(div);
  	//	$("#fila").append(div_padre);
	//})
 // });


function cargarPersona() {
    var div1 = document.getElementById('div1');
    var leadsRef = firebase.database().ref('usuarios');
    leadsRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData);

            //CREAR DIV
            var div = document.createElement('div');
            div.classList = "col-lg-4 col-sm-6 text-center mb-4";

            //CREAR IMAGEN
            var imagen = document.createElement('img');
            firebase.storage().ref().child("usuarios/" + childSnapshot.key + ".jpg").getDownloadURL().then(function (url) {
                imagen.src = url;
            });
            imagen.classList = "rounded-circle img-fluid d-block mx-auto"

            //CREAMOS TITULO
            var h3 = document.createElement('h3');

            //CREAMOS TEXTO
            var textoPersona = document.createElement('p');

            // AGREAMOS LO CREADO
            
            div.append(imagen);
            div.append(h3);
            div.append(textoPersona);

            // SETEAMOS EL TEXTO
            h3.innerHTML = childData.modelo;
            textoPersona.innerHTML = '<hr>' +
                "Nombre: " + childData.select + '<br>' +
                "Apellido: " + childData.apellido + '<br>' +
                "edad: " + childData.precio + '<br>' +
                "Estado: " + childData.estado + '<br>' + '<hr>' +
                "Telefono: " + childData.telefono + '<br>' +
                "Email: " + childData.email + '<br>' + '<hr>' +
                "experiencias: " + childData.email + '<br>' + '<hr>' +
                "Descripcion: " + childData.descripcion;

            //texto.innerHTML = childData.apellido;
            //        div.innerHTML = "<h3></h3>" + "<p></p>";
            //        console.log(div); 
            //        document.getElementById("troll").innerHTML = div;
            //        console.log(document.getElementById("troll"));
        });
    });


}

$(document).ready(function() {
	cargar("login");
	firebase.initializeApp(config);
});

