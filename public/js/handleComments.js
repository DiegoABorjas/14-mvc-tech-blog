const newCommentHandler = async (event) => {
    event.preventDefault();
    
    const text = document.querySelector('#comment-text').value.trim();
    const submitButton = document.getElementById('comment-submit')
    const post_id = submitButton.getAttribute('data-id');

    console.log(text)
    console.log(post_id)
  
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ post_id, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  };

  document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);