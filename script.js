const passValue = document.querySelector(".pass-value")
const copyBtn = document.querySelector(".fa-copy")
const indicator = document.querySelector(".indicator")
const passLength = document.querySelector(".pass-slider")
const passLengthText = document.querySelector(".password-length-box span")
const options = document.querySelectorAll(".settings div input")
const genereteBtn = document.querySelector(".generete-btn")

const values = {
   uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
   lowercase: "abcdefgijklmnopqrstuvwxyz",
   numbers: "0123456789",
   symbols: "!#$%><:,/=+@&}{][",
}

options.forEach((option) => {
   option.addEventListener("change", () => {
      if (document.querySelectorAll("input:checked").length == 1) {
         document
            .querySelector("input:checked")
            .parentElement.classList.add("disabled")
      } else {
         options.forEach((item) => {
            item.parentElement.classList.remove("disabled")
         })
      }
   })
})

options[0].click()

options[0].setAttribute("checked", "true")

function generetePassword() {
   let strongPassword = ""
   let randomPassword = ""

   let length = passLength.value

   options.forEach((option) => {
      if (option.checked) {
         strongPassword += values[option.id]
      }
   })

   for (let i = 0; i < length; i++) {
      randomPassword +=
         strongPassword[Math.floor(Math.random() * strongPassword.length)]
   }
   passValue.value = randomPassword
}

copyBtn.addEventListener("click", () => {
   navigator.clipboard.writeText(passValue.value)
})

function updateIndicator() {
   if (passLength.value <= 8) {
      indicator.id = "weak"
   } else if (passLength.value <= 16) {
      indicator.id = "medium"
   } else {
      indicator.id = "strong"
   }
}

passLength.addEventListener("input", () => {
   generetePassword()
   updateIndicator()
   passLengthText.textContent = passLength.value
})

genereteBtn.addEventListener("click", generetePassword)
