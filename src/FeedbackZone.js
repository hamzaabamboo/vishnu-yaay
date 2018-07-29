import React from "react";
import styled, { css } from "react-emotion";
import { db } from "./firebase";

const Zone = styled("div")`
  display: flex;
  flex-direction: row;
`;

const Border = styled("div")`
  border-radius: 20px;
  border: 2px black solid;
  flex: 1 1 0;
  background-color: ${props =>
    props.dark ? "rgba(0, 0, 0, 0.1)" : "rgba(0,0,0,0)"};
  margin: 5px;
  text-align: center;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
`;

const Icon = styled("h3")`
  font-size: 2em;
`;
const Count = styled("h5")`
  font-size: 1em;
`;
class FeedbackZone extends React.Component {
  state = {
    clicked: window.localStorage.getItem("clicked")
  };
  setClicked = value => {
    this.setState({ clicked: value });
    window.localStorage.setItem("clicked", value);
  };
  render() {
    return (
      <Zone>
        <FeedbackButton
          icon="😊"
          type="happy"
          setClicked={this.setClicked}
          clicked={this.state.clicked}
        />
        <FeedbackButton
          icon="😐"
          type="neutral"
          setClicked={this.setClicked}
          clicked={this.state.clicked}
        />
        <FeedbackButton
          icon="😥"
          type="sad"
          setClicked={this.setClicked}
          clicked={this.state.clicked}
        />
      </Zone>
    );
  }
}

class FeedbackButton extends React.PureComponent {
  state = {
    count: "Loading..",
    clickable: false
  };
  handleClick = () => {
    if (this.state.clickable && !this.props.clicked) {
      db.collection("comments")
        .doc(this.props.type)
        .set({
          count: this.state.count + 1
        });
      this.props.setClicked(this.props.type);
    }
  };
  componentDidMount() {
    db.collection("comments")
      .doc(this.props.type)
      .onSnapshot(doc => {
        this.setState({
          count: doc.data().count,
          clickable: true
        });
      });
  }
  render() {
    return (
      <Border
        dark={this.props.type == this.props.clicked}
        onClick={this.handleClick}
      >
        <Icon>{this.props.icon}</Icon>
        <Count>{this.state.count}</Count>
      </Border>
    );
  }
}
export default FeedbackZone;
