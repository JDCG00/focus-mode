console.log("off.js loaded");

if (document.getElementById("html-404")) {
	console.log(document.getElementById("html-404"));
	const focusMode = document.getElementById("html-404");
	focusMode.remove();
} else {
	console.log("no focus mode div");
}
