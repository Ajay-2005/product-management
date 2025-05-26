import './WishlistDrawer.css';
const WishlistDrawer = ({ isOpen, onClose, wishlist, onRemove }) => {
    return (
        <div className={`drawer ${isOpen ? 'open' : ''}`}>
            <div className="drawer-header">
                <h2>Wishlist</h2>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="wishlist-items">
                {wishlist.length === 0 ? (
                    <p className="empty-text">Your wishlist is empty.</p>
                ) : (
                    wishlist.map((item, index) => (
                        <div key={index} className="wishlist-item">
                            <img
                                src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/100'}
                                alt={item.name}
                                className="wishlist-img"
                            />
                            <div className="details">
                                <p className="title">{item.name}</p>
                                <p className="price">₹{item.price}</p>
                            </div>
                            <button className="remove-btn" onClick={() => onRemove(item._id)}>×</button>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default WishlistDrawer;