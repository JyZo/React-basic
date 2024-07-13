import React from "react";
import { useParams } from "react-router-dom";

function Detail(props) {
  let { id } = useParams();
  console.log(id);
  console.log(props);
  let result = props.shoes.find(function (item) {
    return item.id == id;
  });
  console.log(result);
  return (
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
      </div>
    </div>
  );
}

export default Detail;
