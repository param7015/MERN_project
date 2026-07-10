import React, { useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url, isAuthenticated }) => {


    const [image, setimage] = useState(false)

    const [data, setdata] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"   // this is just to set the category as default 
    })

    const onHandleChange = (event) => {
        setdata({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formdata = new FormData();
        formdata.append('name', data.name);
        formdata.append('description', data.description);
        formdata.append('price', Number(data.price));
        formdata.append('category', data.category);
        formdata.append('image', image);

        const response = await axios.post(`${url}/api/food/add`, formdata);
        if (response.data.success) {
            setdata({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setimage(false)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.error)
        }

    }

    return (
        <>
            {isAuthenticated ? (

                <div className='add' >
                    <form className="flex-col" onSubmit={onSubmitHandler}>
                        <div className="add-image-upload flex-col">
                            <p>Upload Image</p>
                            <label htmlFor="image">
                                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" srcset="" />
                            </label>
                            <input onChange={(e) => { setimage(e.target.files[0]) }} type="file" id="image" hidden required />
                        </div>

                        <div className="add-product-name flex-col">
                            <p>Product name</p>
                            <input onChange={onHandleChange} type="text" name="name" value={data.name} placeholder='Type here' />
                        </div>

                        <div className="add-product-description flex-col">
                            <p>Product description</p>
                            <textarea onChange={onHandleChange} type="text" name="description" value={data.description} rows="6" placeholder='Write something about the product'></textarea>
                        </div>

                        <div className="add-category-price">
                            <div className="add-category flex-col">
                                <p>Product category</p>
                                <select onChange={onHandleChange} name="category">
                                    <option value="Salad">Salad</option>
                                    <option value="Rolls">Rolls</option>
                                    <option value="Deserts">Deserts</option>
                                    <option value="Sandwich">Sandwich</option>
                                    <option value="Cake">Cake</option>
                                    <option value="Pure veg">Pure veg</option>
                                    <option value="Pasta">Pasta</option>
                                    <option value="Noodles">Noodles</option>
                                </select>
                            </div>
                            <div className="add-price flex-col">
                                <p>Product price</p>
                                <input onChange={onHandleChange} type="number" name="price" value={data.price} placeholder='$20' />
                            </div>
                        </div>
                        <button type="submit" className='add-btn'>ADD</button>
                    </form>

                </div>
            ) : (
                <>
                    <p className='not-sign-in'>Please Login To Add Items !</p>
                </>
            )}
        </>
    )
}

export default Add