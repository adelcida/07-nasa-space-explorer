// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const searchBtn = document.getElementById("searchBtn");
const gallery = document.getElementById("gallery");
const randomFactElement = document.getElementById('randomFact');

const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');
const closeModal = document.getElementById('closeModal');

// Array of fun space facts
const spaceFacts = [
  "The Sun makes up 99.86% of all the mass in our entire solar system!",
  "A day on Venus is longer than its year! Venus takes 243 Earth days to rotate, but only 225 days to orbit the Sun.",
  "The Andromeda galaxy is on a collision course with our Milky Way and will merge with it in about 4.5 billion years.",
  "There are more stars in the universe than grains of sand on all of Earth's beaches.",
  "The Moon is slowly drifting away from Earth at a rate of about 1.5 inches per year."
];

// Display a random fact on page load
function displayRandomFact() {
  const randomIndex = Math.floor(Math.random() * spaceFacts.length);
  randomFactElement.textContent = spaceFacts[randomIndex];
}

// Call the function when the page loads
displayRandomFact();

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

searchBtn.addEventListener('click', fetchImages);
closeModal.addEventListener('click', ()=> {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});

async function fetchImages() {
  const API_KEY = "uEypkNuWJoD6hf2fTp9XoIrwJzfexIhjEmUtS0ib"
  const startDate = startInput.value;
  const endDate = endInput.value;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  gallery.innerHTML = ''; 

  data.forEach((item) => {
    const img = item.url;
    const title = item.title;
    const explain = item.explanation;
    const date = new Date(item.date);
    const formatted = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    const imgEle = document.createElement('img');
    imgEle.src = img;
    imgEle.alt = title;
    imgEle.id = 'cardImages';

    imgEle.addEventListener('click', () => {
      modalImage.src = img;
      modalImage.alt = title;
      modalTitle.textContent = title;
      modalDate.textContent = formatted;
      modalExplanation.textContent = explain;
      modal.classList.remove('hidden');
    });

    const card = document.createElement('div');
    card.className = 'card';

    const titleEle = document.createElement('h3');
    titleEle.textContent = title;

    const dateEle = document.createElement('p');
    dateEle.textContent = formatted;

  
    card.appendChild(imgEle);
    card.appendChild(titleEle);
    card.appendChild(dateEle);

    
    gallery.appendChild(card);

  });
}


