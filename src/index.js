let addToy = false;
const headers = {"Content-Type": "application/json"}

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
  fetch("http://localhost:3000/toys").then(r => r.json()).then(toys => displayToys(toys))
  const form = document.querySelector("form.add-toy-form")
  form.addEventListener("submit", (e) =>{
    e.preventDefault
    const name = document.querySelector("input#form_name").value
    const image = document.querySelector("input#form_image").value
    const likes = 0
    let parObj = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name,
        image,
        likes
      })
    }
    fetch("http://localhost:3000/toys", parObj).then(r => r.json()).then(toy => displayToy(toy))
  })
});

function displayToys(toys){
  for (toy of toys){
    displayToy(toy)
  }
}

function displayToy(toy){
  let h = document.createElement("h2")
  h.innerText = toy.name
  let img = document.createElement("img")
  img.src = toy.image
  img.className = "toy-avatar"
  let p = document.createElement("p")
  p.innerText = `${toy.likes} likes`
  p.id = toy.id
  let b = document.createElement("button")
  b.className = "like-btn"
  b.innerText = "Like"
  b.addEventListener("click", () =>{
    let parObj = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({likes: toy.likes +1})
    }
    fetch(`http://localhost:3000/toys/${toy.id}`, parObj)
      .then(r => r.json())
      .then((json) => {
        toy = json
        p.innerText = `${json.likes} likes`
        // debugger
      })
      
      
    })
  let d = document.createElement("div")
  d.className = "card"
  d.append(h, img, p, b)
  let div = document.querySelector("div#toy-collection")
  div.append(d)
}