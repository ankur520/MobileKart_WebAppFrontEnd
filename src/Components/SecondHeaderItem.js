import React from "react";
import { Link } from "react-router-dom";

const SecondHeaderItem = (props) => {
  return (
    <>
      <div className="categoryBox">
        <Link
          to={`http://localhost:3000/productall/Mobiles/${props.subCategoryName}/`}
        >
          <div className="categoryImage">
            <img src={props.imageUrl} alt={props.subCategoryName} />
          </div>
        </Link>
        <Link
          to={`http://localhost:3000/productall/Mobiles/${props.subCategoryName}/`}
        >
          <p className="shopCategory" title={props.subCategoryName}>
            {props.subCategoryName}
          </p>
        </Link>
      </div>
    </>
  );
};

export default SecondHeaderItem;
