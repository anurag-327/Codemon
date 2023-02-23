const savebtn=document.querySelector(".savebtn");
const runbtn=document.querySelector(".run");

const loader=document.querySelector("#loader");
window.addEventListener("load",() =>
{
   loader.classList.add("hidden");
})
var editor = CodeMirror.fromTextArea(document.getElementById('codebox'), {
    lineNumbers: true,
    mode: 'text/x-c++src',    
    theme: "abbott", 
    matchBrackets: true,
    smartIndent: true,
});
editor.setSize("100%",570);

runbtn.addEventListener('click', async () =>{
    const val=document.querySelector("#codebox").value;
    const output=document.querySelector(".output");
    const input=document.querySelector(".input").value;
    console.log("code",val);
    console.log("input",input);
     let options={
        method:"POST",
        headers:
        {
            "Content-type":"application/json"
        },
        body:JSON.stringify({code:editor.getValue(),input:input})
    }
     let p= await fetch("http://localhost:5000/compile",options);
     let response= await p.json();
     console.log(response);
     if(response.error)
     {
        // console.log(response.error);
        // const place=response.error.indexOf("error");
        const error=response.error.slice(48,response.error.length);
        console.log(error);
        // const errmessage=response.error.slice(toString(response.error.indexof("error")),23)
        output.classList.add("text-red-800");
        // output.innerHTML="";
        output.value=error;
     }
     else
     {
        output.innerHTML="";
        output.value=response.output;
        output.classList.remove("text-red-800");
        output.classList.add("text-black");
     }


})

savebtn.addEventListener('click',() =>
{
    const val=document.querySelector("#codebox").value;
    // console.log(val);
    alert("save pressed")
    var textfileasblob=new Blob([val],{type:"text/plain"});
    var downloadlink=document.createElement("a");
    downloadlink.download="code.cpp";
    downloadlink.innerhtml="download code";
    if(window.webkitURL!=null)
    {
        downloadlink.href=window.webkitURL.createObjectURL(textfileasblob);
    }
    else
    {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    	downloadLink.onclick = destroyClickedElement;
    	downloadLink.style.display = "none";
    	document.body.appendChild(downloadLink);
        alert("not allowed")
    }
    downloadlink.click();

})