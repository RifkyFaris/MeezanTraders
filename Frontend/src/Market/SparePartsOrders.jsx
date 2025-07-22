import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import { IoTrashBin } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom"
import { deleteOrder, adminOrders as adminOrdersAction } from "./actions/orderActions"
import { clearError, clearOrderDeleted } from "./slice/orderSlice"
import jsPDF from "jspdf"
const SparePartsOrders = () => {
    const { adminOrders = [], loading = true, error, isOrderDeleted }  = useSelector(state => state.orderState)

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

        adminOrders.forEach( order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount : `Rs. ${order.totalPrice}`,
                status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p> ,
                actions: (
                    <Fragment >
                        <div className="tablefrag">
                        <Link className='edit' to={`/admin/update/order/${order._id}`} ><FaPen size="1.3em"/> </Link>
                        <p className="deleteProduct" onClick={e => deleteHandler(e, order._id)} >
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
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if(error) {
            toast.error(error, {
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isOrderDeleted) {
            toast.success('Order Deleted Succesfully!',{
                
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;
        }

        dispatch(adminOrdersAction)
    },[dispatch, error, isOrderDeleted])
    const generatePDF = () => {
    const doc = new jsPDF();

    const marginLeft = 14;
    const colWidths = [50, 30, 40, 40]; // ID, Items, Amount, Status
    const rowHeight = 10;
    const pageHeight = doc.internal.pageSize.height;

    // Title
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("Admin Spare Parts Orders", marginLeft, 20);

    // Headers
    const headers = ["Order ID", "Items", "Amount", "Status"];
    let currentY = 30;

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");

    let x = marginLeft;
    headers.forEach((header, i) => {
        doc.text(header, x, currentY);
        x += colWidths[i];
    });

    // Header underline
    doc.setLineWidth(0.5);
    doc.line(marginLeft, currentY + 2, marginLeft + colWidths.reduce((a, b) => a + b, 0), currentY + 2);

    currentY += rowHeight;
    doc.setFont(undefined, "normal");

    adminOrders.forEach(order => {
        const row = [
            order._id.slice(0, 10) + "...",  // Trimmed ID
            String(order.orderItems.length),
            `Rs. ${order.totalPrice.toFixed(2)}`,
            order.orderStatus
        ];

        let x = marginLeft;
        row.forEach((cell, i) => {
            doc.text(cell, x, currentY);
            x += colWidths[i];
        });

        // Row underline
        doc.setDrawColor(200);
        doc.line(marginLeft, currentY + 2, marginLeft + colWidths.reduce((a, b) => a + b, 0), currentY + 2);

        currentY += rowHeight;

        // Page break
        if (currentY + rowHeight > pageHeight - 10) {
            doc.addPage();
            currentY = 20;
        }
    });

    doc.save("spare-parts-orders.pdf");
};

  return (
    <div className='container'>
        <div className="register">
            <button style={{color:"black",background:"white",width:"150px",marginLeft:"20px",padding:"10px",fontSize:"13px",borderRadius:"6px"}}  onClick={generatePDF}>Download pdf</button>

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

export default SparePartsOrders
