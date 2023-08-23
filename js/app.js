const loadPhon=async (seachText,dataLimit)=>{
const url = `https://openapi.programming-hero.com/api/phones?search=${seachText}`
 const res = await fetch(url)
 const data= await res.json()
 displayPhone(data.data,dataLimit)
     

}
const displayPhone =(phones,dataLimit)=>{
        const phonesContaner = document.getElementById('phone-container')
        phonesContaner.textContent=' '

        //displau only phone  20 
// show all class 34-5 
const showAll =document.getElementById("show-all")

if(  dataLimit && phones.length>10){
        phones= phones.slice(0,10)
        showAll.classList.remove("d-none")
} 
else{
        showAll.classList.add('d-none')
}




        //  phones=phones.slice(0,10)
         //displly no phone found 
         const noPhone = document.getElementById('no-phone-message')

if(phones.length === 0){
        noPhone.classList.remove('d-none')
}
else{
        noPhone.classList.add('d-none')
}
         // displey  all phone 
        phones.forEach(phone => {
              
                const phoneDiv = document.createElement('div')
           phoneDiv.classList.add('col')
       

           phoneDiv.innerHTML = `
           <div class="card p-4">
               <img src="${phone.image}" class="card-img-top" alt="...">
               <div class="card-body">
                   <h5 class="card-title">${phone.phone_name}</h5>
                   <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                   <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                   
               </div>
           </div>
           `;
           phonesContaner.appendChild(phoneDiv)
                

        });
        //stop spinner  loader
        toggleSpinner(false)
}


const processSearch =(dataLimit)=>{
        toggleSpinner(true)
        const seachField = document.getElementById("seach-field")
const seachText= seachField.value;

loadPhon(seachText,dataLimit)
}











document.getElementById("btn-seach").addEventListener("click",function(){
       //start loader
     
processSearch(10)


})

// search input field enter key handler 
document.getElementById('seach-field').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            processSearch(10);
        }
    });
// function loadding  and  function  class34-4
const toggleSpinner = isLodding =>{
        const loaderSection = document.getElementById('loader')
        if(isLodding){
                loaderSection.classList.remove('d-none')
        }
        else{
                loaderSection.classList.add('d-none')
        }
}
// class 34-5

// not the best way to load show all\

document.getElementById('btn-showo-all').addEventListener('click',function(){
     
        processSearch()

//         toggleSpinner(true)
//         const seachField = document.getElementById("seach-field")
// const seachText= seachField.value;

// loadPhon(seachText)


})

const loadPhoneDetails = async id =>{
        const url =`https://openapi.programming-hero.com/api/phone/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayPhoneDetails(data.data);
    }
    
    const displayPhoneDetails = phone =>{
        console.log(phone);
        const modalTitle = document.getElementById('phoneDetailModalLabel');
        modalTitle.innerText = phone.name;
        const phoneDetails = document.getElementById('phone-details');
        console.log(phone.mainFeatures.sensors[0]);
        phoneDetails.innerHTML = `
            <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
            <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
            <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
            <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
        `
    }




loadPhon()

