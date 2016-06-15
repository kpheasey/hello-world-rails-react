var PostList = React.createClass({

  render: function() {
    var postNodes = this.props.data.map(function(post) {
      return (
          <Post author={post.author} key={post.id}>
            {post.text}
          </Post>
      )
    });

    return (
        <div className="postList">
          {postNodes}
        </div>
    );
  }
});
