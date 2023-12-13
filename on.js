console.log("on.js loaded");

// Create a div element if doesn't exist
if (!document.getElementById("html-404")) {
	var url = chrome.runtime.getURL("404/404.html");

	fetch(url)
		.then((response) => response.text())
		.then((html) => {
			console.log("html: ", html);
			// Crear un nuevo elemento div y agregar el HTML cargado
			var newDiv = document.createElement("div");
			newDiv.id = "html-404";
			newDiv.innerHTML = html;

			// Insertar el nuevo contenido en el cuerpo de la página
			document.body.appendChild(newDiv);
		})
		.catch((error) => console.error("Error al cargar el archivo HTML:", error));
	var cssUrl = chrome.runtime.getURL("404/404.css");
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = cssUrl;

	document.head.appendChild(link);
} else {
	console.log("focus mode div already exists");
}
