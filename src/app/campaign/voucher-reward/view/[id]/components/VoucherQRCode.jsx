"use client"

import { useState, useRef } from "react";
// other previous imports
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";


export default function VoucherQRCode({ qrCodeData }) {
    const [url, setUrl] = useState(qrCodeData);
    const [qrIsVisible, setQrIsVisible] = useState(false);
    const qrCodeRef = useRef(null);
   /*  const handleQrCodeGenerator = () => {
      if (!url) {
        return;
      }
      setQrIsVisible(true);
    }; */

    


    const downloadQRCode = () => {
        htmlToImage
          .toPng(qrCodeRef.current)
          .then(function (dataUrl) {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = qrCodeData + '.png';
            link.click();
          })
          .catch(function (error) {
            console.error("Error generating QR code:", error);
          });
      };
    return (
      <div className="qrcode__container">
        <div className="qrcode__container--parent">
            <div className="qrcode__download w-[100%]">
              <div className="w-[70%] p-[2.5rem] bg-white" ref={qrCodeRef}>
                <QRCode value={url} size={400} />
              </div>
              <button className="mx-[2.5rem] bg-slate-700 hover:bg-slate-800 drop-shadow-lg px-[1.2rem] py-[0.8rem] text-white rounded-xl" onClick={downloadQRCode}>
                Download QR Code
              </button>
            </div>
          
        </div>
      </div>
    );
}