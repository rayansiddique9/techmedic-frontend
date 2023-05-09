import React from "react";

export default function OrderPageTableData({order}){
    return (
        <div className="bg-[transparent] p-1 text-[#13a388]">
            <h1  className='font-bold pb-2'>
                <p>OrderID</p> <p className="text-[#ededed] font-normal">{order._id}</p> 
            </h1>

            <table className="table table-auto w-full">
                <thead className="border-b-2 border-[#13a388]">
                    <tr className="text-left">
                        <th className = "pt-1 pb-2">Product</th>
                        <th className = "pt-1 pb-2">Quantity</th>
                        <th className = "pt-1 pb-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.Product.map(r => <tr className="border-b border-[#13a388]">
                            <td className = "text-[#edededdd] py-2">{r.name}</td>
                            <td className = "text-[#edededdd] py-2">{order.Quantity[order.Product.indexOf(r)]}</td>
                            <td className = "text-[#edededdd] py-2">{r.price.toLocaleString()}</td>
                        </tr> )}
                </tbody>

                <tr>
                    <td className="font-bold"><br />Total</td>
                    <td className="text-[#edededdd]"><br />{order.Bill.toLocaleString()}</td>
                </tr>
            </table>
        </div>
      )   
}