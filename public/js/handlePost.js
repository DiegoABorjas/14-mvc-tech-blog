const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-desc').value.trim();


  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to create post');
  }

};

const editFormHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-desc').value.trim();


    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('POST EDITED')
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

if (document
  .querySelector('.new-post-form')) {
  document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
}

if (document
  .querySelector('.edit-post-form')) {
    document.querySelector('.edit-post-form')
    .addEventListener('click', editFormHandler);
}

if (document
  .querySelector('.post-list')) {
  document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
}
