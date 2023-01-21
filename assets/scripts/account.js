const togglenav=document.querySelector(".togglenavbar");
const navbarlist=document.querySelector(".navbarlist");
const problemssolvedcontainer=document.querySelector(".problemssolvedcontainer");
const detailscontainer=document.querySelector(".detailscontainer");
const pointscontainer=document.querySelector(".pointscontainer");
const detailsbtn=document.querySelector(".detailsbtn");
const problemssolvedbtn=document.querySelector(".problemssolvedbtn");
const pointsbtn=document.querySelector(".pointsbtn");
const editform=document.querySelector(".editform");
const editbtn=document.querySelector(".editinfo");
const profile=document.querySelector(".profile")
togglenav.addEventListener("click",()=>
{
    
    navbarlist.classList.toggle("sm:hidden")
})

problemssolvedbtn.addEventListener("click",() =>
{
    problemssolvedbtn.classList.add("bg-violet-400");
    pointsbtn.classList.remove("bg-violet-400")
    detailsbtn.classList.remove("bg-violet-400");
    problemssolvedcontainer.classList.remove("hidden");
    detailscontainer.classList.add("hidden");   
    pointscontainer.classList.add("hidden");   
})
detailsbtn.addEventListener("click",() =>
{
    detailsbtn.classList.add("bg-violet-400");
    pointsbtn.classList.remove("bg-violet-400")
    problemssolvedbtn.classList.remove("bg-violet-400");
    problemssolvedcontainer.classList.add("hidden");
    detailscontainer.classList.remove("hidden");   
    pointscontainer.classList.add("hidden");   
})

pointsbtn.addEventListener("click", () =>
{
    pointsbtn.classList.add("bg-violet-400")
    problemssolvedbtn.classList.remove("bg-violet-400");
    detailsbtn.classList.remove("bg-violet-400");
    problemssolvedcontainer.classList.add("hidden");
    detailscontainer.classList.add("hidden");
    pointscontainer.classList.remove("hidden");
})

editbtn.addEventListener("click",() =>
{
    editform.classList.remove("hidden");
    profile.classList.add("hidden")
  
})
