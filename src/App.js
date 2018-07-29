import React, { Component } from "react";
import styled, { css } from "react-emotion";
import "./chulafont.css";
import Confetti from "react-confetti";
import { injectGlobal } from "emotion";
import { db } from "./firebase";
import FeedbackZone from "./FeedbackZone";

injectGlobal`
  * {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    font-family: Chula;
  }
`;

const Home = styled("div")`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Title = styled("h1")`
  margin: 0;
  font-size: 5em;
  font-weight: 700;
  text-align: center;
`;
const Desc = styled("span")`
  font-size: 1em;
  font-weight: 300;
  color: grey;
`;
const Column = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const config = {
  gravity: 0.1,
  numberOfPieces: 200,
  recycle: true
};
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Home id="home">
          <Column>
            <Title>จบแล้วโว้ยยยยยยย</Title>
            <Desc>ช่วยรีวิวเว้บหน่อยครับ :D</Desc>
            <FeedbackZone />
          </Column>
          <Confetti
            {...config}
            width={window.innerWidth - 10}
            height={window.innerHeight - 10}
          />
        </Home>
      </React.Fragment>
    );
  }
}

export default App;
