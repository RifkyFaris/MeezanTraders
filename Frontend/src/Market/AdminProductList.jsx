import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {deleteProduct,getAdminProducts} from './actions/productActions'
import {clearError} from './slice/productsSlice'
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import { clearProductDeleted } from './slice/productSlice'

import { IoTrashBin } from "react-icons/io5";

import { FaPen } from "react-icons/fa";

import {Link} from 'react-router-dom'

export default function AdminProductList() {
    const { products = [], loading = true, error }  = useSelector(state => state.productState)
    const { isProductDeleted, error:productError }  = useSelector(state => state.productState)
    const dispatch = useDispatch();
    
    const setProducts = () => {
        const data = {
            columns : [
                
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Discount',
                    field: 'discount',
                    sort: 'asc'
                },
                {
                    label: 'Cost',
                    field: 'cost',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Expiry Date',
                    field: 'expiry',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }
        products.forEach( product => {
            data.rows.push({
                
                name: product.name,
                price : `Rs. ${product.price}`,
                discount:`Rs. ${product.discount}`,
                cost:`Rs. ${product.cost}`,
                stock: product.stock,
                expiry:product.expiry,

                actions: (
                    <Fragment >
                        <div className="tablefrag">
                        <Link className='edit' to={`/supplier/product/${product._id}`} ><FaPen size="1.3em"/> </Link>
                        <p className="deleteProduct" onClick={e => deleteHandler(e, product._id)} >
                           <IoTrashBin size="1.3em"/>
                        </p>
                        </div>
                        
                    </Fragment>
                )
            })
        })

        return data;
    }
    
    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if(error || productError) {
            toast.error(error || productError, {
                
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isProductDeleted) {
            toast.success('Product Deleted Succesfully!',{
                
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        dispatch(getAdminProducts)
    },[dispatch, error, isProductDeleted])

    




  return (
    <div className='container'>
        <div className="register">
        
        <Fragment>
                {loading ? <></> : 
                    <MDBDataTable
                        data={setProducts()}
                        bordered
                        striped
                        hover
                        className='table'
                        
                        
                        
                    />
                }
            </Fragment>
        </div>
       
      
    </div>
  )
}
