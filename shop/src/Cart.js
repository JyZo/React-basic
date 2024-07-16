import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { ageUp, changeName } from "./store/userSlice";
import { countUp } from "./store";

function Cart() {
  let reduxState = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  console.log(reduxState.cart);

  return (
    <div>
      {reduxState.user.name} 's CART || AGE : {reduxState.user.age}
      <button
        onClick={() => {
          dispatch(ageUp(3));
        }}
      >
        ageUp
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {reduxState.cart.map(function (item, idx) {
            return (
              <tr key={idx}>
                <td>{idx}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <button
                    onClick={() => {
                      // dispatch(changeName());
                      dispatch(countUp({ id: item.id }));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
