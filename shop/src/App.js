import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import bg from "./img/bg.jpg";
import {
  createContext,
  lazy,
  Suspense,
  useEffect,
  useState,
  useTransition,
} from "react";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
// import Detail from "./Detail.js";
// import Cart from "./Cart.js";
import axios from "axios";
import { useQuery } from "react-query";

const Detail = lazy(() => import("./Detail.js"));
const Cart = lazy(() => import("./Cart.js"));

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [stocks] = useState([10, 11, 12]);
  let [name, setName] = useState("");
  let maan = new Array(10000).fill(0);
  let [isPending, startTransition] = useTransition();

  let navigate = useNavigate();

  let obj = { name: "kim" };

  localStorage.setItem("data", JSON.stringify(obj));
  let getData = localStorage.getItem("data");
  console.log(JSON.parse(getData).name);

  let result = useQuery("reactQueryTest", () => {
    return axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((a) => {
        return a.data;
      });
  });

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">React-Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/detail");
                }}
              >
                Detail
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Cart
              </Nav.Link>
              <NavDropdown title="SubMenu" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto">
              {result.isLoading && "loading"}
              {result.error && "error"}
              {result.data && result.data.name}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Suspense fallback={<div>Loading~~</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="bg-container">
                  <div
                    className="main-bg"
                    style={{ backgroundImage: "url(" + bg + ")" }}
                  ></div>
                </div>
                <div className="container">
                  <div className="row">
                    {shoes.map(function (shoe, idx) {
                      return (
                        <div>
                          <Nav.Link
                            onClick={() => {
                              navigate("/detail/" + shoe.id);
                            }}
                          >
                            <Item key={idx} shoes={shoes[idx]}></Item>
                          </Nav.Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    axios
                      .get("https://codingapple1.github.io/shop/data3.json")
                      .then((result) => {
                        console.log(result.data);
                        setShoes(shoes.concat(result.data));
                      })
                      .catch(() => {
                        console.log("axios fail");
                      });
                  }}
                >
                  Ajaxbutton
                </button>
                <br></br>
                <input
                  onChange={(e) => {
                    startTransition(() => {
                      setName(e.target.value);
                    });
                  }}
                />
                {isPending
                  ? "Loading~~"
                  : maan.map(() => {
                      return <div>{name}</div>;
                    })}
              </>
            }
          ></Route>
          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={stocks}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          ></Route>
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>member</div>}></Route>
            <Route path="location" element={<div>location</div>}></Route>
          </Route>
          <Route path="/event" element={<Event />}>
            <Route
              path="one"
              element={<p>첫 주문시 양배추즙 서비스</p>}
            ></Route>
            <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<div>404 ERR</div>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

function Item(props) {
  console.log("shoes list");
  console.log(props.shoes);
  return (
    <div className="col-md-4">
      <img src={props.shoes.img} width="80%"></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price} 원</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>company info</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
