const colorBox = document.querySelector(".popupColorView");
const colorValue = document.querySelector(".popupColorHexValue");
const notify = document.querySelector(".popupNotify");

// Function to handle the color picking process
async function pickingColorFunction() {
  const resultElement = document.querySelector(".popupColorHexValue");

  // Check if the EyeDropper API is supported by the browser
  if (!window.EyeDropper) {
    resultElement.textContent = "Your browser does not support the EyeDropper API";
    return;
  }

  const eyeDropper = new EyeDropper();

  // Open the EyeDropper and handle the result
  eyeDropper
    .open()
    .then((result) => {
      const pickedColor = result.sRGBHex;
      colorBox.style.backgroundColor = pickedColor;
      colorValue.textContent = pickedColor;
      notify.textContent = "Copied to clipboard!";
      navigator.clipboard.writeText(pickedColor);
      
      // Clear the notification after 2.5 seconds
      setTimeout(() => {
        notify.textContent = "";
      }, 2500);
    })
    .catch((e) => {
      resultElement.textContent = e;
    });
}

// Attach the pickingColorFunction to the click event on the pickerBox
document
  .getElementById("pickerBox")
  .addEventListener("click", pickingColorFunction);
