// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import {getDatabase, ref, child, get} 
from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";

const firebaseConfig = {
    // Replace with firebase realtime database api
};

const app = initializeApp(firebaseConfig)
const db = getDatabase()

// Content Page
const name = document.getElementById("band-name");
const active = document.getElementById("active");
const country = document.getElementById("country");
const genre = document.getElementById("genre");
const theme = document.getElementById("theme");
const status = document.getElementById("status");
const image = document.getElementById('image-band');
const logo = document.getElementById('band-logo');
const btnReload = document.getElementById('btn-reload');
const btnListen = document.getElementById('btn-listen');

// Read random enty database
function getDataFirebase(query){
    const dbRef = ref(db);

    get(child(dbRef, query))
    .then((snapshot) => {
        let content = [];

        snapshot.forEach(element => {
            content.push(element.val());
        });

        createPage(content);
    })
}

// Firebase query selector - 0 - 999
const createQuery = () => {
    let query = Math.floor(Math.random() * 999) + 1;
    query = "9" + query.toString()
    return query;
}

function getLink(id, typeImg) {
    const baseLink = "https://www.metal-archives.com/images"
    let fragmentLink = ''
    let completeLink = ''

    id = id.toString()
    for(let i = 0; i < id.length; i++){
        // https://www.metal-archives.com/images/9/3/1/9/9319_photo.jpg
        fragmentLink = fragmentLink + "/" + id[i];
    }
    if (typeImg == "band"){
        completeLink = baseLink + fragmentLink + "/" + id + "_photo.jpg"
    } else {
        completeLink = baseLink + fragmentLink + "/" + id + "_logo.jpg"
    }
    
    return completeLink
}

function createPage(content){
    name.innerHTML = content[5]
    active.innerHTML = content[0].replace(" |", " | ").replace("-", " - ").replace("| ", " | ")
    country.innerHTML = content[1]
    genre.innerHTML = content[3]
    theme.innerHTML = content[7].replace(" |", " | ").replace("-", " - ").replace("|", " | ").replace("  ", "")
    status.innerHTML = content[6]
    image.src = getLink(content[2], "band")

    btnListen.addEventListener('click', function(e){
        e.preventDefault();
        //  https://www.youtube.com/results?search_query=rafael+aaa

        const tituloPesquisar =  content[5].replace(" ", "+");
        const genrePesquisar = content[3].replace(" ", "+")
        const ytQuery = "https://www.youtube.com/results?search_query=" + tituloPesquisar + " " + genrePesquisar;
        window.open(ytQuery);
    })
}

btnReload.addEventListener('click', function(e){
    e.preventDefault();
    location.reload();
})

getDataFirebase(createQuery())
