import React, { useContext, useRef, useEffect, useState } from 'react'
import './invoice.css'
import { assets } from '../assets/assets'
import { StoreContext } from './Storecontext/Storecontext'
import { toWords } from "number-to-words";
import axios from 'axios'
import html2pdf from "html2pdf.js";
import { useLocation } from 'react-router-dom';

const Invoice = () => {

  const { gettotal, url } = useContext(StoreContext)

  const invoiceref = useRef()
  const [order, setorder] = useState(null)

  const download = () => {                       // for download button
    html2pdf().from(invoiceref.current).set({
      margin: 1,
      filename: 'invoice.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save();
  }

  const {state} = useLocation()
  const orderId = state?.orderId;

  const fetchorder = async () => {
    try {
      const response = await axios.post(url + "/api/order/getorderdetails", {orderId})
      setorder(response.data.data)
    } catch (error) {
      console.error("Error fetching order details:", error)
    }
  }

  useEffect(() => {
    fetchorder()
  }, [])

  return (
    <div className="invoice-container">
      <div className="invoice-wrapper" ref={invoiceref}>

        {/* Invoice Header */}
        <div className="invoice-header">
          <div className="invoice-logo-section">
            <img src={assets.logo} alt="Logo" className="invoice-logo" />
          </div>
          <div className="invoice-title-section">
            <h2 className="invoice-title-badge">INVOICE</h2>
            <p className="invoice-id">#{order?._id}</p>
          </div>
        </div>

        <div className="invoice-divider"></div>

        {/* Invoice Details */}
        <div className="invoice-details-section">
          <div className="invoice-billed-to">
            <h3 className="section-title">Billed To</h3>
            <div className="customer-info">
              <p className="info-row">
                <span className="label">Name:</span>
                <span className="value">{order?.address?.user || "N/A"}</span>
              </p>
              <p className="info-row">
                <span className="label">Email:</span>
                <span className="value">{order?.address?.email || "N/A"}</span>
              </p>
              <p className="info-row">
                <span className="label">Phone:</span>
                <span className="value">{order?.address?.phone || "N/A"}</span>
              </p>
              <p className="info-row address-row">
                <span className="label">Address:</span>
                <span className="value">
                  {[order?.address?.address, order?.address?.street, order?.address?.state, order?.address?.zipcode].filter(Boolean).join(", ") || "N/A"}
                </span>
              </p>
            </div>
          </div>

          <div className="invoice-meta">
            <h3 className="section-title">Invoice Details</h3>
            <div className="meta-info">
              <p className="info-row">
                <span className="label">Customer ID:</span>
                <span className="value">{order?.userId}</span>
              </p>
              <p className="info-row">
                <span className="label">Date:</span>
                <span className="value">{new Date(order?.date || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </p>
              <p className="info-row">
                <span className="label">Status:</span>
                <span className="value status-paid">Paid</span>
              </p>
            </div>
          </div>
        </div>

        {/* Totals Section */}
        <div className="invoice-totals-wrapper">
          <div className="invoice-totals-card">
            <h3 className="totals-title">Payment Summary</h3>
            <div className="totals-row">
              <span className="totals-label">Subtotal</span>
              <span className="totals-value">${order?.amount || gettotal()}</span>
            </div>
            <div className="totals-row">
              <span className="totals-label">Delivery Fee</span>
              <span className="totals-value">$4</span>
            </div>
            <div className="totals-divider"></div>
            <div className="totals-row grand-total">
              <span className="totals-label">Grand Total</span>
              <span className="grand-total-price">${(order?.amount || gettotal()) + 4}</span>
            </div>
          </div>
        </div>

        <div className="invoice-footer">
          <div className="amount-in-words">
            <span className="words-label">Amount in words:</span>
            <span className="words-value">{toWords((order?.amount || gettotal()) + 4).toUpperCase()} ONLY.</span>
          </div>
          <p className="thank-you-msg">Thank you for your order! Enjoy your delicious meal.</p>


        </div>

      </div>

      <button onClick={download} className="download-bttn" data-html2canvas-ignore="true">
        DOWNLOAD INVOICE
      </button>
    </div>
  )
}

export default Invoice