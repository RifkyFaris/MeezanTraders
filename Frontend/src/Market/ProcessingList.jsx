import { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { MDBDataTable} from 'mdbreact';
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom"
import jsPDF from "jspdf"
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

    
    const generatePDF = () => {
    const doc = new jsPDF();

    const marginLeft = 14;
    const colWidths = [50, 30, 40, 40]; // ID, Items, Amount, Status
    const rowHeight = 10;
    const pageHeight = doc.internal.pageSize.height;

    // Title
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("Processing orders", marginLeft, 20);

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

    process.forEach(order => {
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

export default ProcessingList
