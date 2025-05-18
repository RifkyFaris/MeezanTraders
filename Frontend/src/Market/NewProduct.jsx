import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearProductCreated } from './slice/productSlice.jsx'
import { createNewProduct } from './actions/productActions.jsx'
import { clearError } from './slice/productsSlice.jsx'
import '../Profile/Login.css'
import { toast } from 'react-toastify'

const NewProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");

    const { isProductCreated, error } = useSelector(state => state.productState);
    const { user } = useSelector(state => state.authState);

    const categories = [
        'Tyre',
        'Head Light',
        'Engine Oil',
        'Break Oil',
        'Radiator Coolant',
        'Break Pads',
        'Wiper Blades',
        'Fan Belt',
        'Clutch Plate',
        'Rim',
        'Indicator Light',
        'Break Light',
        'Gear Oil',
        'Horn'
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        // Prepare data as a plain object (JSON)
        const productData = {
            name,
            price,
            category,
            stock,
            description,
            user: user?._id
        };

        dispatch(createNewProduct(productData));
    }

    useEffect(() => {
        if (isProductCreated) {
            toast.success('Product Created Successfully!', {
                onOpen: () => dispatch(clearProductCreated())
            });
            navigate('/supplier/dashboard');
            return;
        }
        if (error) {
            toast.error(error, {
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
    }, [isProductCreated, error, dispatch, navigate]);

    return (
        <div className='container1'>
            <div className="register">
                <p className="login-title">New Product</p>
                <div className="form-div">
                    <form onSubmit={submitHandler}>
                        <label className="label" htmlFor="name">Name</label><br />
                        <input
                            type="text"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            id='name'
                            required
                            placeholder="Name"
                        /><br /><br />

                        <label className="label" htmlFor="price">Price</label><br />
                        <input
                            type="number"
                            id='price'
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                            required
                            placeholder="Price"
                        /><br /><br />

                        <label className="label" htmlFor="stock">Stock</label><br />
                        <input
                            type="number"
                            id="stock"
                            onChange={e => setStock(e.target.value)}
                            value={stock}
                            required
                            placeholder="Stock"
                        /><br /><br />

                        <label className="label" htmlFor="description">Description</label><br />
                        <input
                            type="text"
                            id="description"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            required
                            placeholder="Description"
                        /><br /><br />

                        <label className="label" htmlFor="category">Select category</label><br />
                        <select
                            onChange={e => setCategory(e.target.value)}
                            className="category-select"
                            name="select"
                            id="category"
                            required
                        >
                            <option value="">Select</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <br /><br />

                        <input
                            type="submit"
                            className="submit"
                            value="Create Product"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewProduct;
