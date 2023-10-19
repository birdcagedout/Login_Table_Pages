const excelDownload = document.querySelector('#excelDownload');

document.addEventListener('DOMContentLoaded', ()=>{
    excelDownload.addEventListener('click', exportExcel);
});

function exportExcel(){ 
  // step 1. workbook 생성
  var wb = XLSX.utils.book_new();

  // step 2. 시트 만들기 
  var newWorksheet = excelHandler.getWorksheet();

  // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
  XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

  // step 4. 엑셀 파일 만들기 
  var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

  // step 5. 엑셀 파일 내보내기 
  saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
}

var excelHandler = {
	getExcelFileName: function () {
		var d = new Date();
		var yyyy = d.getFullYear().toString();
		var mm = (d.getMonth()+1).toString();
		var dd = d.getDate().toString();
		mm = mm.length == 1 ? '0' + mm : mm;
		dd = dd.length == 1 ? '0' + dd : dd;
		return `급량페이_사용내역_${yyyy}${mm}${dd}.xlsx`;	//파일명
	},
	getSheetName: function () {
		return '식권사용내역';	//시트명
  },
	getExcelData: function () {
		return document.getElementById('tableData'); 	//TABLE id
	},
	getWorksheet: function () {
		return XLSX.utils.table_to_sheet(this.getExcelData());
	}
}

function s2ab(s) {
	var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
	var view = new Uint8Array(buf);  //create uint8array as viewer
	for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
	return buf;    
}


// 날짜가 엑셀파일에 저장될 때 어떻게 저장되는지 확인하기 위해 테스트
// 결과(toLocaleString()): 2023. 10. 19. 오후 5:57:46
// 결과(심플로직): 2023-10-19 6:17:50 PM
// 심플로직: https://gurtn.tistory.com/65
const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
const d = new Date();
const date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
const time = d.toTimeString().split(' ')[0];
const date_time = date + ' ' + time;

var elem = document.getElementsByClassName('date')[0];
elem.innerHTML = date_time;
//elem.innerHTML = dt.toLocaleString();
