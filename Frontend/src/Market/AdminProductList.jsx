import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {deleteProduct,getAdminProducts} from './actions/productActions'
import {clearError} from './slice/productsSlice'
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import { clearProductDeleted } from './slice/productSlice'
import '../Profile/Login.css'
import { IoTrashBin } from "react-icons/io5";
import jsPDF from "jspdf"
import "jspdf-autotable"

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
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
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
                stock: product.stock,
                user:product.user,
                actions: (
                    <Fragment >
                        <div className="tablefrag">
                        
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

    products.forEach(product => {
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
    doc.save("admin-product-list.pdf");
};





  return (
    <div className='container1'>
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
