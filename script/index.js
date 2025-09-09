

// allTReeload
const allTreeLoad=async()=>{
    const url=`https://openapi.programming-hero.com/api/plants`
     const res=await fetch(url);
     const data=await res.json();
     
     displayAllCategore(data.plants)
}
// "plants": [
// {
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
const removeActive=()=>{
    
   const  catagoreActive= document.querySelectorAll('.catagore-btn')
   
   catagoreActive.forEach(btn=>btn.classList.remove('bg-green-700','w-36' ,'md:w-full','text-white'))
}
// loadcategorePrucduct section
const  loadCategorePrucduct=async(id)=>{
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

}

// display all catagore section
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
    <h2 class="card-title">${card.name}</h2>
    <p class="text-[12px] font-normal">${card.description}</p>
    <div class="card-actions justify-between items-center">
      <button class="btn btn-sm bg-[#DCFCE7] rounded-4xl">Fruit tree</button>
      <h1 id='price' class="text-[#1f2937] text-sm font-semibold">৳  <span class='pricecart'>${card.price}</span></h1>
    </div>
    
  </div>
  <div class="px-3 pb-3">
    <button class="cartBtn btn h-[2.3rem]  bg-[#15803D] w-full  text-[#ffffff] rounded-3xl">Add to Cart</button>
  </div>
</div>`

            cardContainer.append(div);
        })
}
allTreeLoad()

// loadsidemenu
const loadMenu=async () => {
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
         navBtn.id=`navBtn-${data.id}`
    navBtn.innerText=`${data.category_name}`
    navBtn.classList.add('catagore-btn','btn-sm' ,'py-1.5', 'pl-2','rounded-sm')
  navBtn.addEventListener('click',function (e) {
    
  
    
    
        loadCategorePrucduct(`${data.id}`)
  })
    menuContainer.appendChild(navBtn)
    });

    
     
    
}

const cartHistory=()=>{
  let totalPrice=0;
// delation cart and remove carthistory
document.addEventListener("click", (e) => {
//  click target add to cart btn and total sum product price
   if(e.target.classList.contains('cartBtn')){
           
          const card= e.target.closest('.card');//target card dom traversing
        const cardTitle=card.querySelector('h2').innerText;
        const price=card.querySelector('.pricecart').innerText;
       console.log(price)
   
  const cartHistory=   document.getElementById('cart-history')

   const div=document.createElement('div');
   div.innerHTML=`<div class="cartItem w-12/12 px-3 py-2 my-3 bg-[#F0FDF4] flex justify-between items-center rounded-lg">
          <div>
            <h6 class="text-sm">${cardTitle}</h6>
           <p class="text-xs">৳${price}</p>
          </div>
           <button class="removeBtn text-xs text-gray-400"><i class="fa-solid fa-x"></i></button>
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

//  click condition remove btn  total cost of sub total
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

});
}

cartHistory();

loadMenu()
