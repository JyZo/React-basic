/* eslint-disable */
import React, { Component, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let post = "강남 우동 맛집";
  let [title, setTitle] = useState([
    "남자 코트 추천",
    "남자 바지 추천",
    "아이 셔츠 추천",
  ]);

  let [logo, setLogo] = useState("ReactBlog");
  let [good, setGood] = useState(0);

  const goodUp = () => {
    setGood(good + 1);
  };

  const changeTitle = () => {
    let copy = [...title];
    copy[0] = "여자 코트 추천";
    setTitle(copy);
  };

  const sortTitle = () => {
    let sortcopy = [...title];
    sortcopy.sort();
    setTitle(sortcopy);
  };
  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: "red", fontSize: "20px" }}>블로그임</h4>
      </div>
      <h4>{logo}</h4>
      <button onClick={changeTitle}>코트값 변경</button>
      <button onClick={sortTitle}>글 순서 정렬</button>
      <div className="list">
        <h4>
          {title[0]}
          <span
            onClick={() => {
              goodUp();
            }}
          >
            🏆
          </span>{" "}
          {good}{" "}
        </h4>
        <p>2월 18일 발행</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>2월 18일 발행</p>
      </div>
      <div className="list">
        <h4>{title[2]}</h4>
        <p>2월 19일 발행</p>
      </div>
      <h4>{post}</h4>
    </div>
  );
}

export default App;
