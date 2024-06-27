// This will track whether the modal is open or closed
let isModalOpen = false;

// This is used to toggle contrast theme
let contrastToggle = false;

// Constantly representing the scale factor for mouse movement
const scaleFactor = 1 / 20;

// Moves background shapes based on mouse movement and coordinates
function moveBackground(event) {
  // Select all elements with class "shape"
  const shapes = document.querySelectorAll(".shape");

  // Calculates x and y coordinates based on mouse position
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  // will loop through each shape and apply transformations
  for (let i = 0; i < shapes.length; ++i) {
    // Check if the index is odd
    const isOdd = i % 2 !== 0;

    // Determine a factor to move the shape in the opposite direction if odd
    const boolInt = isOdd ? -1 : 1;

    // Apply transformation using translate and rotate based on mouse coordinates
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`;
  }
}

// toggle contrast theme
function toggleContrast() {
  // Invert the contrastToggle variable
  contrastToggle = !contrastToggle;

  // Check if contrast is toggled on and add dark-theme class to body, otherwise remove it
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

// Function to handle form submission and send email
function contact(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Select loading and success overlays
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");

  // Show loading overlay
  loading.classList += " modal__overlay--visible";

  // Use emailjs to send the form data asynchronously
  emailjs
    .sendForm("service_80ih0if", "template_d9refyl", event.target, "")
    .then(() => {
      // On success, hide loading overlay and show success overlay
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      // On error, hide loading overlay and show alert message
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on email@email.com"
      );
    });
}

// toggle the visibility of the modal
function toggleModal() {
  // If modal is open, close it, otherwise, open it
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}




