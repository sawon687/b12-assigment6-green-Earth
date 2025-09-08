const getId=(id)=>{
    document.getElementById(id)
    
}
const allTreeLoad=()=>{
    const url=`https://openapi.programming-hero.com/api/plants`
}

// loadsidemenu
const loadMenu=async (params) => {
    const url='https://openapi.programming-hero.com/api/categories';
    const res=await fetch(url);
    const data=await res.json();
    console.log(data.categories);
    displaymenu(data.categories);
}
// loadsidemenuDisplay
const displaymenu=(datas)=>{
    console.log(datas)
    const menuContainer=document.getElementById('menu-container');

    datas.forEach(data => {
        
         const navBtn=document.createElement('li')
    navBtn.innerText=`${data.category_name}`
    navBtn.classList.add('hover:bg-green-700' ,'hover:text-white','py-1.5', 'pl-2','rounded-sm')

    menuContainer.appendChild(navBtn)
    });
    
}

loadMenu()
