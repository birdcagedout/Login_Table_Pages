const fileInput = document.getElementById("fileUpload");
var canvas = document.getElementById("canvas");

const handleFiles = (e) => {

	// 이미 올라간 사진이 있다면 지운다
	var uploadedPics = document.getElementsByClassName("uploaded");
	if (uploadedPics.length > 0) {
		for (var i = 0; i < uploadedPics.length; i++) {
			canvas.removeChild(uploadedPics[i]);
		}
	}
	
	// 선택된 파일 가져와서 img태그 붙인다
	const selectedFile = [...fileInput.files];

	for (let i = 0; i < selectedFile.length; i++) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(selectedFile[i]);
		fileReader.onload = function () {
			var img = document.createElement("img");
			var br = document.createElement("br");
			img.src = fileReader.result;
			img.classList.add("uploaded");
			canvas.appendChild(img);
			canvas.appendChild(br);
		};
	}
};

fileInput.addEventListener("change", handleFiles);