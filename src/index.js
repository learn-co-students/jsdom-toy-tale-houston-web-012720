let addToy = false;



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

const make_toy = (toy) => {
  let main_div = document.querySelector("div#toy-collection")
  let div = document.createElement("div")
  div.className = "card"

  let name = document.createElement("h2")
  name.innerText = toy.name

  let image = document.createElement("img")
  image.src = toy.image
  image.className = "toy-avatar"

  let like_btn = document.createElement("button")
  like_btn.className = "like-btn"
  like_btn.innerHTML = "&#128077;&#127995 Like"
  like_btn.addEventListener("click", () => {
    let inc_like = toy.likes += 1
    like_or_dislike(inc_like,toy,likes)
  })

  let dis_like_btn = document.createElement("button")
  dis_like_btn.className = "like-btn"
  dis_like_btn.innerHTML = "&#128078;&#127995 Dislike"
  dis_like_btn.addEventListener("click", () => {
    let des_like = toy.likes -= 1
    like_or_dislike(des_like,toy,likes)
  })

  let delete_btn = document.createElement("button")
  delete_btn.className = "like-btn"
  delete_btn.innerHTML = "&#128465 Delete"

  delete_btn.addEventListener("click",() => {
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(toy => {div.remove()})
  })

  let likes = document.createElement("p")
  likes.innerText = `${toy.likes} Likes`

  div.append(name,image,likes,like_btn,dis_like_btn,delete_btn)
  main_div.append(div)
}

const display_data = (toys_data) => {
  toys_data.forEach(toy => {
    make_toy(toy)
  });
}

const make_new_toy = () => {
  let form = document.querySelector("form.add-toy-form")
  form.addEventListener("submit", ()=> {
    event.preventDefault()
    let data_obj = {
      "name": event.target[0].value,
      "image": event.target[1].value,
      "likes": 0
    }

    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data_obj)
    })
    .then(res => res.json())
    .then(toy => {
      make_toy(toy)
      form.reset()
    })
  })
}

const like_or_dislike = (number,toy,like_tag) => {
  fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "likes": number
      })
    })
    .then(res => res.json())
    .then(toy => {
      like_tag.textContent = `${number} Likes`
    })
}

const run_web = () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toy_arr => {display_data(toy_arr)})
  make_new_toy()
}

run_web()