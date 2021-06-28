// const { Profile } = require("../../models");

//copy comment.js but change the q
async function addProfileHandler(event) {
    event.preventDefault();
    //'textarea[name="comment-body"] needs to be changed to the corresponding input field from the petform
    const petname = document.querySelector('#dogname-cpp').value.trim();
    const breed = document.querySelector('#breed-cpp').value.trim();
    const sex = document.querySelector('#sex-cpp').value.trim();
    const age = document.querySelector('#age-cpp').value.trim();
    const pet_bio = document.querySelector('#pet_bio-cpp').value.trim();


    if (petname && breed && sex && age && pet_bio) {

        const response = await fetch('/api/profile/profile', {
            method: 'POST',
            body: JSON.stringify({
                petname,
                breed,
                sex,
                age,
                pet_bio
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.cpp-form').addEventListener('submit', addProfileHandler);

//comment-form needs to be changed to whatever the context name I give to pet in the view// 