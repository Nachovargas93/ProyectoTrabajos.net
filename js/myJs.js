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

function cargarPersona(x) {
	let dbUsusarios = firebase.database().ref('usuarios');
	databaseUsuarios.on('value', snapshot =>{
  	snapshot.forEach(snap => {
  		let div = document.createElement('div');
  		let input = document.createElement('input');
  		div.ClassList = "col-md-3";
  		input.type = "image";
  		input.src = snap.val().photoURL;
  		div.ClassList = "col-md-5";

  		$("#fila").append(div);
	})
  });

}

$(document).ready(function() {
	cargar("login");
	firebase.initializeApp(config);
});
	