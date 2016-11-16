// Ajax Uploader
// V1.0
// Tobias Gerlach
// tobias@gerlach360.de
	
function _(el){return document.getElementById(el);}

function uploadFile(){
	// setup
	var error = false;
	var reason;
	var allowedFormats = Array("image/jpeg", "application/pdf"); // erlaubte Formate
	var allowedSize = 6000000; // erlaubte Größe
	
	// grab
	var file = _("file1").files[0];
	
	if (file) {
		
		//alert(file.name+" | "+file.size+" | "+file.type);
		
		// check Fileformat with Function below
		if(allowedFormats.inArray(file.type)) {
			// ist im Array
		} else {
			// Fehler: nicht im Array
			error = true;
			reason = 'Fehler. Die von Ihnen gewählte Datei ist vom falschen Typ. Es dürfen nur Dateien mit der Endung .jpg oder .pdf hochgeladen werden.';
		}
		
		// check Filesize
		if(file.size > allowedSize) {
			// Fehler: zu groß
			error = true;
			reason += ' Fehler. Die Dateigröße überschreitet das Maximum von 6 MB';
		}
		
		if (!error) {
			var formdata = new FormData();
			formdata.append("file1", file);
			var ajax = new XMLHttpRequest();
			ajax.upload.addEventListener("progress", progressHandler, false);
			ajax.addEventListener("load", completeHandler, false);
			ajax.addEventListener("error", errorHandler, false);
			ajax.addEventListener("abort", abortHandler, false);
			ajax.open("POST", "ajaxuploader_single.php");
			ajax.send(formdata);
		} else {
			// Fehler Out
			alert(reason);
		}
	} else {
		// Keine Datei ausgewählt
		alert("Fehler. Sie haben vergessen eine Datei auszuwählen.");
	}
}

function progressHandler(event){
	
	//_("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
	var percent = (event.loaded / event.total) * 100;
	_("progressBar").value = Math.round(percent);
	_("status").innerHTML = Math.round(percent)+"% hochgeladen. Bitte warten Sie.";
}


function completeHandler(event){
	_("status").innerHTML = "Die Datei wurde erfolgreich hochgeladen.";
	_("progressBar").value = 0;
	_("filename").innerHTML = event.target.responseText;	// Name der hochgeladenen Datei
}

function errorHandler(event){
	_("status").innerHTML = "Upload Failed";
}

function abortHandler(event){
	_("status").innerHTML = "Upload Aborted";
}

// IN Array javascrip Function
Array.prototype.inArray = function (value){var i;for (i=0; i < this.length; i++) {if (this[i] == value){return true;}}return false;};

