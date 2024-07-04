import React, { Component, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let post = "강남 우동 맛집";
  let [글제목, b] = useState("여자 코트 추천");
  let [logo, setLogo] = useState("ReactBlog");

  let nums = [1, 2];
  let num = nums[0];

  let [a, c] = [1, 2];

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: "red", fontSize: "20px" }}>블로그임</h4>
      </div>
      <div className="list">
        <h4>{logo}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>글 제목</h4>
        <p>2월 18일 발행</p>
      </div>
      <div className="list">
        <h4>{a}</h4>
        <p>2월 19일 발행</p>
      </div>
      <h4>{post}</h4>
    </div>
  );
}

export default App;
