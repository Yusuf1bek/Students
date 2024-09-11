// modal start
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
let students = JSON.parse(localStorage.getItem ("students")) || []

elModalWrapper.addEventListener("click", function(e){
    if(e.target.id == "modal-wrapper") elModalWrapper.classList.add("scale-0")
    })
    function hanndelAddStudentBtn(){
        elModalWrapper.classList.remove("scale-0")
        elModalInner.innerHTML =`
        <form class="add-product-form mt-[40px]">
        <label>
            <input class="chosed-input hidden" type="file"/>
            <img class="chosed-img mx-auto mt-[20px] cursor-pointer bg-white" src="./images/admin-avatar.png" alt="Choose Img" width="200" height="200" />
        </label>
        <div class="flex items-center justify-between px-10">
            <div class="w-[49%]">
            <label class="pl-[20px]">
                <div class="flex gap-[12px] mb-[5px]">
                    <span class="text-[20px] text-[#F8D442] font-normal">Student name</span>
                </div>
                <input class="p-3 text-[20px] rounded-md mt-[2px] outline-none" placeholder="Name" name="studentname" autocomplete="off" required />
            </label>
            </div>
            <div class="w-[49%]">
            <label class="pl-[20px]">
                <div class="flex gap-[12px] mb-[5px]">
                    <span class="text-[20px] text-[#F8D442] font-normal">Student email</span>
                </div>
                <input class="p-3 text-[20px] rounded-md mt-[2px] outline-none" placeholder="Email" name="studentemail" autocomplete="off" required />
            </label>
            </div>
        </div>
        <div class="flex items-center justify-between px-10">
            <div class="w-[49%]">
                <label class="pl-[20px]">
                        <div class="flex gap-[12px] mb-[5px]">
                            <span class="text-[20px] text-[#F8D442] font-normal">Student phone</span>
                        </div>
                    <input class="p-3 text-[20px] rounded-md mt-[2px] outline-none" type="tel" placeholder="Phone" name="phonenumber" autocomplete="off" required />
                </label>
            </div>
            <div class="w-[49%]">
                <label class="pl-[20px]">
                    <div class="flex gap-[12px] mb-[5px]">
                        <span class="text-[20px] text-[#F8D442] font-normal">Enroll Number</span>
                    </div>
                    <input class="p-3 text-[20px] rounded-md mt-[2px] outline-none" type="tel" placeholder="Enroll Number" name="enrollnumber" autocomplete="off" required />
                </label>
            </div>
        </div>
            <div class="w-[49%] px-10">
                    <label class="pl-[20px]">
                        <div class="flex gap-[12px] mb-[5px]">
                            <span class="text-[20px] text-[#F8D442] font-normal">Date admission</span>
                        </div>
                         <input class="p-3 text-[20px] rounded-md mt-[2px] type="date"  outline-none" placeholder="Date admission" name="dateadmission" autocomplete="off" required />
                    </label>
                    </div>
                    <button class="add-btn text-[20px] mb-[20px] text-white rounded-[30px] bg-[#FEAF00] w-[500px] m-auto py-[10px] mt-[10px] ml-[40px]">Add</button>
            </form>
        `
        let elAddProductForm = document.querySelector(".add-product-form")

            let elChosedInput = document.querySelector(".chosed-input")
            let elChosedImg = document.querySelector(".chosed-img")
            
            elChosedInput.addEventListener("change", function(e){
                elChosedImg.src = URL.createObjectURL(e.target.files[0])
                elChosedImg.classList.add("bg-white")
            })

            elAddProductForm.addEventListener("submit", (e) =>{
                e.preventDefault()
                const data = {
                    id:students.length ? students[students.length - 1].id + 1 : 1,
                    studentId:e.target.studentname.value,
                    email:e.target.studentemail.value,
                    phoneNumber:e.target.phonenumber.value,
                    enrollNumber:e.target.enrollnumber.value,
                    dateAdmission:e.target.dateadmission.value,
                    img:elChosedImg.src
                }
                elModalWrapper.classList.add("scale-0")
                students.push(data)
                const elAddBtn = document.querySelector('add-btn'); 
                if (elAddBtn) { 
                    elAddBtn.innerHTML = `
                        <img class='mx-auto scale-[1.2]' src="./images/loading-img.svg" alt="loading" width="40" />
                     `;
                }
                setTimeout(() => {
                    renderStudents(students, data.studentId)
                },1000)                
            })
}
// modal end

// render student start
let elStudentRender = document.querySelector(".list-wrapper")
function renderStudents(arr, studentId){
    elStudentRender.innerHTML = null
    const productDataFiltered = arr.filter(item => item.studentId == studentId)
    productDataFiltered.forEach(item => {
        let elStudentList = document.createElement("ul")
        elStudentList.className = "list-wrapper"
        elStudentList.innerHTML = `
                <li class="item">
                    <img class="avatar-img" src="${item.img}" alt="Avatar-Icon" width="65" height="55">
                    <p class="name">${item.studentId}</p>
                    <p class="email">${item.email}</p>
                    <p class="phone">${item.phoneNumber}</p>
                    <p class="number">${item.enrollNumber}</p>
                    <p class="date">${item.dateAdmission}</p>
                    <button class="hover:scale-[1.3] duration-300">
                        <img src="./images/edit.svg" alt="Edit-Img" width="18" height="18">
                    </button>
                    <button onclick="handleDeleteProduct(${id})" class="hover:scale-[1.3] duration-300">
                        <img src="./images/delete.svg" alt="Delete-Img" width="18" height="18">
                    </button>
                </li>
        `
        elStudentRender.appendChild(elStudentList)
    })
    localStorage.setItem("students", JSON.stringify(productDataFiltered))
}
function searchStudents(query) {
    const filteredStudents = students.filter(student => 
        student.studentId.toLowerCase().includes(query.toLowerCase())
    )
    renderStudents(filteredStudents)
}

let searchInput = document.getElementById("search-input")
searchInput.addEventListener("input", function () {
    searchStudents(searchInput.value)
})
renderStudents(students)
// render student end

// log out btn
function handleLogOutBtn(){
    elModalWrapper.classList.remove("scale-0")
    location.pathname = "/"
    localStorage.removeItem("isRegistered")
}

// Delete function start
function handleDeleteProduct(id){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
        <div>
            <h2 class="text-center text-[30px] font-bold text-white">Do you want to delete ?</h2>
            <div class="flex justify-between mt-10">
                <Nbutton onclick="cancelDeleteModal()"  class="add-btn bg-[#FEAF00] w-[49%] py-[8px] text-white text-[25px] font-bold bg-[#00398] rounded-[25px]">No</Nbutton>
                <button onclick="sureDeleteModal(${id})"  class="add-btn w-[49%] py-[8px] text-white text-[25px] font-bold bg-red-500 rounded-[25px]">Sure</button>
            </div>
        </div>
    `
}
function cancelDeleteModal(){
    elModalWrapper.classList.add("scale-0")
}
function sureDeleteModal(id){
    const findIndexDelete = products.findIndex(item => item.id == id)
    products.splice(findIndexDelete, 1)
    elModalWrapper.classList.add("scale-0")
    renderProducts([...products])
    localStorage.setItem("products", JSON.stringify(products))
}
// Delete function end
