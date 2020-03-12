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

  const toyCollection = document.querySelector("#toy-collection")

  // show collection of toys
  function showToy (toy){
    // function to take in a toy object and convery it in appended html tags 
    let div = document.createElement("div")
    div.className = "card"
    
    let h2 = document.createElement("h2")
    h2.innerText = toy["name"]

    let img = document.createElement("img")
    img.src = toy["image"]
    img.className = "toy-avatar"

    let p = document.createElement("p")
    p.innerText = `${toy["likes"]}  Likes`

    let likeBtn = document.createElement("button")
    likeBtn.className = "like-btn"
    likeBtn.innerText = "Like <3"

    likeBtn.addEventListener("click", () => {
      
      fetch("http://localhost:3000/toys/" + toy.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
          likes: ++toy.likes
          // likes: toy.likes + 1 wont work bc toy is always going to have the initially loaded likes number
          // likes: toy.likes++ same thing as  toy.likes = toy.likes + 1 
          // likes: ++toy.likes ++first increments the value and then returns it 
          // likes: toy.likes++ last++ returns the value and then increments it
        })
      })
      .then(resp => resp.json())
      .then(data => {
        // toy = data
        p.innerText = `${data["likes"]} Likes`})      
    })

    let deleteBtn = document.createElement("button")
    deleteBtn.className = "delete-btn"
    deleteBtn.innerText = "Trash :("

    deleteBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/toys/" + toy.id, {
      method: "DELETE"
    })
    .then  (resp => resp.json())
    .then (data => div.remove())
    })

    div.append(h2, img, p, likeBtn, deleteBtn)
    toyCollection.append(div)

  }

  function showToys (arr) {
    // function to iterate over array of toys and do show toy
    arr.map(toy => showToy(toy))
  }


  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => showToys(data))

  let form = document.querySelector(".add-toy-form")

  form.addEventListener("submit", () => {
    event.preventDefault()
    const n = form[0].value
    const i = form[1].value
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: n,
        image: i,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(data => 
      {showToy(data)
      form.reset()})
  })

})