import React,{useState,useEffect} from 'react'

const Comment = () => {
  // State variables for comments and filtered comments
  const [comments, setComments] = useState([]);

  const [filteredComments, setFilteredComments] = useState([]);

  const [selectedPostId, setSelectedPostId] = useState(null);


  // Fetch the comments from the API on component mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  
  // Function to filter comments by postId
  const filterComments = () => {
    console.log(selectedPostId) // Log the selected PostID

    // Check if a PostID has been entered
    if (selectedPostId !== null) {
      // Filter comments based on the entered PostID
      const filtered = comments.filter((comment) => comment.postId === parseInt(selectedPostId, 10));
      setFilteredComments(filtered);
    } else {
      // If no PostID entered, clear filtered comments
      setFilteredComments([]);
    }
  };


  return (
    <>
    <div>
    {/* Header */}
    <div className="Navbar">
      <h1>Comment App - See Your Top Posts</h1>
    </div>

    {/* Main Content */}
    <div className="container">
        <div className="posts">
            <h2 className='posthead'>Top Posts</h2>
        
        {/* Post Filtering Section */}
        <div className='filterpost'>
            <h3>Filter by PostID :</h3>
            <input type="number" placeholder="Enter PostID" onChange={(e) => setSelectedPostId(e.target.value)}/>
            <button onClick={filterComments}>Filter</button>
        </div>
        
        {/* Display Posts */}
        <div className='PostsContainer'>
        <div className='PostItem'>
          <h2 className='posthead'>Your Posts</h2>

          {/* Display filtered or all comments */}
          {filteredComments.length === 0
            ? comments.map((comment) => (
                <div className='postitemcontainer' key={comment.id} onClick={() => setSelectedPostId(comment.postId)}>
                  <div className="id"><b>POST_ID :</b> {comment.postId}</div> <br />
                  <div className="id"><b>ID :</b> {comment.id}</div> <br />
                  <div className="name"><b>NAME :</b> {comment.name}</div> <br />
                  <div className="email"><b>EMAIL :</b> {comment.email}</div> <br />
                  <div className="body"><b>POST :</b> {comment.body}</div>
                </div>
              ))
            : filteredComments.map((comment) => (
              <div className='postitemcontainer' key={comment.id} onClick={() => setSelectedPostId(comment.postId)}>
              <div className="id"><b>POST_ID :</b> {comment.postId}</div> <br />
              <div className="id"><b>ID :</b> {comment.id}</div> <br />
              <div className="name"><b>NAME :</b> {comment.name}</div> <br />
              <div className="email"><b>EMAIL :</b> {comment.email}</div> <br />
              <div className="body"><b>POST :</b> {comment.body}</div>
            </div>
              ))}
        </div>

        {/* Display Comments for Selected PostID */}
        <div className='postComment'>
          {selectedPostId && (
            <div>
              <h2>Post {selectedPostId}'s Comments:</h2>
              {comments
                .filter((comment) => comment.postId === selectedPostId)
                .map((comment) => (
                  <div key={comment.id}>{comment.body}</div>
                ))}
            </div>
          )}
        </div>
      </div>
        </div>
      </div>
      <div className="footer">
        <p>&copy; 2023 hriteshCommentApp — All Rights Reserved</p>
      </div>
    </div>
    </>
  )
}

export default Comment
