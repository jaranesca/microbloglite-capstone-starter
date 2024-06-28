"use strict";

// Function to create and append a post element to the container
function displayPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'posts-section';
    postElement.innerHTML = `
                
                <p><b>${post.username}</b> ${post.text}</p>
                <div class="post-bar">
											<div class="post_topbar">
												<div class="usy-dt">
													<img src="images/p5.jpeg" alt="" id="profile-image">
													<div class="usy-name">
                                                    <h3 class="card-title">${post.username}</h3>
                                                    <small class="card-subtitle mb-2 text-muted">${new Date(post.createdAt).toLocaleString()}</small>
                
													</div>
												</div>
												<div class="ed-opts">
													<a href="#" title="" class="ed-opts-open"><i class="la la-ellipsis-v"></i></a>
													<ul class="ed-options">
														<li><a href="#" title="">Edit Post</a></li>
														<li><a href="#" title="">Unsaved</a></li>
														<li><a href="#" title="">Unbid</a></li>
														<li><a href="#" title="">Close</a></li>
														<li><a href="#" title="">Hide</a></li>
													</ul>
												</div>
											</div>
											<div class="epi-sec">
												<ul class="bk-links">
													<li><a href="#" title=""><i class="la la-bookmark"></i></a></li>
												</ul>
											</div>
											<div class="job_descp">
												<br>
												<h2>10s across the board</h2>
												<br>
                                                <p><b>${post.username}</b> ${post.text}</p>
											</div>
											<div class="job-status-bar">
												<ul class="like-com">
													<li>
														<a href="#"><i class="fas fa-heart"></i> Like</a>
														<img src="images/liked-img.png" alt="">
													</li> 
													<li><a href="#" class="com"><i class="fas fa-comment-alt"></i> Comment 15</a></li>
												</ul>
												<a href="#"><i class="fas fa-eye"></i>Views 50</a>
											</div>
										</div><!--post-bar end-->
          
    `;
    document.getElementById('postsContainer').appendChild(postElement);
}

// Function to fetch posts from the API
function displayPosts() {
    
    const mylogin = getLoginData();
    console.log(mylogin);
    // Fetch posts from the API and display them
    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0', {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${mylogin.token}` 
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(post => displayPost(post));
    })
    .catch(error => console.error('Error fetching posts:', error));
    
    }
    displayPosts();


// Function to create a new post
async function createNewPost(postText) {
    try {
        const response = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphcmFuZXNjYUIiLCJpYXQiOjE3MTk1OTIzMDcsImV4cCI6MTcxOTY3ODcwN30.X7SmG734bozePyySyL_5ARanYMk92JZaGFNEqDo_akY ',
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
