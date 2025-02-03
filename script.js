// hardcoded data

const users = [

    { id: 1, username: "john_doe", bio: "Archaeology enthusiast.", credentials: "BA in History" },
    { id: 2, username: "jane_smith", bio: "Researcher in paleontology.", credentials: "PhD in Paleontology" },
    { id: 3, username: "alex_wong", bio: "Student of archaeology.", credentials: "MA in Archaeology" },
    { id: 4, username: "emily_clark", bio: "Freelance writer.", credentials: "Published Author" },
    { id: 5, username: "mike_brown", bio: "Amateur fossil collector.", credentials: "Self-Taught" },

  ];
  
  const posts = [

    {
      id: 1,
      title: "Discovering Ancient Fossils",
      body: "A recent excavation in Morocco revealed fascinating fossils...",
      author: users[0],
      date: "2024-10-01",
      tags: ["fossils", "Morocco"],
      upvotes: 10,
      downvotes: 2,
      comments: [
        { id: 1, author: users[1], body: "Great find!", date: "2024-10-02" },
        { id: 2, author: users[2], body: "Where exactly was this?", date: "2024-10-03" },
      ],
    },

    // we add the 4 more posts here

  ];
  
  // function to display posts on homepage
  function displayPosts( filteredPosts ){

    const postsSection = document.getElementById("posts");
    postsSection.innerHTML = "";
  
    filteredPosts.forEach( ( post ) => {

      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <div class="meta">
          Posted by ${post.author.username} on ${post.date}
        </div>
        <div class="tags">
          ${post.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <p>${post.body}</p>
        <div class="votes">
          <button onclick="upvotePost(${post.id})">👍 ${post.upvotes}</button>
          <button onclick="downvotePost(${post.id})">👎 ${post.downvotes}</button>
        </div>
        <a href="post.html?id=${post.id}">Read more...</a>
      `;

      postsSection.appendChild( postElement );

    });

  }
  
  // function to display a single post and its comments (post)

  function displayPostDetails() {
    const postId = new URLSearchParams(window.location.search).get("id");
    const post = posts.find((p) => p.id === parseInt(postId));
  
    if (post) {
      const postDetailsSection = document.getElementById("post-details");
      postDetailsSection.innerHTML = `
        <div class="post-details">
          <h2 class="post-title">${post.title}</h2>
          <div class="post-meta">
            Posted by <span class="post-author">${post.author.username}</span> on 
            <span class="post-date">${post.date}</span>
          </div>
          <hr class= "post-divider">
          <div class="post-tags">
            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
            
          <p class="post-body">${post.body}</p>
          <div class="post-votes">
            <button class="upvote-btn" onclick="upvotePost(${post.id})">👍 ${post.upvotes}</button>
            <button class="downvote-btn" onclick="downvotePost(${post.id})">👎 ${post.downvotes}</button>
          </div>
        </div>
      `;
  
      const commentsSection = document.getElementById("comments");
      commentsSection.innerHTML = `
        <div class="comments-section">
          <h2 class="comments-title">Comments (${post.comments.length})</h2>
          ${post.comments
            .map(
              (comment) => `
              <div class="comment">
                <div class="comment-meta">
                  <span class="comment-author">${comment.author.username}</span> on 
                  <span class="comment-date">${comment.date}</span>
                </div>
                <p class="comment-body">${comment.body}</p>
              </div>
            `
            )
            .join("")}
        </div>
      `;
    } else {
      document.getElementById("post-details").innerHTML = "<p class='error-message'>Post not found.</p>";
    }
  }
  
  
  // initial display of posts on homepage
  if( window.location.pathname.endsWith("index.html") || window.location.pathname === "/"){

    displayPosts( posts );

  }
  
  // displasy post details on the post.html
  if( window.location.pathname.endsWith("post.html") ){

    displayPostDetails();

  }
  
  // upvote and downvote (depends on whether you guys want to make the upvote and downvote only limited once to one person and for it to update)
  function upvotePost( postId ){

    const post = posts.find( ( p ) => p.id === postId );
    post.upvotes++;

    if( window.location.pathname.endsWith("index.html") || window.location.pathname === "/"){

      displayPosts( posts );

    }else if( window.location.pathname.endsWith("post.html") ){

      displayPostDetails();

    }

  }
  
  function downvotePost( postId ){

    const post = posts.find( ( p ) => p.id === postId );
    post.downvotes++;

    if( window.location.pathname.endsWith("index.html") || window.location.pathname === "/"){

      displayPosts( posts );

    }else if( window.location.pathname.endsWith("post.html") ){

      displayPostDetails();

    }
    
  }