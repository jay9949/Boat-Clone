import React, { useRef } from 'react'
import { useStateContext } from '../../context/StateContext';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from "react-icons/ti"
import Link from 'next/link';
import { urlFor } from '../../lib/Client';

const Cart = ({ item, image }) => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext()
    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button type="button" onClick={() => setShowCart(false)} className='cart-heading'>
                    <AiOutlineLeft />
                    <span className='heading'>You Cart</span>
                    <span className='cart-num-items'>({totalQuantities} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='empty-cart'>
                        <AiOutlineShopping size={150} />
                        <h3>You Shopping Bag is Empty.</h3>
                        <Link href='/'>
                            <button type="button" onClick={() => setShowCart(false)} className='btn'>
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className='product-container'>
                    {cartItems.length >= 1 && cartItems.map((item) => {
                        console.log(cartItems, 'State')
                        return (
                            <div className='product' key={item._id}>
                                <img src={urlFor(item?.image[0])} className='cart-product-image' />
                                <div className='item-desc' key={item._id}>
                                    <div className='flex top'>
                                        <h5>{item.name}</h5>
                                        <h4>${item.price}</h4>
                                    </div>
                                    <div className=' flex bottom'>
                                        <div>
                                            <p className="quantity-desc">
                                                <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                                                    <AiOutlineMinus />
                                                </span>
                                                <span className="num" >
                                                    {item.quantity}
                                                </span>
                                                <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                                                    <AiOutlinePlus />
                                                </span>
                                            </p>
                                        </div>
                                        <button type="button" className='remove-item' onClick={() => onRemove(item)}>
                                            <TiDeleteOutline />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {cartItems.length >= 1 && (
                    <div className='cart-bottom'>
                        <div className='total'>
                            <h3>SubTotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className='btn-container'>
                            <button type="button" className='btn'>
                                Pay
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
