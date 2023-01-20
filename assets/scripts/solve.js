const savebtn=document.querySelector(".savebtn");
const runbtn=document.querySelector(".runbtn");
const submitbtn=document.querySelector(".submitbtn");
const questionid=document.querySelector("#questionid");
const expectedoutputfailure=document.querySelector(".expectedoutputfailure");
const inputfailure=document.querySelector(".inputfailure");
const outputfailure=document.querySelector(".outputfailure");
const submitresultdiv=document.querySelector(".submitresultdiv");
const inputdiv=document.querySelector(".inputdiv");
const outputdiv=document.querySelector(".outputdiv");
const resultdiv=document.querySelector(".resultdiv");
const loader=document.querySelector(".loader");
var editor = CodeMirror.fromTextArea(document.getElementById('codebox'), {
    lineNumbers: true,
    mode: 'text/x-c++src',    
    theme: "ayu-dark", 
    matchBrackets: true,
    smartIndent: true,
    viewportMargin:Infinity,
});
editor.setSize("100%",450);

const resultstatus=document.querySelector(".resultstatus");
const expectedoutputdiv=document.querySelector(".expectedoutputdiv");
const expectedoutput=document.querySelector(".expectedoutput").value;

runbtn.addEventListener('click', async () =>{
    // expectedoutputdiv.classList.remove("hidden")
    loader.classList.remove("hidden");
   
    resultdiv.classList.add("hidden");
    submitresultdiv.classList.add("hidden");
    const val=document.querySelector("#codebox").value;
    const output=document.querySelector(".output");
    const input=document.querySelector(".input").value;
    // console.log(input);
     let options={
        method:"POST",
        headers:
        {
            "Content-type":"application/json"
        },
        body:JSON.stringify({code:editor.getValue(),input:input,expectedoutput:expectedoutput})
    }
     let p= await fetch("/solve/run",options);
     let response= await p.json();
     if(response.error)
     {
        
        const error=response.error.slice(0,response.error.length);
        output.classList.add("text-red-800");
        // output.innerHTML="";
        output.value=response.error;
     }
     else
     {
        output.innerHTML="";
        output.value=response.output;
        
        output.classList.remove("text-red-800");
        output.classList.add("text-black");
     }

     loader.classList.add("hidden");
})

submitbtn.addEventListener("click",async () =>
{
    const points=document.querySelector(".points");
    const output=document.querySelector(".output");
    loader.classList.remove("hidden");

    let options={
        method:"POST",
        headers:
        {
            "Content-type":"application/json"
        },
        body:JSON.stringify({code:editor.getValue(),id:questionid.value})
    }
    let p=await fetch("/solve/submit",options);
    let response= await p.json();
    console.log(response);
    if(response.error)
    {
        const error=response.error.slice(0,response.error.length);
        output.classList.add("text-red-800");
        // output.innerHTML="";
        output.value=response.error;
        loader.classList.add("hidden");
    }
    else
    {
    if(response.result)
    {
        
        if(response.pointsobtained)
        points.innerHTML="Points Alloted :😎"+response.pointsobtained;
        else
        points.innerHTML="Points Alloted 😎 : 0";
        resultstatus.innerHTML="correct answer";
        resultdiv.classList.remove("hidden");
    }
    else
    {
        
        points.innerHTML="Points Alloted 😎 : 0";
        submitresultdiv.classList.remove("hidden");
        submitresultdiv.classList.remove("hidden");
        resultdiv.classList.remove("hidden");
        expectedoutputfailure.innerHTML=response.expectedoutput;
        outputfailure.innerHTML=response.output;
        inputfailure.innerHTML=response.input;
        resultstatus.innerHTML="wrong answer";
    }
    loader.classList.add("hidden");
   }
})

savebtn.addEventListener('click',() =>
{
    const val=editor.getValue();
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
    }
    downloadlink.click();

})