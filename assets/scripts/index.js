// const { response } = require("express");

// const form=document.querySelector(".form").FormData();
const val=document.querySelector(".code").value;
const savebtn=document.querySelector(".savebtn");
savebtn.addEventListener("click",()=>
{
//     console.log(val);
    // alert("save pressed")
    // var textfileasblob=new Blob([val],{type:"text/plain"});
    // var downloadlink=document.createElement("a");
    // downloadlink.download="code.cpp";
    // downloadlink.innerhtml="download code";
    // if(window.webkitURL!=null)
    // {
    //     downloadlink.href=window.webkitURL.createObjectURL(textfileasblob);
    // }
    // else
    // {
    //     alert("not allowed")
    // }
    // downloadlink.click();

    fetch("http://localhost:5000/test/",options)
.then((response) =>     response.json()
)
.then((data) =>
{
    console.log(data);
})
.catch(err => console.log(err))
})


let options={
    method:"POSt",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify({code:val})
}


// savebtn.addEventListener("click",async () =>
// {
//     var datatosend={
//         code:value,
//         id:1
//     };
//     var data=new FormData();
//     data.append("json",JSON.stringify(datatosend));
//     fetch("http://localhost:5000/test",{
//         method:"POST",
//         headers:
//         {
//             "Content-type":"application/json/x-www-form-urlencoded"
//         },
//         body:JSON.stringify({code:value})
//     })
//     .then((response) => response.json)
//     .then((data) => console.log(data))
//     .catch((err) =>
//     {
//         console.log(err)
//     })
// })