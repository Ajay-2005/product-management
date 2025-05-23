import { BSON } from 'mongodb';

const { ObjectId } = BSON;

import { getCategory } from '../models/index.js';

export async function createCategory(req, res) {
  try {
    const { name, parentCategoryName } = req.body;
    const categories = getCategory();

    let parentId = null;

    if (parentCategoryName) {
      const parentCategory = await categories.findOne({ name: parentCategoryName });
      if (!parentCategory) {
        return res.status(404).json({ success: false, message: 'Parent category not found' });
      }
      parentId = parentCategory._id;
    }

    const result = await categories.insertOne({
      name,
      parentCategory: parentId,
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, categoryId: result.insertedId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}


export async function listCategories(req, res) {
  try {
    const cateogory=getCategory()

    const categories = await cateogory.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'parentCategory',
          foreignField: '_id',
          as: 'parentCategoryInfo'
        }
      },
      {
        $unwind: {
          path: '$parentCategoryInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          name: 1,
          parentCategory: '$parentCategoryInfo.name'
        }
      }
    ]).toArray();

    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
