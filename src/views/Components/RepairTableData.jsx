import React from "react";

export default function RepairTableData({order}){
    return (
        <div className="bg-[transparent] p-1 text-[#13a388]">
            <h1  className='font-bold pb-2'>
                <p>OrderID</p> <p className="text-[#ededed] font-normal">{order._id}</p> 
            </h1>

            <table className="table table-auto w-full">
                <thead className="border-b-2 border-[#13a388]">
                    <tr className="text-left">
                        <th className = "pt-1 pb-2">Device Name</th>
                        <th className = "pt-1 pb-2">Diagnosis</th>
                        <th className = "pt-1 pb-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                        <tr className="border-b border-[#13a388]">
                            <td className = "text-[#edededdd] py-2">{order.name}</td>
                            <td className = "text-[#edededdd] py-2">{order.diagnosis ? order.diagnosis : 'N/A'}</td>
                            <td className = "text-[#edededdd] py-2">{order.status}</td>
                        </tr>
                </tbody>

                <tr>
                    <td className="font-bold"><br />Total</td>
                    <td className="text-[#edededdd]"><br />{order.price ? order.price?.toLocaleString() : 'N/A'}</td>
                </tr>
            </table>
        </div>
      )   
}