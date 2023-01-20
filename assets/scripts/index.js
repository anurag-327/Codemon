const togglenav=document.querySelector(".togglenavbar");
const navbarlist=document.querySelector(".navbarlist");
const loader=document.querySelector("#loader");
window.addEventListener("load",() =>
{
   loader.classList.add("hidden");
})
togglenav.addEventListener("click",()=>
{
    
    navbarlist.classList.toggle("sm:hidden")
})