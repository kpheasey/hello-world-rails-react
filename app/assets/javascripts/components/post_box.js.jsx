var PostBox = React.createClass({
  loadPostsFromServer: function() {
    var response = $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false
    });

    response.done(function(data) {
      console.log(data)
      this.setState({data: data});
    }.bind(this));

    response.fail(function(xhr, status, err) {
      console.log(this.props.url, status, err.toString());
    }.bind(this));
  },

  handlePostSubmit: function(post) {
    var posts = this.state.data;
    var newPosts = posts.concat([post]);

    post.id = Date.now();

    this.setState({data: newPosts});

    var response = $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: { post: post }
    });

    response.done(function(data){
      this.setState({data: posts.concat([data])})
    }.bind(this));

    response.fail(function(xhr, status, err) {
      this.setState({data: posts});
      console.log(this.props.url, status, err.toString());
    }.bind(this));
  },

  getInitialState: function() {
    return {data: []}
  },

  componentDidMount: function(){
    this.loadPostsFromServer();
    // setInterval(this.loadPostsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
        <div className="postBox">
            <h1>Posts</h1>
            <PostList data={this.state.data}/>
            <PostForm onPostSubmit={this.handlePostSubmit} />
        </div>
    );
  }
});
