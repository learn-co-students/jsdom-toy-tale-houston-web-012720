let addToy = false;

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const form = document.querySelector("form.add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });


  function showToys(toyArray){
    toyArray.map(toy => {
      createToy(toy)
    })
  }
  
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => showToys(toys))

function createToy(toy){
  const toy_list = document.querySelector("#toy-collection")
  const div = makeToyCard(toy);
  toy_list.append(div);
}

function makeToyCard(toy) {
  const div = document.createElement("div");
  div.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = toy.name;

  const img = document.createElement("img");
  img.src = toy.image
  img.className = "toy-avatar"

  const p = document.createElement("p");
  p.innerText = `${toy.likes} Likes`

  const likeBtn = document.createElement("button");
  likeBtn.className = "like-btn"
  likeBtn.innerText = "Like <3"

  likeBtn.addEventListener("click", ()=> {
    const configObj = {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application.json"
      },
      body: JSON.stringify({
        likes: ++toy.likes // if you do toy.likes++ its doing toy.likes = toy.likes + 1, so this returns the original value AND THEN incrementing. ++ before increments then returns that value. 
      })
    };

    fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
      .then(res => res.json())
      .then(updatedToy => {
      p.innerText = `${updatedToy.likes} Likes`
      // toy = updatedToy // do this or Toy will not increment more than once cause it references the original object
      })
  });

  const delBtn = document.createElement("button");
  delBtn.innerText = "Remove Toy"

  delBtn.addEventListener("click", () =>{
    const delObj = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/toys/${toy.id}`, delObj)
      .then(res => res.json())
      .then(remove => {
        div.remove()
      })
  });

  div.append(h2, img, p, likeBtn, delBtn);
  return div;
}

  // add a new toy

  form.addEventListener("submit", () => {
    event.preventDefault()

    // let name = document.getElementById("toy-name").value // you can use the method below and not have to type the id's into the html
    let name = event.target[0].value
    // let url = document.getElementById("img-url").value
    let url = event.target[1].value
    let likes = 0

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: url,
        likes: likes
      })
    })
    .then(res => res.json())
    .then(newToy => {createToy(newToy)
      form.reset()
      toyForm.style.display = "none"
      addToy = !addToy
    })
    // event.target.reset() // optimistic... I keep getting error when I try to set it up as pessimistic

  });
