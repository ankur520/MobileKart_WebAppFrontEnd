import React from "react";
import { Link } from "react-router-dom";
import SecondHeaderItem from "./SecondHeaderItem";

const SecondHeader = () => {
  return (
    <>
      <section className="secondHeader" data-cy="secondHeader">
        <SecondHeaderItem
          imageUrl="https://images.samsung.com/is/image/samsung/assets/in/about-us/brand/logo/mo/256_144_3.png?$512_N_PNG$"
          subCategoryName="Samsung"
        />

        <SecondHeaderItem
          imageUrl="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
          subCategoryName="Apple"
        />

        <SecondHeaderItem
          imageUrl="https://www.nokia.com/sites/default/files/styles/scale_543_x_375_gallery/public/2023-02/nokia-refreshed-logo-2_1.png"
          subCategoryName="Nokia"
        />

        <SecondHeaderItem
          imageUrl="https://1000logos.net/wp-content/uploads/2021/08/Xiaomi-logo.png"
          subCategoryName="Xiaomi"
        />

        <SecondHeaderItem
          imageUrl="https://1000logos.net/wp-content/uploads/2018/10/Oppo-logo.png"
          subCategoryName="Oppo"
        />

        <SecondHeaderItem
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/9/91/Realme_logo.png"
          subCategoryName="Realme"
        />

        <SecondHeaderItem
          imageUrl="https://w7.pngwing.com/pngs/604/428/png-transparent-vivo-logo-vivo-logo-smartphone-branding-blue-angle-electronics.png"
          subCategoryName="Vivo"
        />

        <SecondHeaderItem
          imageUrl="https://logos-world.net/wp-content/uploads/2020/07/Asus-Logo.png"
          subCategoryName="Asus"
        />

        <div className="categoryBox">
          <Link to="http://localhost:3000/productall/Mobiles/">
            <div className="categoryImage">
              <img
                src="https://rukminim1.flixcart.com/fk-p-flap/128/128/image/50379f65f7b59622.png?q=100"
                alt="react logo"
              />
            </div>
          </Link>
          <Link to="http://localhost:3000/productall/Mobiles/">
            <p className="shopCategory">All Brands</p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default SecondHeader;
