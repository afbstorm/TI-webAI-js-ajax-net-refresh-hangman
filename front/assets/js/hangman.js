import {get, getAll, del, add} from './services.js'

// CRUD Fonctions
const getOne = async () => {
    try {
        return await get();
    } catch (err) {
        console.error(err)
    }
}

const getList = async () => {
    try {
        return await getAll();
    } catch (err) {
        console.error(err)
    }
}

const addWord = async (word) => {
    try {
        return await addWord(word)
    } catch (err) {
        console.error(err)
    }
}

const deleteWord = async (id) => {
    try {
        return await del(id)
    } catch (err) {
        console.error(err)
    }
}

// MENU-PREGAME

let start = false;
const gameContainer = document.querySelector('.gameContainer');
const menuContainer = document.querySelector('.menuContainer');
const listButton = document.getElementById('getList');
const addToList = document.getElementById('add');
const startButton = document.getElementById('startGame')
const list = document.getElementById('list');
const addInput = document.getElementById('addInput');

const toggleGame = (start) => {
    if (start) {
        gameContainer.style.display = 'inline-flex';
        menuContainer.style.display = 'none';
        startButton.style.display = 'none';
    } else {
        gameContainer.style.display = 'none';
        menuContainer.style.display = 'block';
        startButton.style.display = 'block';
    }
    getOne().then(res => {
        if (res) {
            gameStart(res.data)
        }
    });
}

// Ajout d'un mot dans la DB
const addToDB = (e) => {
    e.preventDefault();
    add(addInput.value).then(res => {
        if (res) {
            window.location.reload();
        }
    })
}
addToList.addEventListener('click', addToDB);



// Affichage de la liste
const displayList = () => {
    getList()
        .then(res => {
            if(res) {
                wordList = res.data;
            }
        })
        .finally(() => {
            if (wordList.length > 0) {
                wordList.forEach(word => {
                    const listLine = document.createElement('li');
                    listLine.setAttribute('data-id', word.id);
                    const listItemContainer = document.createElement('div');
                    listItemContainer.setAttribute('class', 'itemFlex')
                    const listItem = document.createElement('p')

                    const binIcon = document.createElement('span');
                    binIcon.setAttribute('id', `delete`);
                    binIcon.classList.add('bin-icon');
                    binIcon.textContent = '🗑️';

                    listItem.textContent = word.word;
                    listItemContainer.appendChild(listItem);
                    listItemContainer.appendChild(binIcon);
                    listLine.appendChild(listItemContainer);

                    list.appendChild(listLine);
                });
            }
        })
}

listButton.addEventListener('click', displayList )

list.addEventListener('click', (event) => {
    if (event.target.classList.contains('bin-icon')) {
        const itemId = event.target.closest('li').getAttribute('data-id');
        deleteWord(itemId).then(res => {
            console.log(res)
            if (res.status === 200) {
               window.location.reload()
            }
        });
    }
});


// Démarrage de la partie

let wordList = [];
startButton.addEventListener('click', () => {
    start = !start;
    toggleGame(start)
})



const gameStart = (words) => {

    const wordToFind = words.word;
    let word = document.getElementById("words");
    let img = document.getElementById("imgSrc");
    let chancesLeft = document.getElementById("chancesLeft");
    let lettersFound = document.getElementById("lettersFound");
    let lettersToFind = document.getElementById("lettersToFind");
    let lettersFoundNum = 0;
    let wordGuessed = [];
    let error = 0;
    let toFind = wordToFind.length;
    lettersToFind.innerHTML = "Lettres restantes : " + toFind;
    lettersFound.innerHTML = "Lettres trouvées : ";
    chancesLeft.innerHTML = "Essais restants : " + (7-error);



    console.log(wordToFind)

    for (let elem of wordToFind) {
        elem += "_"
        wordGuessed.push("_");
        word.innerHTML += "_" + `\n`;
    }

    document.getElementById("alertCloseButton").addEventListener("click", () => {
        document.getElementById("alert").style.display = "none";
    })
    document.getElementById("newGame").addEventListener("click", () => {
        location.reload();
    })
    function alerte(text) {
        document.getElementById("alertText").innerHTML = text;
        document.getElementById("alert").style.display = "flex";
    }

    function wordToGuess(choice) {
        let i = 0;

        for (let elem of wordToFind) {
            if (choice === elem) {
                lettersFoundNum++;
                toFind--;
                wordGuessed[i] = elem;
                word.innerHTML = wordGuessed.join(' ');
                lettersFound.innerHTML = "Lettres trouvées : " + lettersFoundNum;
                lettersToFind.innerHTML = "Lettres restantes : " + toFind;
                document.getElementById(choice).style.backgroundColor = "green";
                document.getElementById(choice).style.color = "white";
            }

            if (lettersFoundNum === wordToFind.length) {
                alerte("Bravo, vous avez gagné. N'hésitez pas à retenter votre chance !");
            }
            i++;
        }
        if (wordToFind.includes(choice) === false) {
            error += 1;
            img.src = "./assets/img/" + error + ".png";
            chancesLeft.innerHTML = "Essais restants : " + (7-error);
            document.getElementById(choice).style.backgroundColor = "red";
            document.getElementById(choice).style.color = "white";
        }
        if (error === 7) {
            img.src = "./assets/img/7.png";
            alerte("Oh noes, vous avez malheureusement perdu.. Mais pas d'inquiétude, juste quelques pixels sont morts.")
        }
    };

    document.querySelectorAll(".letter").forEach((element) =>
        element.addEventListener("click", () => {
            if (document.querySelector("#" + element.id))
                if (wordGuessed.includes(element.id)) {
                    alert('La lettre à déjà été placée');
                } else {
                    wordToGuess(element.id);
                }
        }));

    window.addEventListener("keypress", () => {

        if (document.querySelector("#" + event.key))
            if (wordGuessed.includes(event.key)) {
                alert('La lettre à déjà été placée');
            } else {
                wordToGuess(event.key);
            }
    });

}

