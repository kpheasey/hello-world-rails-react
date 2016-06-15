var Post = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html:rawMarkup };
  },

  render: function() {
    return (
      <div className="post">
        <h2 className="postAuthor">
            {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    );
  }
});
