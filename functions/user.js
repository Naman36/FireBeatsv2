import axios from "axios";

export const getWishList = async (user) => {
  console.log(user);
  return await axios.get(
    `https://fda1-103-175-8-42.ngrok-free.app/api/wishlist/${user.email}`
  );
};

export const removeFromWishlist = async (productId) => {
  return await axios.put(
    `https://fda1-103-175-8-42.ngrok-free.app/api/wishlist/${productId}`
  );
};

export const addToWishlist = async (user, productId) => {
  return await axios.post(
    `https://fda1-103-175-8-42.ngrok-free.app/api/wishlist`,
    { productId: productId, user: user }
  );
};
