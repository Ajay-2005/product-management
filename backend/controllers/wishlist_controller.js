import { ObjectId } from 'mongodb';
import { getProduct, getUserCollection } from '../models/index.js';

export async function addToWishlist(req, res) {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        if (!ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID.' });
        }

        const users = getUserCollection();
        const userObjectId = ObjectId.createFromHexString(userId);
        const productObjectId = ObjectId.createFromHexString(productId);

        const result = await users.updateOne(
            { _id: userObjectId },
            { $addToSet: { wishlist: productObjectId } }
        );


        if (result.modifiedCount === 0) {
            return res.status(400).json({ success: false, message: 'Product already in wishlist.' });
        }

        res.status(200).json({ success: true, message: 'Added to wishlist.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}


export async function removeFromWishlist(req, res) {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        if (!ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID.' });
        }


        const users = getUserCollection();
        const userObjectId = ObjectId.createFromHexString(userId);
        const productObjectId = ObjectId.createFromHexString(productId);
        await users.updateOne(
            { _id: userObjectId },
            { $pull: { wishlist: productObjectId } }
        );

        res.status(200).json({ success: true, message: 'Removed from wishlist.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}


export async function getWishList(req, res) {
    try {
        const userId = req.user._id;

        const users = getUserCollection();
        const products = getProduct();
        const userObjectId = ObjectId.createFromHexString(userId);
        const user = await users.findOne({ _id: userObjectId }, { projection: { wishlist: 1 } });

        if (!user || !user.wishlist || user.wishlist.length === 0) {
            return res.status(200).json({ success: true, wishlist: [] });
        }

        const wishlistProducts = await products.find({ _id: { $in: user.wishlist } }).toArray();

        res.status(200).json({ success: true, wishlist: wishlistProducts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
