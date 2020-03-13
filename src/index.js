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

  // getToys()
  showToys()
  formFunction()
});

let getToys = () => {
  return fetch("http://localhost:3000/toys")
  .then(r => r.json())
  // .then(json => showToys(json))
}

let showToys = () => {
  // toys.map(toy => showToy(toy))
  getToys().then(json => json.map(toy => showToy(toy)))
}

let showToy = (toy) => {
  const toyLs = document.querySelector('div#toy-collection')
  const div = makeToyCard(toy)
  toyLs.append(div)
}



let makeToyCard = (toy) => {
  const div = document.createElement('div')
  div.className = "card";

  const name = document.createElement('h2')
  name.innerText = toy.name;
  
  const img = document.createElement('img')
  img.src = toy.image;
  img.className = "toy-avatar"

  const likes = document.createElement('p')
  likes.innerText = `${toy.likes} Likes`
  
  const LkBtn = document.createElement('button')
  LkBtn.class = "like-btn"
  LkBtn.innerText = "Like <3"

  LkBtn.addEventListener('click', () => {
    
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Accept: "application/json"
      },
      body: JSON.stringify({
        likes: ++toy.likes
        // likes: Math.floor(Math.random() * Math.floor(10000))
      })
    })
    .then(r => r.json())
    .then(updatedToy => likes.innerText = `${updatedToy.likes} Likes`)
  })

  div.append(name, img, likes, LkBtn)

  return div
}

let formFunction = () => {
  const toyForm = document.querySelector(".container");
  toyForm.addEventListener('submit', e => {
    e.preventDefault()
    const form = document.querySelector('.add-toy-form')
    const inputs = form.querySelectorAll('input')

    const n = inputs[0].value
    const img = inputs[1].value

    fetch("http://localhost:3000/toys", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: n,
        image: img,
        likes: 0
      })
    })
    .then(r => r.json())
    .then(newToy => showToy(newToy))

    form.reset()
  })
}
