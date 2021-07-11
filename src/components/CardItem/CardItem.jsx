import React, { useState } from "react";
import "./CardItem.scss";
import StarRatings from "react-star-ratings";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Modal,
  ModalBody,
} from "reactstrap";
import useCart from "../../utils/customHooks/useCart";
import { FaCartPlus } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

const CardItem = ({ productItem }) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const toggle = () => setModal(!modal);

  const { handleAddToCart } = useCart();

  return (
    <>
      <Card className="p-0 cardItem">
        <div className="position-relative">
          <CardImg
            top
            width="100%"
            src={productItem.imageURL}
            alt={productItem.name}
          />
          <div className="cardBtns d-none mb-3 justify-content-center position-absolute bottom-0 w-100">
            <button
              className="iconBtn mx-1 d-flex justify-content-center align-items-center"
              onClick={handleAddToCart(productItem)}
              disabled={!!!productItem.countInStock}
            >
              <FaCartPlus />
            </button>
            <button
              className="iconBtn mx-1 d-flex justify-content-center align-items-center"
              onClick={() => {
                toggle();
                setModalContent(productItem);
              }}
            >
              <BsEyeFill />
            </button>
          </div>
        </div>
        <CardBody className="d-flex flex-column justify-content-between px-3">
          <CardTitle tag="h6" className="ellipsis-txt">
            {productItem.name}
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted">
            {productItem.brand}
          </CardSubtitle>
          <CardText>{productItem.price} EGP</CardText>
        </CardBody>
      </Card>

      {modalContent && modal && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalBody>
            <TiDelete
              className="h3 position-absolute m-2 end-0 me-4 text-danger exit-btn"
              onClick={toggle}
            />
            <div className="mr-2 mb-2">
              <img
                src={modalContent.imageURL}
                alt={modalContent.name}
                className="w-100"
              />
            </div>
            <div>
              <h5 className="pb-2 border-bottom">{modalContent.name}</h5>
              <StarRatings
                rating={modalContent.rating}
                starDimension="18px"
                starSpacing="2px"
                starRatedColor="gold"
              />
              <p className="ps-2">{modalContent.brand}</p>

              <p className="mt-3 ps-2">{modalContent.description}</p>
              <p className="ps-2">{modalContent.price} EGP</p>
              {!!productItem.countInStock ? (
                <button
                  className=" ms-2 iconBtn d-flex justify-content-center align-items-center"
                  onClick={() => {
                    toggle();
                    handleAddToCart(productItem)();
                  }}
                >
                  <FaCartPlus />
                </button>
              ) : (
                <button className="ms-2 btn btn-secondary btn-sm" disabled>
                  Not Available In Stock
                </button>
              )}
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default CardItem;
