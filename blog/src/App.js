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
  let [good, setGood] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [titleIdx, settitleIdx] = useState(0);
  let [inputVal, setinputVal] = useState("");

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

  const onDelete = (idx) => {
    const newTitle = title.filter((_, delIdx) => delIdx !== idx);
    setTitle(newTitle);
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: "red", fontSize: "20px" }}>블로그임</h4>
      </div>
      <h4>{logo}</h4>
      <button onClick={changeTitle}>코트값 변경</button>
      <button onClick={sortTitle}>글 순서 정렬</button>
      <h4>{post}</h4>
      {title.map(function (titleVal, idx) {
        console.log(titleVal);
        return (
          <div className="list" key={idx}>
            <h4
              onClick={() => {
                modal == false ? setModal(true) : setModal(false);
                settitleIdx(idx);
              }}
            >
              {titleVal}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let goodcopy = [...good];
                  goodcopy[idx] = good[idx] + 1;
                  setGood(goodcopy);
                }}
              >
                🏆
              </span>{" "}
              {good[idx]}
            </h4>
            <p>2월 19일 발행</p>
            <button
              onClick={() => {
                console.log("delete[" + idx + "]");
                onDelete(idx);
              }}
            >
              글 삭제
            </button>
          </div>
        );
      })}

      <input
        onChange={(e) => {
          setinputVal(e.target.value);
          console.log(inputVal);
        }}
      ></input>
      <button
        onClick={() => {
          setTitle(title.concat(inputVal));
        }}
      >
        글 추가
      </button>

      {modal == true ? (
        <Modal
          color="gold"
          title={title}
          changeTitle={changeTitle}
          titleIdx={titleIdx}
        />
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal" style={{ background: props.color }}>
      <h4>{props.title[props.titleIdx]}</h4>
      <p>title</p>
      <p>상세내용</p>
      <button onClick={props.changeTitle}>글수정</button>
    </div>
  );
}

export default App;
