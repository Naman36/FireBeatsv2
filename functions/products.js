import axios from "axios";

export const getProductsByCount = async (count) => {
  return await axios.get(
    `https://fda1-103-175-8-42.ngrok-free.app/api/products/${count}`
  );
};

// export const getProductsByCount = async (count) => {
//   //GET request
//   try {
//     const response = await fetch(`http://192.168.0.121:8000/api/products/2`, {
//       method: "GET",
//       //Request Type
//     });
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };
