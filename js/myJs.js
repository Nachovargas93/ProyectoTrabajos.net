var config = {
        apiKey: "AIzaSyBmFKnM5JQIKgHUz7aB2eUbXqpeAXg0DWY",
        authDomain: "trabajosnet01.firebaseapp.com",
        databaseURL: "https://trabajosnet01.firebaseio.com",
        projectId: "trabajosnet01",
        storageBucket: "trabajosnet01.appspot.com",
        messagingSenderId: "519327363611"
    };
firebase.initializeApp(config);

function cargar(carga) {
	$('#container').load(carga + ".html");
}

function register() {
	console.log("hola");
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
		"uid":""
	};

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

function cargarPersona() {
	helper = "<div class='col-md-3'>\
	<a href='#'>\
	<img class='img-thumbnail' src='http://placehold.it/200x200' alt=''>\
	</a>\
	</div>\
	<div class='col-md-5'>\
	<h3>Project Two</h3>\
	<p></p>\
	<a class='btn btn-primary' href='#'>View Project</a>\
	</div>"
	let databaseUsuarios = firebase.database().ref('usuarios');
	databaseUsuarios.on('value', snapshot =>{
  	snapshot.forEach(snap => {
  		let div_padre = document.createElement('div');
  		let div = document.createElement('div');
  		let nombre_apellido = document.createElement('h3');
  		let datos = document.createElement('ul');
  		let edad = document.createElement('li');
  		let email = document.createElement('li');
  		let telefono = document.createElement('li');
  		let experiencias = document.createElement('li');
  		div_padre.className = "card";
  		div.className = "card-block";
  		nombre_apellido.className = "card-title";
  		nombre_apellido.innerText = snap.val().nombre + " " +snap.val().apellido;
  		edad.innerText = snap.val().edad;
		email.innerText = snap.val().email;
		telefono.innerText = snap.val().telefono;
		experiencias.innerText = snap.val().experiencias;
  		div.append(nombre_apellido);
  		datos.append(edad);
  		datos.append(email);
  		datos.append(telefono);
  		datos.append(experiencias);
  		div.append(datos);
		div_padre.append(div);
  		$("#fila").append(div_padre);
	})
  });

}

$(document).ready(function() {
	cargar("login");
	firebase.initializeApp(config);
});
	