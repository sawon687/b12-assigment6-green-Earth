

// allTReeload
const allTreeLoad=async()=>{
   manageLoading(true);
    const url=`https://openapi.programming-hero.com/api/plants`
     const res=await fetch(url);
     const data=await res.json();
     
     displayAllCategore(data.plants)
     manageLoading(false);
}
// manage lodind
 const manageLoading=(status)=>
 {
          if(status==true)
          {
            document.getElementById('loading-container').classList.remove('hidden');
             document.getElementById('choose_trees').classList.add('hidden');
          }
          else{
            document.getElementById('loading-container').classList.add('hidden');
            document.getElementById('choose_trees').classList.remove('hidden');
          }
 }

const removeActive=()=>{
    
   const  catagoreActive= document.querySelectorAll('.catagore-btn')
   
   catagoreActive.forEach(btn=>btn.classList.remove('bg-green-700','w-36' ,'md:w-full','text-white'))
}
// loadcategorePrucduct section
const  loadCategorePrucduct=async(id)=>{
   manageLoading(true);
        const url=`https://openapi.programming-hero.com/api/category/${id}`;
        console.log(url)
        const res= await fetch(url);
        const data =await res.json()
           removeActive();
  const clickedBtn = document.getElementById(`navBtn-${id}`);
    if (clickedBtn) {
        clickedBtn.classList.add('bg-green-700','text-center','md:text-left','w-auto','px-2','md:w-full', 'text-white');
    }
displayAllCategore(data.plants)
 manageLoading(false);

}

// all tree btn

document.getElementById('navBtn-11').addEventListener('click',()=>
{   
  removeActive();
   document.getElementById('navBtn-11').classList.add('bg-green-700','text-center','md:text-left','w-auto','px-2','md:w-full', 'text-white')

})


// display all card  section
const displayAllCategore=(cards)=>{
       
const cardContainer= document.getElementById('card-container');
cardContainer.innerHTML=''
        cards.forEach(card=>{
            const div=document.createElement('div')

            div.innerHTML=`  <div class="card bg-base-100 w-72  h-auto pt-3 shadow-sm">
  <figure class="px-3 py-1 ">
    <img class="rounded-lg w-full h-[200px] object-cover "
      src="${card.image}"
      alt="Shoes" />
  </figure>
  <div class="px-4 py-2 space-y-2 flex-1 h-[70px] ">
    <h2 id="${card.id}" onclick=''  class="card-title">${card.name}</h2>
    <p class="text-[12px] font-normal">${card.description}</p>
    <div class="card-actions justify-between items-center">
      <button class="btn btn-sm bg-[#DCFCE7] rounded-4xl">${card.category}</button>
      <h1 id='price' class="text-[#1f2937] text-sm font-semibold">৳  <span class='pricecart'>${card.price}</span></h1>
    </div>
    
  </div>
  <div class="px-3 pb-3">
    <button class="cartBtn btn h-[2.3rem]  bg-[#15803D] w-full  text-[#ffffff] rounded-3xl">Add to Cart</button>
  </div>
</div>`

            cardContainer.append(div);
            // call tree info function pass id
            
            
        })
     
}
allTreeLoad()

// loadsidemenu
const loadMenu=async () => {
  manageLoading(true);
    const url='https://openapi.programming-hero.com/api/categories';
    const res=await fetch(url);
    const data=await res.json();
    console.log(data.categories);
    displaymenu(data.categories);
}
// loadsidemenuDisplay
const displaymenu=(datas)=>{
     manageLoading(true)
    const menuContainer=document.getElementById('menu-container');
     
    datas.forEach(data => {
        
        const navBtn=document.createElement('li')
         navBtn.id=`navBtn-${data.id}`
    navBtn.innerText=`${data.category_name}`
    navBtn.classList.add('catagore-btn','btn-sm','cursor-pointer' ,'py-1.5', 'pl-2','rounded-sm')
  navBtn.addEventListener('click',function (e) {
    
  
    
    
        loadCategorePrucduct(`${data.id}`)
  })
    menuContainer.appendChild(navBtn)
     manageLoading(false)
    });
 manageLoading(false);
    
     
    
}
// 



const cartHistory=()=>{
  let totalPrice=0;
// delation cart and remove carthistory all webpage deltation
document.addEventListener("click", (e) => {
//  click target add to cart history  and total sum product price
   if(e.target.classList.contains('cartBtn')){
           
          const card= e.target.closest('.card');//target card dom traversing
        const cardTitle=card.querySelector('h2').innerText;
        alert(`${cardTitle} has been added to cart`)
        const price=card.querySelector('.pricecart').innerText;
       console.log(price)
   
  const cartHistory=   document.getElementById('cart-history')

   const div=document.createElement('div');
   div.innerHTML=`<div class="cartItem w-12/12 px-3 py-2 my-3 bg-[#F0FDF4] flex justify-between items-center rounded-lg">
          <div>
            <h6 class="text-sm">${cardTitle}</h6>
           <p class="text-xs">৳${price}</p>
          </div>
           <button class="removeBtn cursor-pointer text-xs text-gray-400"><i class="fa-solid fa-x"></i></button>
         </div>
         
         
         
         `
         cartHistory.appendChild(div);

           totalPrice=Number(totalPrice) + Number(price);
           console.log(totalPrice);
       
        
        let totalBox = document.getElementById("total-box");
          if(!totalBox){
          totalBox = document.createElement("p");
               totalBox.id = "total-box";
               
          }
       totalBox.classList.add('flex' ,'justify-between')
        totalBox.innerHTML=`Total <span>৳${totalPrice}</span>`
        
         cartHistory.appendChild(totalBox);
   }

//  click condition remove cart box  total cost of sub total
     if(e.target.classList.contains('removeBtn')|| e.target.classList.contains('fa-x'))
     {
           const cartItem=e.target.closest('.cartItem');
          
             const itemPrice = Number(cartItem.querySelector("p.text-xs").innerText.replace('৳', ''))
             totalPrice-=itemPrice;
             cartItem.remove();

             const totalBox=document.getElementById('total-box');

             if(totalBox){

                     totalBox.innerHTML=`Total <span>৳${totalPrice}</span>`
             }    
      }

      //tree info dynamic 

      if(e.target.classList.contains('card-title'))
      {    
              
            loadtreeInfo(e.target.id);


      }

});
}

cartHistory();

// load side catagoremenu call
loadMenu()

// load tree info
const loadtreeInfo=async(id)=>{
     
    const url=`https://openapi.programming-hero.com/api/plant/${id}`
    const res =await fetch(url);
    const info=await res.json();
   
    console.log(info)
    displaytreeInfo(info.plants)
}



// display card info
 let displaytreeInfo=(info)=>{

              document.getElementById('my_modal_5').showModal();
         const infoContainer=document.getElementById('tree-infoContainer')
          infoContainer.innerHTML='';
         const div=document.createElement('div');
         div.innerHTML=` <h1 class="font-bold mb-2 text-xl">${info.name}</h1>
        <figure><img class=" h-[300px] s w-full object-cover rounded-lg" src=${info.image} alt=""></figure>
           <h2 class="font-bold mt-2">${info.category}</h2>
     <p><span class="font-bold">Price:</span> ৳${info.price}</p>
     <p class="font-bold">Description: <span class="font-light">${info.description}</span></p>
        <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>`

    infoContainer.appendChild(div);
        
         }