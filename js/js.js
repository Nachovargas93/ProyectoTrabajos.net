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
	var apellido = $("txt_apellido").val();
	var edad = $("#txt_edad").val();
	var email = $("#txt_email").val();
	var telefono = $("#txt_telefono").val();
	var experiencias = $("#txt_experiencias").val();
	var password = $("#txt_password").val();



	var user = {
		"nombre": "",
		"apellido": "",
		"edad": "",
		"email": "",
		"telefono": "",
		"experiencias": "",
		"password": ""
	};

	user.nombre = $("#txt_nombre").val();
	user.apellido = $("#txt_apellido").val();
	user.edad = $("#txt_edad").val();
	user.email = $("#txt_email").val();
	user.telefono = $("#txt_telefono").val();
	user.experiencias = $("#txt_experiencias").val();
	user.password = $("#txt_password").val();

	var db = firebase.database();

	db.ref("usuarios").push({
		'nombre': nombre,
		'apellido': apellido,
		'edad': edad,
		'email': email,
		'telefono': telefono,
		'experiencias': experiencias,
		'password': password
	});

	firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
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
	databaseUsuarios = firebase.database().ref("/user")
}

$(document).ready(function() {
	cargar("login");
	firebase.initializeApp(config);
});
	