// document.querySelectorAll("comment-form").style.display ="none"
async function commentFormHandler(event) {
    event.preventDefault();
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    
    const pet_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(comment_text,post_id,"onClick event")

    if (comment_text) {
        const response = await fetch(`/api/comment/${pet_id}`, {
            method: 'POST',
            body: JSON.stringify({
             comment_text: comment_text
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

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);