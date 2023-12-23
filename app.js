const searchBtn = document.querySelector('.search-btn');
let searchInput = document.querySelector('#searchInput');
let word = document.querySelector('.word');
let Text = document.querySelector('.text');
let result = document.querySelector('.result');
let sound = document.querySelector('.sound');
let audioPlay = document.querySelector('audio');
let url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

searchBtn.addEventListener('click', () =>{
    let inputValue =  searchInput.value;
    fetch(`${url}${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
        data;
    result.innerHTML = `
    <div class="word">
                <h3 class="text">${inputValue}</h3>
                <button id="volumeBtn" onclick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;

            // if audio is null then hide sound Btn
        let volumeBtn = document.querySelector('#volumeBtn');
        if (data[0].phonetics[0].audio == ''){
            volumeBtn.style.display='none';
        } else{
            volumeBtn.style.display='block'
        }
    audioPlay.setAttribute("src", `${data[0].phonetics[0].audio}`);
     })
     .catch((error) =>{
        result.innerHTML = `<h3 class= "error">Couldn't find the word</h3>`;
        console.log(error);
     }) 
});

 function playSound() {
     audioPlay.play();
}