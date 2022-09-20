const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const loader = document.querySelector('.loader');

//API Call
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

//update DOM
const updateDOM = () => {
  //loop through results array and add dynamic values to HTML for each
  resultsArray.forEach((result) => {
    //Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    //Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    //Image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture of the Day';
    image.loading = 'lazy';
    image.classList.add('card-img-top');
    //Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    //Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    //Save
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    saveText.textContent = 'Add to Favorites';
    saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
    //card Text
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = result.explanation;
    //footer
    const cardFooter = document.createElement('small');
    cardFooter.classList.add('text-muted');
    //date
    const date = document.createElement('strong');
    date.textContent = result.date;
    //copyright
    const copyrightResult =
      result.copyright === 'undefined' ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = `${copyrightResult}`;
    //Append
    cardFooter.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, cardFooter);
    link.append(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
    console.log(card);
  });
};

//get 10 images
const getNasaPictures = async () => {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM();
  } catch (error) {
    console.log(error);
  }
};

//Add result to favorites
const saveFavorite = (itemUrl) => {
  console.log(itemUrl);
};

//on load
getNasaPictures();
