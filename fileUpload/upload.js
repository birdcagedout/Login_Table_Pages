const fileInput = document.getElementById("fileUpload");
var canvas = document.getElementById("canvas");

const handleFiles = (e) => {
	const selectedFile = [...fileInput.files];

	console.log(selectedFile.length);
	console.log(selectedFile);

	for (let i = 0; i < selectedFile.length; i++) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(selectedFile[i]);
		fileReader.onload = function () {
			var img = document.createElement("img");
			var br = document.createElement("br");
			img.width = '700';
			img.src = fileReader.result;
			canvas.appendChild(img);
			canvas.appendChild(br);
		};
	}
};

fileInput.addEventListener("change", handleFiles);