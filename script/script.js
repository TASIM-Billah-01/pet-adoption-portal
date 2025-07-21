console.log("script js is connected");

const loadCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/peddy/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.categories);
}

const displayCategories = (data) => {
    // console.log(data);
    const main = document.getElementById('main')
    data.forEach(element => {
        // console.log(element);
        const nav = document.createElement('nav');
        nav.id = `${element.id}`
        nav.classList.add('flex', 'justify-center', 'nav-class', 'gap-2', 'items-center', 'border-2', 'border-gray-500', 'border-opacity-25', 'px-7', 'py-2', 'shadow-md','text-[rgba(14,122,129,0.15)]', 'rounded-md')
        nav.innerHTML =
        
        `
        <img src=${element.category_icon} alt="" class="sm:w-9 w-6">
        <button  class="font-bold text-[#131313] text-lg"  onclick="highlighBtn(${element.id}); displayPets('${element.category}')">${element.category}</button>
        `
        main.appendChild(nav)
    });
}

const displayPets = id => {
    // console.log(id.toLowerCase());
    const newId = id.toLowerCase();
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${newId}`)
    .then(res => res.json())
    .then(data => displayAllPets(data.data))
    .catch(err => console.log(err))
    
}
 
const removeBtnHighLight = () => {
    const navClass = document.getElementsByClassName('nav-class');
    for (const element of navClass) {   
        // console.log(element);
        
        element.classList.remove('bg-[rgba(14,122,129,0.15)]', 'rounded-md', 'rounded-full')
    }

}

const highlighBtn = data => {
    // console.log(document.getElementById(data));
    
    removeBtnHighLight()
    document.getElementById(data).classList.add('bg-[rgba(14,122,129,0.15)]', 'rounded-full')
    
}

const displayAllPets = (data) => {
    // console.log(data);
    const section = document.getElementById('section')
    section.innerHTML = ""
    if (data.length === 0) {
        console.log("zero");
            document.getElementById("MAIN").classList.add('hidden')
            document.getElementById("main01").classList.remove('hidden')       
    }
    data.forEach(element => {
        // console.log(element);   
            document.getElementById("MAIN").classList.remove('hidden')
            document.getElementById("main01").classList.add('hidden')

        const article = document.createElement('article');
        article.classList.add( 'border', 'rounded-md', 'p-5', 'border-gray-300', 'sm:p-6', 'lg:p-5' , 'xl:p-5' ,  'shadow-lg', 'bg-[rgba(19,19,19,0.1)]')
        article.innerHTML =
        `
       <figure class="h-[200px] w-full" >
        <img src=${element.image} alt="" class="h-full object-cover rounded w-full ">
        </figure>

        <h1 class="font-bold text-2xl p-2 text-[#131313]" >${element.pet_name}</h1>

        <nav class="flex gap-2 mb-1">
        <img src="../resources/Frame.png" alt="" class="w-5">
        <p class="text-[rgba(19,19,19,0.7)] font-semibold text-base text-red-500"> Breed: ${element.breed ? element.breed : 'N/A' }</p>
        </nav>
    
        <nav class="flex mb-1 gap-2" >
        <img src="../resources/Frame1.png" alt="" class="w-5">
        <p class="font-semibold text-base text-[rgba(19,19,19,0.7)]"> Birth: ${element.date_of_birth ? element.date_of_birth : "N/A"}</p>
        </nav>

        <nav class="flex mb-1 gap-2">
        <img src="../resources/Frame2.png" alt="" class="w-5">
        <p class="font-semibold text-base text-[rgba(19,19,19,0.7)]"> Gender: ${element.gender ? element.gender : 'N/A'}</p>
        </nav>

        <nav class="flex mb-1 gap-2">
        <img src="../resources/Frame3.png" alt="" class="w-5">
        <p class="font-semibold text-base text-[rgba(19,19,19,0.7)]"> Price: ${element.price ? element.price : 'N/A'}</p>
        </nav>

        <div class="my-4 border-t-2 border-gray-400 border-opacity-35"> </div>

        <section class="flex items-center gap-5 justify-center"> 
                <i class="fa-regular fa-thumbs-up border-2 border-opacity-25 p-2 border-gray-500 rounded shadow-xl" onclick="petId(${element.petId})"></i>
                <button onclick="adoptMessage(${element.petId})" class=" px-3 py-1.5 bg-[#0E7A81] text-[#FFFFFF] shadow-lg  font-semibold text-sm rounded">
                    Adopt
                </button>
                <button onclick = " detailsShow(${element.petId})" class="px-3 py-1.5 bg-[#0E7A81] text-[#FFFFFF] shadow-lg  font-semibold text-sm rounded">
                    Details
                </button>   
        </section>
        `
        section.appendChild(article)        
    })
}

const details = (a,b,c,d) => {    
    const details  = document.getElementById('details')
    console.log(a,b,c,d);
    details.innerHTML = ''; 
    const section = document.createElement('section');    
    section.innerHTML = 
    `
    <figure class="h-[100px]">
        <img src=${b} alt="" class="rounded h-full">
    </figure>
    <p class="text-base xl:text-xl font-bold text-[#131313] xl:mt-2">pet-name : ${a}</p>
    <p class="text-base xl:text-xl font-semibold text-[rgba(19,19,19,0.7)] ">vaccinated_status :       ${d}</p>
    <p class="text-xs xl:text-base text-gray-600 font-light mt-1">${c}</p>
    <button id="closed" class="bg-white xl:px-3 px-2 xl:py-1 shadow-xl text-sm xl:text-base mt-2 text-gray-600 py-0.5 font-semibold rounded">Closed</button>
    `
    details.appendChild(section)
    console.log(section);

    document.getElementById('details').classList.remove('hidden')
    
document.getElementById('closed').addEventListener('click', function (params) {
    document.getElementById('details').classList.add('hidden')
})

    
}

const detailsShow = data => {
    // console.log(data);
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${data}`)
    .then(res => res.json())
    .then(data => details( `${data.petData.pet_name}`, `${data.petData.image}`, `${data.petData.pet_details}`, `${data.petData.vaccinated_status}` ))
    .catch(err => console.log(err))

}


let interval; 

const adoptMessage = (id) => {
    const modal = document.getElementById('modal');
    const p = document.getElementById('countdown');
    let count = 3;
    p.innerText = count;
    modal.classList.remove('hidden');

    if (interval) clearInterval(interval); 

    interval = setInterval(() => {
        count--;
        p.innerText = count;

        if (count === 0) {
            clearInterval(interval);
            modal.classList.add('hidden');
        }
    }, 1000);
};



const petId = id => {
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then(res => res.json())
    .then(data => displayClick(data.petData.image))
    .catch(err => console.log(err))
}

const displayClick = id => {
    console.log(id);
    const Section = document.getElementById('Section');
    const img = document.createElement('img');
    img.src = id;
    Section.appendChild(img)
}

const loadPets = async () => {
    const url = 'https://openapi.programming-hero.com/api/peddy/pets';
    const res = await fetch (url)
    const data = await res.json()
    displayAllPets(data.pets);
    
}


loadCategories()
loadPets()