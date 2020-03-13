let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyForm = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyForm.style.display = "block";
        } else {
            toyForm.style.display = "none";
        }
    });

    let toyform = document.getElementsByClassName('container')[0].children[0]
    toyform.addEventListener('submit', function(event) {
        event.preventDefault()
        let toyname = event.target[0].value
        let toyimg = event.target[1].value

        fetch('http://localhost:3000/toys', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "name": toyname,
                "image": toyimg,
                "likes": 0
            })
        }).then(function(res) {
            return res.json()
        }).then(function(newcreatedtoy) {
            addcard(newcreatedtoy)
        })
    })




    fetch("http://localhost:3000/toys")
        .then(function(res) {
            return res.json()
        }).then(function(toysarray) {
            showtoy(toysarray)
        })
});

function showtoy(toys) {
    toys.map(function(toy) {
        addcard(toy)
    })
}

function maketoycarddiv(toy) {
    let newCard = document.createElement('div')
    newCard.className = "card"
    let toyNameh2 = document.createElement('h2')
    toyNameh2.innerText = toy.name
    let img = document.createElement('img')
    img.src = toy.image
    img.className = "toy-avatar"
    let pLike = document.createElement('p')
    pLike.innerText = toy.likes
    let likeButton = document.createElement('button')
    likeButton.className = "like-btn"
    likeButton.innerText = "Like"
    likeButton.addEventListener('click', function() {
        fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "likes": toy.likes += 1
            })
        }).then(function(res) {
            return res.json()
        }).then(function(json) {
            pLike.innerText = json.likes
        })
    })





    newCard.append(toyNameh2, img, pLike, likeButton)
    return newCard
}

function addcard(toy) {
    let newcard = maketoycarddiv(toy)
    toycollectiondiv = document.getElementById("toy-collection")
    toycollectiondiv.append(newcard)
}