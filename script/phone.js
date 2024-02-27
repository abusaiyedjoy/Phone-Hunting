const getData=async(searchList)=>{
    const response=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchList}`);
    const details =await response.json();
    const phones = details.data;
    previewPhone(phones)
    
};

const previewPhone = phoneItem => {
   
    const phoneContainer = document.getElementById("phone-container")

    phoneContainer.textContent="";

    phoneItem.forEach(phone => {
        const PhoneCards = document.createElement('div')
        PhoneCards.classList=`card p-4 bg-gray-200 text-black shadow-xl`;
        PhoneCards.innerHTML=`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        `
        phoneContainer.appendChild(PhoneCards);
    });
};

const getResult = () =>{
    const inputValue = document.getElementById("input-field").value;
    getData(inputValue);
    document.getElementById("input-field").value="";
}