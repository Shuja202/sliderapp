const slidersContainer = document.getElementById("sliders-container");
const sliderNameInput = document.getElementById("slider-name");
const addSliderBtn = document.getElementById("add-slider-btn");

addSliderBtn.addEventListener("click", addSlider);
sliderNameInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addSlider();
    }
});

function addSlider() {
    const sliderName = sliderNameInput.value.trim();
    
  //  console.log("Slider Name Input Value:", sliderName); // Log the value not needed anymore
    
    if (!sliderName) {
        displayErrorMessage("No Input");
        return;
    }


    const sliderValue = getRandomValue();
    const sliderElement = createSlider(sliderName, sliderValue);

    slidersContainer.appendChild(sliderElement);

    // Clear input field
    sliderNameInput.value = "";

    // Update other slider values to maintain a total of 100
    updateSliderValues();
}

function createSlider(name, value) {
    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider-container");

    const sliderNameElement = document.createElement("span");
    sliderNameElement.classList.add("slider-name");
    sliderNameElement.textContent = name;

    const sliderInput = document.createElement("input");
    sliderInput.type = "range";
    sliderInput.min = 0;
    sliderInput.max = 100;
    sliderInput.value = value;
    sliderInput.classList.add("slider-input");

    const sliderValueElement = document.createElement("span");
    sliderValueElement.classList.add("slider-value");
    sliderValueElement.textContent = `${value}%`;

    sliderInput.addEventListener("input", () => {
        sliderValueElement.textContent = `${sliderInput.value}%`;
        updateSliderValues();
    });

    sliderContainer.appendChild(sliderNameElement);
    sliderContainer.appendChild(sliderInput);
    sliderContainer.appendChild(sliderValueElement);
   

    return sliderContainer;
}

function getRandomValue() {
    const existingSliders = document.querySelectorAll(".slider-input");
    let totalValue = 100;
    if (existingSliders.length > 0) {
        const lastSlider = existingSliders[existingSliders.length - 1];
        totalValue = 100 - parseInt(lastSlider.value);
    }

    return Math.floor(Math.random() * (totalValue + 1));
}

function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = "red";
    setTimeout(() => {
        errorMessageElement.textContent = "";
    }, 2000); // Clear the message after 2 seconds
}



function updateSliderValues() {
    const sliders = document.querySelectorAll(".slider-input");
    const totalValue = Array.from(sliders).reduce((total, slider) => total + parseInt(slider.value), 0);

    if (totalValue !== 100) {
        const adjustment = (100 - totalValue) / sliders.length;
        sliders.forEach((slider) => {
            slider.value = parseInt(slider.value) + adjustment;
            slider.nextElementSibling.textContent = `${slider.name}: ${slider.value}%`;
        });
    }
}
