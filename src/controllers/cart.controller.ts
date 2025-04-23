import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Cart, { ICart } from '../models/cart.model';
import Product from '../models/product.model';
import { NotFoundError, BadRequestError } from '../utils/errorHandler';
import { Document, Types } from 'mongoose';
import { IUser } from '../models/user.model';

type AuthUser = Document<unknown, {}, IUser> & 
  IUser & 
  Required<{ _id: unknown }> & 
  { __v: number };

interface AuthRequest extends Omit<Request, 'user'> {
  user?: AuthUser;
}

// Get user's cart
export const getCart = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new BadRequestError('User not authenticated');
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart) {
    return res.status(200).json({ items: [], totalPrice: 0 });
  }
  res.status(200).json(cart);
};

// Add item to cart
export const addToCart = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new BadRequestError('User not authenticated');
  }

  const { productId, quantity } = req.body;

  // Find the product
  const product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError('Product not found');
  }

  if (product.stock < quantity) {
    throw new BadRequestError('Insufficient stock');
  }

  // Find or create user's cart
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: []
    });
  }

  // Check if product already exists in cart
  const existingItemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Update quantity if product exists
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item if product doesn't exist
    cart.items.push({
      product: new mongoose.Types.ObjectId(productId),
      quantity,
      price: product.price
    });
  }

  await cart.save();
  await cart.populate('items.product');

  res.status(200).json(cart);
};

// Update cart item quantity
export const updateCartItem = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new BadRequestError('User not authenticated');
  }

  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    throw new BadRequestError('Quantity must be at least 1');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError('Product not found');
  }

  if (product.stock < quantity) {
    throw new BadRequestError('Insufficient stock');
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    throw new NotFoundError('Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    throw new NotFoundError('Item not found in cart');
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();
  await cart.populate('items.product');

  res.status(200).json(cart);
};

// Remove item from cart
export const removeFromCart = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new BadRequestError('User not authenticated');
  }

  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    throw new NotFoundError('Cart not found');
  }

  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  await cart.save();
  await cart.populate('items.product');

  res.status(200).json(cart);
};

// Clear cart
export const clearCart = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new BadRequestError('User not authenticated');
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    throw new NotFoundError('Cart not found');
  }

  cart.items = [];
  await cart.save();

  res.status(200).json(cart);
}; 