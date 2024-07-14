import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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
  let { id } = useParams();

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

  useEffect(
    (e) => {
      // let inputId = document.getElementById(e.target.id);
      // let inputVal = Number(e.target.value);
      if (isNaN(input)) {
        alert("plz input number");
        // inputId.value = null;
        return;
      }
    },
    [input]
  );

  let result = props.shoes.find(
    function (item) {
      return item.id == id;
    },
    [input]
  );

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
          <button className="btn btn-danger">주문하기</button>
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
    </div>
  );
}

export default Detail;
