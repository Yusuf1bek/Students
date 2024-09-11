let elRegisterForm = document.querySelector(".register-form")
elRegisterForm.addEventListener("submit", function(e){
    e.preventDefault()
    const newData = {
        newUsername:e.target.userlogin.value,
        newPassword:e.target.userpassword.value
    }
    elRegisterForm.lastElementChild.innerHTML = `
    <img class='mx-auto scale-[1.2]' src="./images/loading-img.svg" alt="loading" width="40" />`
    localStorage.setItem("isRegistered", JSON.stringify(newData))
    setTimeout(() => {location.pathname = "/"},2000)})