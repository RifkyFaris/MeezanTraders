import { Fragment, useEffect } from 'react'
import { useSelector } from "react-redux"
import { MDBDataTable} from 'mdbreact';

import { FaPen } from "react-icons/fa";

import {Link} from 'react-router-dom'

export default function ExpiredList() {
    const { expiry = [], loading = true, error }  = useSelector(state => state.productState)
    
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
        expiry.forEach( product => {
            data.rows.push({
                
                name: product.name,
                price : `Rs. ${product.price}`,
                discount:`Rs. ${product.discount}`,
                stock: product.stock,
                expiry:product.expiry,

                actions: (
                    <Fragment >
                        <div className="tablefrag">
                        <Link className='edit' to={`/supplier/product/${product._id}`} ><FaPen size="1.3em"/> </Link>
                        
                        </div>
                        
                    </Fragment>
                )
            })
        })

        return data;
    }
    

   






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
