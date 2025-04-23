import express from 'express';
import { Request, Response } from 'express';
import Store from '../models/Store';

const router = express.Router();

// Get all stores
router.get('/', async (req: Request, res: Response) => {
  try {
    const { city } = req.query;
    const query = city ? { 'address.city': city } : {};
    
    const stores = await Store.find(query).sort({ isMainBranch: -1 });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stores', error });
  }
});

// Get store by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching store', error });
  }
});

// Create new store
router.post('/', async (req: Request, res: Response) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).json(store);
  } catch (error) {
    res.status(400).json({ message: 'Error creating store', error });
  }
});

// Update store
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const store = await Store.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json(store);
  } catch (error) {
    res.status(400).json({ message: 'Error updating store', error });
  }
});

// Delete store
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting store', error });
  }
});

// Get stores by city
router.get('/city/:city', async (req: Request, res: Response) => {
  try {
    const stores = await Store.find({
      'address.city': req.params.city
    }).sort({ isMainBranch: -1 });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stores', error });
  }
});

// Get stores by service
router.get('/service/:service', async (req: Request, res: Response) => {
  try {
    const stores = await Store.find({
      services: req.params.service
    }).sort({ isMainBranch: -1 });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stores', error });
  }
});

// Get main branch
router.get('/main/branch', async (req: Request, res: Response) => {
  try {
    const mainBranch = await Store.findOne({ isMainBranch: true });
    if (!mainBranch) {
      return res.status(404).json({ message: 'Main branch not found' });
    }
    res.json(mainBranch);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching main branch', error });
  }
});

export default router; 