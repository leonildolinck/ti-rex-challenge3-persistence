// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../redux/store";
// import { removeItem, clearCart } from "../store/cartSlice";

// interface CartModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed top-0 left-0 z-50 bg-black bg-opacity-50 h-full w-full font-poppins">
//       <div className="absolute right-0 top-0 bg-blue-50 w-[417px] h-[746px] jus">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-8"
//         >
//           <img src="https://desafio-3.s3.us-east-1.amazonaws.com/close.svg" alt="" />
//         </button>
//         <h2 className="text-2xl font-semibold mb-4 p-8">Shopping Cart</h2>
//         <hr className=" ml-8 mr-20 border-t border-[#D9D9D9]" />
//         {cartItems.length === 0 ? (
//           <p>O carrinho está vaziooo.</p>
//         ) : (
//           <ul className="space-y-2">
//             {cartItems.map((item) => (
//               <li key={item.id} className="flex justify-between items-center">
//                 <span>
//                   {item.name} (x{item.quantity})
//                 </span>
//                 <button
//                   onClick={() => dispatch(removeItem(item.id))}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Remover
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//         {cartItems.length > 0 && (
//           <div className="mt-4">
//             <button
//               onClick={() => dispatch(clearCart())}
//               className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
//             >
//               Limpar Carrinho
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartModal;
