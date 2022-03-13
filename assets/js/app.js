// Analog Clock

function calcDeg(totalDeg, total, how) {
    return (totalDeg / total * how);
}

setInterval(function () {
    let time = new Date();

    let currSecond = time.getSeconds();
    let currMinute = time.getMinutes();
    let currHour = time.getHours();

    document.querySelector(".clock__container .s").style.transform = `rotate(${calcDeg(360,60,currSecond)}deg)`;
    document.querySelector(".clock__container .m").style.transform = `rotate(${calcDeg(360,60,currMinute)}deg)`;
    document.querySelector(".clock__container .h").style.transform = `rotate(${calcDeg(360,12,currHour)}deg)`;

    document.querySelector(".digital__clock").innerHTML = time.toLocaleTimeString();
}, 1000)


// Instant Data of input checkbox

const taskContainer = document.querySelector(".task__container");
const checkItems = document.querySelectorAll(".check__container__item > input");

checkItems.forEach(item => {

    item.addEventListener("change", function () {
        let itemArr = [];
        let checkedItem = document.querySelectorAll(".check__container__item > input:checked");

        checkedItem.forEach(item => {
            itemArr.push(item.value);
        })

        let list = '';
        itemArr.forEach(itemValue => {
            list += `
            <li class="list-group-item">${itemValue}</li>
            `;
        })
        localStorage.setItem("list", list);
        taskContainer.innerHTML = list;
    })
})

taskContainer.innerHTML = localStorage.getItem("list");


// Calculator

const buttons = document.querySelector(".calculator__btns button");
const calcText = document.querySelector(".calculator__text input");
const resText = document.querySelector(".calculator__text div");
let valuesArr = [];

let getValue = (value) => {

    valuesArr.push(value);


    if (value == "ac") {
        valuesArr = [];
        resText.innerHTML = 0;
        calcText.value = 0;
    } else if (value == "c") {
        valuesArr.pop();
        valuesArr.pop();
        calcText.value = valuesArr.join("");
    } else if (valuesArr.join("").match(/[*/\%\.\+\-][*/\%\.\+\-]/g)) {
        resText.innerHTML = "Format Error";
        valuesArr.splice((valuesArr.length - 1), 1);
        calcText.value = valuesArr.join("");
    } else if (valuesArr.join("").match(/^[1-9\0].*$/g)) {
        calcText.value = valuesArr.join("");
    } else {
        calcText.value = valuesArr.join("");
        valuesArr.splice((valuesArr.length - 1), 1);
        resText.innerHTML = "Format Error";
    }

    valuesArr.join("");

    try {
        finalResult()
    } catch (error) {}
}

try {
    function finalResult() {
        let result = eval(calcText.value);
        if (result == undefined) {
            resText.innerHTML = 0;
        } else {
            resText.innerHTML = result;
        }
    }
} catch (error) {}

// Night Mode Switcher

document.querySelector(".calculator__switcher .fa-sun").addEventListener("click", function () {
    document.querySelector(".calculator__switcher .fa-moon").classList.remove("current")
    this.classList.add("current");
    document.querySelector(".calculator").classList.add("day");
})

document.querySelector(".calculator__switcher .fa-moon").addEventListener("click", function () {
    document.querySelector(".calculator__switcher .fa-sun").classList.remove("current")
    this.classList.add("current");
    document.querySelector(".calculator").classList.remove("day");
})