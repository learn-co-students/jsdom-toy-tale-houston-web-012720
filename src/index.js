// Whether toyForm is being shown or not
let addToy = false;

// Makes sure all our HTML is loaded before continuing
document.addEventListener("DOMContentLoaded", () => {

  // Create variables and set to HTML elements
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form")

  // Creates a toy card HTML element and appends it to the sites body
  function addToy(toy) {
    const toy_list = document.querySelector("#toy-collection")
    const div = createToyCard(toy)
    toy_list.append(div)
  }

  // Creates all the HTML that will be contained inside our card
  function createToyCard(toy) {
    // Creates the HTML elements
    const div = document.createElement("div")
    const name_text = document.createElement("h2")
    const likes_label = document.createElement("p")
    const image = document.createElement("img")
    const like_button = document.createElement("button")
    const delete_button = document.createElement("button")

    // Sets the class name of each element
    div.className = "card"
    name_text.className = "name"
    likes_label.className = "likes"
    image.className = "toy-avatar"
    like_button.className = "like-btn"
    delete_button.className = "delete-btn"

    // Sets the needed information to a value
    name_text.innerText = toy.name
    likes_label.innerText = "Likes: " + toy.likes
    image.src = toy.image
    like_button.innerText = "Like"
    delete_button.innerText = "Delete"

    // Adds our elements to the page or to another element
    document.body.append(div)
    div.append(name_text)
    div.append(image)
    div.append(likes_label)
    div.append(like_button)
    div.append(delete_button)

    // Runs when the "Like" button is clicked
    like_button.addEventListener("click", () => {

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        // Add 1 to the value of likes 
        body: JSON.stringify({likes: toy.likes += 1})
      })
        .then(res => res.json())
        .then( toy => {
          // Updates the HTML for our element so we dont need to reload the page
          likes_label.innerText = "Likes: " + toy.likes
        })

    })

    // Deletes a toy from the json-server
    delete_button.addEventListener("click", () => {

      event.target.parentElement.style.display = "none"

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .then( res => res.json() )
        .then( toy => {
          console.log("Toy Deleted!")
        })

    })

  }

  // Get all of our toys from the json-server and renders a card for each
  fetch("http://localhost:3000/toys")
    .then( res => res.json() )
    .then( toys => {
      for (const toy of toys) {
        createToyCard(toy)
      }
    })

  // Creates a button that will show a form when clicked
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Collects all the data from our form,
  // Creates a new to with that data, and adds it to our json-server
  toyForm.addEventListener("submit", () => {
    event.preventDefault()

    const name = toyForm[0].value
    const image = toyForm[1].value

    // Change the boolean to the opposite value
    addToy = !addToy;

    // If addToy is true, make the form visible, else make it invisible
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

    // Add a new toy to our server with the given information
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        likes: 0,
        image: image
      })
    })
      .then( res => res.json())
      .then( json => {
        addToy(json)
      })
  })

});
