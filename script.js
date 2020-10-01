var input = "";

window.onload = () => {

	


	var htmlcodes = document.getElementById('input').innerText;

	console.log(htmlcodes);

	var dropdown = "<option></option>"; 

	for(var i = 0, length1 = localStorage.length; i < length1; i++){
		dropdown += "<option>" +  localStorage.key(i) + "<\/option>"
	}

	document.getElementById('projectlist').innerHTML = dropdown;
}

const showPreview = () => {
	input = "";

	input += "<style>\n" + document.getElementById('CSSinput').innerText + "<\/style>\n";
	input += "<script>\n" + document.getElementById('JSinput').innerText + "<\/script>\n";
	input += "<body>\n" + document.getElementById('input').innerText + "<\/body>\n";

	var config = "data:text/html; charset=UTF8,";
	var head = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	`
	document.getElementById('output').src = config + "<html>" + "<head>" + head + "<\/head>" + "<body>" + input + "<\/body>" + "<\/html>";
	console.log(input)
}


window.addEventListener("keydown" , (e) => {
	if ((event.ctrlKey || event.metaKey) && (e.key == 's' || e.key == 'S')) {
		e.preventDefault();

		var filename = prompt("Enter the name : ");
		var a = document.createElement("a");
		var text = document.createTextNode("Download The File");
		a.href = "data:application/octet-stream, " + encodeURIComponent("<html>" + input + "<\/html>");
		a.download = filename;
		a.id = "link";
		a.append(text);
		document.getElementById('download').appendChild(a);
		a.click();
		document.getElementById('link').remove();
		console.log(a);
	} 
});


const saveProject = () => {
	var projectName = document.getElementById('project').value;
	if (projectName.trim() == "" || projectName == null) {
		alert("Project name can't be blank");
		return;
	}

	var cssinput = document.getElementById('CSSinput').innerText;
	var jsinput = document.getElementById('JSinput').innerText;
	var input = document.getElementById('input').innerText;

	var obj = {};
	obj.css = cssinput;
	obj.js = jsinput;
	obj.html = input;


	localStorage.setItem(projectName , JSON.stringify(obj));
	alert(projectName +" Project has been saved successfully!!")
}

const delProject = () => {
	var projName = prompt("Enter the project Name");

	localStorage.removeItem(projName);

	alert(projName + " Project has been deleted successfully!!");
}


const populateProject = () => {
	var projectName = document.getElementById('projectlist').value;
	var data = localStorage.getItem(projectName);
	var obj = JSON.parse(data)

	document.getElementById('CSSinput').innerText = obj.css;
	document.getElementById('JSinput').innerText = obj.js;
	document.getElementById('input').innerText = obj.html;
}

