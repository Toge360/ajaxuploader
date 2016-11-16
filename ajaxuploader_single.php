<?php
$allowedExts = array("image/jpeg","application/pdf"); // erlaubte Endungen
$allowedSize = 6000000; // erlaubte Größe

$fileName = $_FILES["file1"]["name"]; // The file name
$fileTmpLoc = $_FILES["file1"]["tmp_name"]; // File in the PHP tmp folder
$fileType = $_FILES["file1"]["type"]; // The type of file it is
$fileSize = $_FILES["file1"]["size"]; // File size in bytes
$fileErrorMsg = $_FILES["file1"]["error"]; // 0 for false... and 1 for true

$file_ex = $_FILES["file1"]['type']; // get FileExtension

// Set Exentsion for renamed File
if ($file_ex == 'image/jpeg') {$extension = '.jpeg';}
if ($file_ex == 'application/pdf') {$extension = '.pdf';}

// Typen Check
if (in_array($file_ex, $allowedExts)) {
	$typeAllowed = "yes";
	$error = false;
} else {
	$typeAllowed = "no";
	$error = true;
	$reason = "Fehler. Die von Ihnen gewählte Datei ist vom falschen Typ. Es dürfen nur Dateien mit der Endung .jpg oder .pdf hochgeladen werden.";
}

if ($fileSize > $allowedSize) {
	$error = true;
	$reason = "Fehler. Die Dateigröße überschreitet das Maximum von 6 MB";
}

if (!$fileTmpLoc) { // if file not chosen
    $error = true;
	$reason = "Fehler. Sie haben vergessen eine Datei auszuwählen.";
}


if (!$error) {
	$random_digit = rand(000000000,999999999); // get Random Number
	$new_filename = 'userupload_'.$random_digit.''.$extension; // Build new Name
	if(move_uploaded_file($fileTmpLoc, "uploads/$new_filename")){
		echo $new_filename;
	} else {
		// Fehler
		echo "Error";
	}
} else {
	echo $reason;
	exit();
}

?>