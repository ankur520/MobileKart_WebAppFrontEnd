import React from "react";
import { Link } from "react-router-dom";

const SecondHeaderItem = (props) => {
  return (
    <>
      <div className="categoryBox">
        <a href="#">
          <div className="categoryImage">
            <img src={props.imageUrl} alt={props.subCategoryName} />
          </div>
          <Link
            to={`http://localhost:3000/productall/Mobiles/${props.subCategoryName}/`}
          >
            <p className="shopCategory" title={props.subCategoryName} >{props.subCategoryName}</p>
          </Link>
        </a>
      </div>
    </>
  );
};

export default SecondHeaderItem;
