// Define an array to store slider values
const sliderValues = [];

// Function to create a new slider element
function createSlider(value) {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 0;
    slider.max = 100;
    slider.value = value;
    slider.className = "slider";
    return slider;
}

// Function to create a new slider element along with the percentage text
function createSliderWithValue(value) {
    const container = document.createElement("div");

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 0;
    slider.max = 100;
    slider.value = value;
    slider.className = "slider";

    const percentageText = document.createElement("span");
    percentageText.className = "percentage";
    percentageText.innerText = `${value}%`;

    container.appendChild(slider);
    container.appendChild(percentageText);

    return container;
}

// Function to update the title position based on slider value
function updateTitlePosition(slider, titleElement) {
    const sliderWidth = slider.offsetWidth;
    const sliderValue = parseFloat(slider.value);
    const titleWidth = titleElement.offsetWidth;

    // Calculate the position for the title element
    const newPosition = (sliderValue / 100) * sliderWidth - titleWidth / 2;

    // Set the left position of the title element
    titleElement.style.left = `${newPosition}px`;
}

// Function to add a new slider when the button is clicked
function addSlider() {
    const container = document.getElementById("slider-container");
    const titleInput = document.getElementById("slider-title");
    const errorMessage = document.getElementById("error-message");

    const title = titleInput.value.trim();
    if (title === "") {
        errorMessage.innerText = "Input is missing";
        errorMessage.style.color = "red";
        return;
    }

    errorMessage.innerText = "";

    const value = Math.floor(Math.random() * 101);
    sliderValues.push({ title, value });

    // Create a container for the slider and its title
    const sliderContainer = document.createElement("div");
    sliderContainer.className = "slider-container"; // Apply the CSS class

    // Create the slider and percentage text
    const slider = createSliderWithValue(value);

    // Create the title element
    const titleElement = document.createElement("div");
    titleElement.className = "slider-title";
    titleElement.innerText = title;

    // Append elements to their respective containers
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(titleElement);

    // Append the slider container to the main container
    container.appendChild(sliderContainer);

    // Add an event listener to the slider for mousemove events
    //const slider = sliderContainer.querySelector(".slider");
    slider.addEventListener("mousemove", () => {
        updateTitlePosition(slider, titleElement);
        updatePercentageText(slider, sliderContainer);
    });

    // Initialize the title position and percentage text
    updateTitlePosition(slider, titleElement);
    updatePercentageText(slider, sliderContainer);


}

// Function to update the percentage text based on slider value
function updatePercentageText(slider, container) {
    const percentageText = container.querySelector(".percentage");
    percentageText.innerText = `${slider.value}%`;
}



// // Function to remove the last added slider
// function removeLastSlider() {
//     const container = document.getElementById("slider-container");
//     const sliders = container.querySelectorAll(".slider");

//     // Check if there are any sliders to remove
//     if (sliders.length > 0) {
//         const lastSlider = sliders[sliders.length - 1];
//         container.removeChild(lastSlider);

//         // Remove the corresponding title and percentage text
//         const titles = container.querySelectorAll(".slider-title");
//         const lastTitle = titles[titles.length - 1];
//         container.removeChild(lastTitle);

//         // Move the input container higher since a slider is removed
//         const inputContainer = document.getElementById("input-container");
//         inputContainer.style.marginTop = `${container.clientHeight + 20}px`;

//         // Remove the corresponding value from the sliderValues array
//         sliderValues.pop();
//     }

// }


// Add an event listener to the document for the Escape key press event

document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
        removeLastSlider();
    }
});

// Attach the click event listener to the "Add Slider" button
const addButton = document.getElementById("add-slider");
addButton.addEventListener("click", addSlider);

// Add an event listener to the input field for Enter key press events
const titleInput = document.getElementById("slider-title");
titleInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addSlider();
    }
});