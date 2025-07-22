import { Fragment, useEffect } from 'react'
import { useSelector } from "react-redux"
import { MDBDataTable} from 'mdbreact';
import jsPDF from "jspdf"
import { FaPen } from "react-icons/fa";
import "jspdf-autotable"
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
    

   

    const generatePDF = () => {
    const doc = new jsPDF();

    const marginLeft = 14;
    const colWidths = [50, 30, 30, 50]; // Column widths: adjust as needed
    const rowHeight = 10;
    const pageHeight = doc.internal.pageSize.height;

    // Title
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("Admin Product List", marginLeft, 20);

    // Header
    const headers = ["Name", "Price", "Stock", "User"];
    let currentY = 30;

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");

    let x = marginLeft;
    headers.forEach((header, i) => {
        doc.text(header, x, currentY);
        x += colWidths[i];
    });

    // Horizontal line below header
    doc.setLineWidth(0.5);
    doc.line(marginLeft, currentY + 2, marginLeft + colWidths.reduce((a, b) => a + b, 0), currentY + 2);

    currentY += rowHeight;

    // Table body
    doc.setFont(undefined, "normal");

    expiry.forEach(product => {
        const row = [
            product.name || "N/A",
            `Rs. ${product.price}`,
            String(product.stock),
            product.user || "N/A"
        ];

        let x = marginLeft;
        row.forEach((cell, i) => {
            doc.text(cell, x, currentY);
            x += colWidths[i];
        });

        currentY += rowHeight;

        // Line after each row
        doc.setDrawColor(200); // Light grey
        doc.line(marginLeft, currentY - 5, marginLeft + colWidths.reduce((a, b) => a + b, 0), currentY - 5);

        // Add new page if necessary
        if (currentY + rowHeight > pageHeight - 10) {
            doc.addPage();
            currentY = 20;
        }
    });

    // Save the PDF
    doc.save("admin-expiry-list.pdf");
};





  return (
    <div className='container'>
        <div className="register">
        <button style={{color:"black",background:"white",width:"150px",marginLeft:"20px",padding:"10px",fontSize:"13px",borderRadius:"6px"}}  onClick={generatePDF}>Download pdf</button>

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
