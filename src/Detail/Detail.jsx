import React, { Fragment, useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
import { Link, useParams } from "react-router-dom";

import alertify from "alertifyjs";

import CartAPI from "../API/CartAPI";
import queryString from "query-string";

import convertMoney from "../convertMoney";

function Detail(props) {
  const [detail, setDetail] = useState({});

  //id params cho từng sản phẩm
  const { id } = useParams();

  const [product, setProduct] = useState([]);

  //Hàm này gọi API và cắt chỉ lấy 4 sản phẩm
  const fetchda = async () => {
    const response = await ProductAPI.getAPI();
    const data = response;
    setProduct(data);
  };
  useEffect(() => {
    fetchda();
  }, [id]);

  //Phần này là để thay đổi số lượng khi mua sản phẩm
  const [text, setText] = useState(1);
  const onChangeText = (e) => {
    setText(e.target.value);
  };

  //Tăng lên 1 đơn vị
  const upText = () => {
    const value = parseInt(text) + 1;

    setText(value);
  };

  //Giảm 1 đơn vị
  const downText = () => {
    const value = parseInt(text) - 1;

    if (value === 0) return;

    setText(value);
  };

  //Hàm này để lấy dữ liệu chi tiết sản phẩm
  const fetchDataa = async () => {
    try {
      const response = await ProductAPI.getDetail(id);
      setDetail(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDataa();
  }, [id]);

  //Phần này dùng để xem review hay description
  const [review, setReview] = useState(false);

  //Hàm này là Thêm Sản Phẩm
  const addToCart = () => {
  

    const fetchPost = async () => {
      try {
        const params = {
          idProduct: detail._id, // Lấy idProduct
          count: text, // Lấy số lượng
        };

        const query = "?" + queryString.stringify(params);
        const response = await CartAPI.postAddToCart(query);
        alert(
          "Bạn Đã Thêm Hàng Thành Công, Vào Giỏ Hàng Để Kiểm Tra!"
        );
  
      } catch (er) {
        console.log(er);
        alert(er.response.data.message);
        return;
      }
    };

    fetchPost();
  };

  return (
    <Fragment>
      <section className="py-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-6">
              <div className="row m-sm-0">
                <div className="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0">
                  <div
                    className="owl-thumbs d-flex flex-row flex-sm-column"
                    data-slider-id="1"
                  >
                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                      <img className="w-100" src={detail.img1} alt="..." />
                    </div>
                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                      <img className="w-100" src={detail.img2} alt="..." />
                    </div>
                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                      <img className="w-100" src={detail.img3} alt="..." />
                    </div>
                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                      <img className="w-100" src={detail.img4} alt="..." />
                    </div>
                  </div>
                </div>

                <div
                  id="carouselExampleControls"
                  className="carousel slide col-sm-10 order-1 order-sm-2"
                  data-ride="carousel"
                >
                  <div className="carousel-inner owl-carousel product-slider">
                    <div className="carousel-item active">
                      <img
                        className="d-block w-100"
                        src={detail.img1}
                        alt="First slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src={detail.img2}
                        alt="Second slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src={detail.img3}
                        alt="Third slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src={detail.img4}
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <br></br>
              <h1>{detail.name}</h1>
              <br></br>
              <p className="text-muted lead">
                {convertMoney(detail.price)} VND
              </p>
              <br></br>
              <p className="text-small mb-4">{detail.short_desc}</p>
              <ul className="list-unstyled small d-inline-block">
                <li className="mb-3 bg-white text-muted">
                  <strong className="text-uppercase text-dark">
                    Category:
                  </strong>
                  <p className="reset-anchor ml-2">{detail.category}s</p>
                </li>
              </ul>
              <div className="row align-items-stretch mb-4">
                <div className="col-sm-5 pr-sm-0">
                  <div className="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white">
                    <span className="small text-uppercase text-gray mr-4 no-select">
                      Quantity
                    </span>
                    <div className="quantity">
                      <button
                        className="dec-btn p-0"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fas fa-caret-left" onClick={downText}></i>
                      </button>
                      <input
                        className="form-control border-0 shadow-0 p-0"
                        type="text"
                        value={text}
                        onChange={onChangeText}
                      />
                      <button
                        className="inc-btn p-0"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fas fa-caret-right" onClick={upText}></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 pl-sm-0">
                  <a
                    className="btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center px-0 text-white"
                    onClick={addToCart}
                  >
                    Add to cart
                  </a>
                </div>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>

          <br />
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <a
                className="nav-link fix_comment"
                onClick={() => {
                  setReview((prev) => !prev);
                }}
                style={
                  review
                    ? { backgroundColor: "#383838", color: "#ffffff" }
                    : { color: "#383838" }
                }
              >
                Description
              </a>
            </li>
          </ul>
          <div className="tab-content mb-5">
            {review ? (
              <div className="tab-pane fade show active">
                <div className="pt-4 pb-4 bg-white">
                  <h6 className="text-uppercase">Product description </h6>
                  <br></br>
                  <p
                    className="text-muted text-small mb-0"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {detail.long_desc}
                  </p>
                </div>
              </div>
            ) : (
              <div className="tab-pane fade show active"></div>
            )}
          </div>
          <h2 className="h5 text-uppercase mb-4">Related products</h2>
          <div className="row">
            {product &&
              product
                .filter(
                  (el) =>
                    el.category === detail.category && el._id !== detail._id
                )
                .map((value) => (
                  <div className="col-lg-3 col-sm-6" key={value._id}>
                    <div className="product text-center skel-loader">
                      <div className="d-block mb-3 position-relative">
                        <img
                          className="img-fluid w-100"
                          src={value.img1}
                          alt="..."
                        />
                        <div className="product-overlay">
                          <ul className="mb-0 list-inline"></ul>
                        </div>
                      </div>
                      <h6>
                        <Link
                          className="reset-anchor"
                          to={`/detail/${value._id}`}
                        >
                          {value.name}
                        </Link>
                      </h6>
                      <p className="small text-muted">
                        {convertMoney(value.price)} VND
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Detail;
