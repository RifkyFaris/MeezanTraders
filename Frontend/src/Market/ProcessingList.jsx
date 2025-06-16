import { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { MDBDataTable} from 'mdbreact';
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom"

const ProcessingList = () => {
    const { process = [], loading = true, error, isOrderDeleted }  = useSelector(state => state.orderState)

    const dispatch = useDispatch();

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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

        process.forEach( order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount : `Rs. ${order.totalPrice}`,
                status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p> ,
                actions: (
                    <Fragment >
                        <div className="tablefrag">
                        <Link className='edit' to={`/admin/update/order/${order._id}`} ><FaPen size="1.3em"/> </Link>
                        
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
                        data={setOrders()}
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

export default ProcessingList
