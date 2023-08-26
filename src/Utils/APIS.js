// const websiteUrl = "https://ajaypratapsingh.pythonanywhere.com/"
const websiteUrl = "http://localhost:8000/";
const userApi = "userApi";
const vendorApi = "vendorApi";

export const backendApis = {
  userApi: {
    add_addressByUserId: websiteUrl + userApi + "/" + "add-address/",
    addIn_cart: websiteUrl + userApi + "/" + "addIn-cart",
    delete_cartItemByUserIdAndCartId:
      websiteUrl + userApi + "/" + "delete-cartItem/",
    demo: websiteUrl + userApi + "/" + "demo",
    fetch_cart_byUserIdByUserId:
      websiteUrl + userApi + "/" + "fetch-cart-byUserId/",
    placeOrder: websiteUrl + userApi + "/" + "placeOrder/",
    signup: websiteUrl + userApi + "/" + "signup",
    update_cartqty_byproductidByCartIdAndQtyMessage:
      websiteUrl + userApi + "/" + "update-cartqty-byproductid/",
    userLogin: websiteUrl + userApi + "/" + "userLogin/",
    wishlist: websiteUrl + userApi + "/" + "addToWishlist/",
  },

  vendorApi: {
    add_shipping: websiteUrl + vendorApi + "/" + "add-shipping",
    add_sub_category: websiteUrl + vendorApi + "/" + "add-sub-category",
    add_tax: websiteUrl + vendorApi + "/" + "add-tax",
    addcategory: websiteUrl + vendorApi + "/" + "addcategory",
    addproduct: websiteUrl + vendorApi + "/" + "addproduct",
    delete_product_byIdByVendorIdAndProductId:
      websiteUrl + vendorApi + "/" + "delete-product-byId/",
    duplicate_product_byIdByVendorIdAndProductId:
      websiteUrl + vendorApi + "/" + "duplicate-product-byId/",
    filter_productdetail_bySlugByFilterSlug:
      websiteUrl + vendorApi + "/" + "filter-productdetail-bySlug/",
    get_subcat_bycategory:
      websiteUrl + vendorApi + "/" + "get-subcat-bycategory/",
    hello: websiteUrl + vendorApi + "/" + "hello",
    permanent_delete_product_byIdByVendorIdAndProductId:
      websiteUrl + vendorApi + "/" + "permanent-delete-product-byId/",
    set_featuredProduct_byIdByProductIdAndFeaturedStatus:
      websiteUrl + vendorApi + "/" + "set-featuredProduct-byId/",
    signup: websiteUrl + vendorApi + "/" + "signup",
    update_productdetail_byId:
      websiteUrl + vendorApi + "/" + "update-productdetail-byId/",
    vendorLogin: websiteUrl + vendorApi + "/" + "vendorLogin",
    getPlacedOrders: websiteUrl + vendorApi + "/" + "getPlacedOrders/",
    getAllVendorCountings:
      websiteUrl + vendorApi + "/" + "getAllVendorCountings/",
  },
};
