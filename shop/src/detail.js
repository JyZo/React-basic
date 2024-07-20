import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { Context1 } from "./App";
import { countUp, cartAdd, addItem } from "./store";

// let YellownBtn = styled.button`
//   background: yellow;
//   color: black;
//   padding: 10px;
// `;

// let ColorBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: black;
//   padding: 10px;
// `;

function Detail(props) {
  let [count, setCount] = useState(0);
  let [alertt, setAlert] = useState(true);
  let [input, setInput] = useState();
  let [tab, setTab] = useState(1);
  let { id } = useParams();
  let result = props.shoes.find(
    function (item) {
      return item.id == id;
    },
    [input]
  );

  let stockContext = useContext(Context1);

  let reduxState = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  console.log(reduxState);

  useEffect(() => {
    console.log(result.id);
    let getItem = localStorage.getItem("watched");
    getItem = JSON.parse(getItem);
    getItem.push(result.id);
    getItem = new Set(getItem);
    getItem = Array.from(getItem);
    console.log("---------------------------------");
    console.log(getItem);
    localStorage.setItem("watched", JSON.stringify(getItem));
  }, []);

  useEffect(() => {
    let a = setTimeout(() => {
      setAlert(false);
      console.log(2);
    }, 2000);
    return () => {
      //useEffect 실행전 실행된다 //mount시 실행은 안되지만 unmount시 실행됨
      console.log(1);
      clearTimeout(a);
    };
  }, []);

  useEffect(() => {
    // let inputId = document.getElementById(e.target.id);
    // let inputVal = Number(e.target.value);
    if (isNaN(input)) {
      console.log("plz input number");
      // inputId.value = null;
      return;
    }
  }, [input]);

  return (
    <div className="container">
      {alertt == true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes1.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{result.title}</h4>
          <p>{result.content}</p>
          <p>{result.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              // dispatch(cartAdd({ cart: 111 }));
              dispatch(addItem({ id: 3, name: "Red Knit", count: 1 }));
            }}
          >
            주문하기
          </button>
          {count}
          <button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            countUp
          </button>
          <input
            type="text"
            id="inputtext"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          {/* <YellownBtn>ybt</YellownBtn>
        <ColorBtn bg="gold">gbt</ColorBtn> */}
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {stockContext}
      <TabContent tab={tab}></TabContent>
    </div>
  );
}

function TabContent(props) {
  let [fade, setFade] = useState("");
  let { stockContext } = useContext(Context1);
  // if (props.tab === 0) {
  //   return <div>내용0</div>;
  // } else if (props.tab === 1) {
  //   return <div>내용1</div>;
  // } else if (props.tab === 2) {
  //   return <div>내용2</div>;
  // }
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout();
      setFade("");
    };
  }, [props.tab]);
  return (
    <div className={"start " + fade}>
      {
        [<div>내용0 {stockContext}</div>, <div>내용1</div>, <div>내용2</div>][
          props.tab
        ]
      }
    </div>
  );
}

export default Detail;
