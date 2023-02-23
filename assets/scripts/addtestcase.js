const nooftestcase=document.querySelector(".nooftestcase");
const add=document.querySelector(".add");
const testcases=document.querySelector(".testcases");

const id=document.querySelector(".id").value;
console.log(id)

add.addEventListener("click",() =>
{
    // alert("pressed");
    let val=nooftestcase.value;
    // console.log(val);
    for(let i=1;i<=val;i++)
    {
        const node = document.createElement("div");
        let htmldata = `
        <div class="bg-blue-50 p-2">
        <span class="font-bold text-2xl"> ${i}</span>
            <label for="input" class="font-bold">Input : </label>
            <textarea required id="input" rows="5" class="border-black border w-[35%] inputtestcase p-1" ></textarea>
            <label for="output" class="font-bold">Output : </label>
            <textarea required id="output" rows="5" class="border-black border w-[35%] outputtestcase p-1" ></textarea>
            <button data-id=${i-1} class="addtestcasebtn bg-blue-600 p-2 rounded-md text-white ml-5">Add</button>
        </div>`;
        node.insertAdjacentHTML("afterbegin", htmldata);
        node.classList.add("testcasecontainer");
        testcases.appendChild(node);
    }

    const addtestcasebtn=document.querySelectorAll(".addtestcasebtn")
    for(let i=0;i<addtestcasebtn.length;i++)
    {
        addtestcasebtn[i].addEventListener("click",(event) =>
        {
            const pos=event.currentTarget.dataset.id;
            data(pos);
            
        })
    }
})

function data(pos)
{
    const testcasecontainer=document.querySelectorAll(".testcasecontainer");
    const testcasediv=testcasecontainer[pos];
    console.log(testcasecontainer);
    testcasediv.classList.add("hidden");
    const inputtestcase=document.querySelectorAll(".inputtestcase")
    const outputtestcase=document.querySelectorAll(".outputtestcase")
    const inputtc=inputtestcase[pos];
    const outputtc=outputtestcase[pos];
    const input=inputtc.value;
    const output=outputtc.value;
    // console.log(input,output);
    addtestcase(input,output);
}

async function addtestcase(input,output)
{
    let options={
        method:"POST",
        headers:
        {
            "Content-type":"application/json"
        },
        body:JSON.stringify({id:id,input:input,output:output})
    }
     let p= await fetch("http://localhost:5000/addtestcase",options);
     let response= await p.json();
     console.log(response);
}