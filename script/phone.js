const getData=async(searchList, isShowAll)=>{
    const response=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchList}`);
    const details =await response.json();
    const phones = details.data;
    previewPhone(phones, isShowAll)
    
};

const previewPhone = (phoneItem, isShowAll) => {
   
    const phoneContainer = document.getElementById("phone-container")

    phoneContainer.textContent="";


    const ShowAll = document.getElementById("Show-all")
    if(phoneItem.length>15 && !isShowAll){
        ShowAll.classList.remove('hidden')
    }else{
        ShowAll.classList.add('hidden')
    }

    if(!isShowAll){
        phoneItem=phoneItem.slice(0,15);
    }
    
    phoneItem.forEach(phone => {
        const PhoneCards = document.createElement('div')
        PhoneCards.classList=`card p-4 bg-gray-200 text-black shadow-xl`;
        PhoneCards.innerHTML=`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>
        `
        phoneContainer.appendChild(PhoneCards);
    });
    loadingInterface(false);
};

 const showDetails =async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    console.log("get" , data.data)
    showPhoneData(data.data)
 }
 const showPhoneData=(phone)=>{
    show_modal.showModal()
    const phoneName=document.getElementById("phone-name")
    phoneName.innerText=phone.name;
    const phoneDescription=document.getElementById("phone-description")
    phoneDescription.innerHTML=`
    <img class="w-[60%] mx-auto" src="${phone.image || "Not Available"}" alt="">
    <p><span>Storage: </span>${phone.mainFeatures.storage || "Not Available"}</p>
    <p><span>Display Size: </span>${phone.mainFeatures.displaySize || "Not Available"}</p>
    <p><span>Chipset: </span>${phone.mainFeatures.chipSet || "Not Available"}</p>
    <p><span>Memory: </span>${phone.mainFeatures.memory || "Not Available"}</p>
    <p><span>Slug: </span>${phone.slug || "Not Available"}</p>
    <p><span>Release Date: </span>${phone.releaseDate || "Not Available"}</p>
    <p><span>Brand: </span>${phone.brand || "Not Available"}</p>
    <p><span>Gps: </span>${phone.others.GPS || "Not Available"}</p>
    `
 }

const getResult = (isShowAll) =>{
    loadingInterface(true)
    const inputValue = document.getElementById("input-field").value;
    getData(inputValue, isShowAll);
    // document.getElementById("input-field").value="";
}

const loadingInterface=(isloading)=>{
    const loading = document.getElementById("loading")
    if(isloading){
        loading.classList.remove("hidden")
    }else{
        loading.classList.add("hidden")
    }
}
// Show all button

const showAllButton = () => {
    getResult(true)
}