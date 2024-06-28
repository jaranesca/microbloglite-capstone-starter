"use strict";

// Function to create and append a post element to the container
function displayPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'feed mt-4';
    postElement.innerHTML = `
        <div class="feed">
            <div class="head">
                <div class="user">
                    <div class="profile-picture">
                        <img src="/images/profilepic1.jpg" alt="Profile Picture">
                    </div>
                    <div class="info">
                        <h3 class="card-title">${post.username}</h3>
                        <small class="card-subtitle mb-2 text-muted">${new Date(post.createdAt).toLocaleString()}</small>
                    </div>
                </div>
                <span class="edit">
                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                </span>
            </div>
            <div class="photo">
                <img src="/images/couple3.jpg" alt="Post Image">
            </div>
            <div class="action-button">
                <div class="interaction-button">
                    <span><ion-icon name="heart-outline"></ion-icon></span>
                    <span><ion-icon name="chatbubble-ellipses-outline"></ion-icon></span>
                    <span><ion-icon name="share-social-outline"></ion-icon></span>
                </div>
                <div class="bookmark">
                    <span><ion-icon name="bookmark-outline"></ion-icon></span>
                </div>
            </div>
            <div class="liked-by">
                <span><img src="/images/profilepic1.jpg" alt="Liked By"></span>
                <span><img src="/images/profilepic1.jpg" alt="Liked By"></span>
                <span><img src="/images/profilepic1.jpg" alt="Liked By"></span>
                <p>Liked by <b>Monce Lua</b> and <b>400 others</b></p>
            </div>
            <div class="caption">
                <p><b>${post.username}</b> ${post.text}</p>
            </div>
            <div class="comments text-muted">View all 145 comments</div>
        </div>
    `;
    document.getElementById('postsContainer').appendChild(postElement);
}

// Function to fetch posts from the API
async function fetchPosts() {
    try {
        const response = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0', {
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}

// Function to create a new post
async function createNewPost(postText) {
    try {
        const response = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'text': postText })
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        const data = await response.json();
        const newPost = {
            username: 'YourUsername',
            text: data.text,
            createdAt: new Date().toISOString()
        };
        displayPost(newPost);
        document.querySelector('#create-post').value = '';
    } catch (error) {
        console.error('Error creating post:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}

// Event listener for form submission to create new posts
document.querySelector('.create-post').addEventListener('submit', async function(event) {
    event.preventDefault();
    const postText = document.querySelector('#create-post').value.trim();
    if (postText) {
        try {
            await createNewPost(postText);
        } catch (error) {
            // Handle error 
            console.error('Failed to create post:', error);
        }
    } else {
        console.error('Post text is empty');
    }
});

// Initial fetch and display of posts
(async () => {
    try {
        const posts = await fetchPosts();
        posts.forEach(post => displayPost(post));
    } catch (error) {
        // Handle error 
        console.error('Failed to fetch and display posts:', error);
    }
})();
