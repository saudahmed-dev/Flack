import React, { Component } from "react";
import EmojiSearchContainer from "./emoji-search-container";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.input,
      render: true,
      editMode: false,
      timePosted: this.props.timePosted,
      edited: false
    };
    this.deletePost = this.deletePost.bind(this);
    this.submitEditedPost = this.submitEditedPost.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.contentRef = React.createRef();
  }

  deletePost() {
    this.setState({ render: false });
  }

  submitEditedPost() {
    let updatedTime = new Date().toLocaleTimeString();
    this.setState({
      content: this.contentRef.current.innerHTML,
      editMode: false,
      timePosted: updatedTime,
      edited: true
    });
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
    setTimeout(() => this.contentRef.current.focus(), 1);
  }

  render() {
    const editTextArea = (
      <React.Fragment>
        <div
          contentEditable
          className="editMessageArea"
          dangerouslySetInnerHTML={{ __html: this.state.content }}
          ref={this.contentRef}
        />
      </React.Fragment>
    );
    const editOptions = (
      <React.Fragment>
        <button className="saveButton" onClick={this.submitEditedPost}>
          Save
        </button>
        <button className="deleteButton" onClick={this.deletePost}>
          Delete Post
        </button>
        <button className="closeEditOptions" onClick={this.toggleEditMode}>
          Close
        </button>
        <EmojiSearchContainer
          emojis={this.props.emojis}
          output={`#${this.props.id} .editMessageArea`}
        />
      </React.Fragment>
    );
    const editButton = (
      <React.Fragment>
        <button className="editButton" onClick={this.toggleEditMode}>
          Edit
        </button>
      </React.Fragment>
    );

    const Content = () => (
      <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
    );

    if (this.state.render) {
      return (
        <div className="message" id={this.props.id}>
          <div className="messageText">
            {this.state.editMode ? editTextArea : <Content />}
          </div>
          <div className="editSection">
            {this.state.editMode ? editOptions : editButton}
            {this.state.edited && <i>edited:</i>}
            {this.state.timePosted}
          </div>
        </div>
      );
    } else return null;
  }
}

export default Message;
