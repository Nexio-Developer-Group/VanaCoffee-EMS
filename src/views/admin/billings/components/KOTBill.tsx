// KOTBill.tsx
import { Button } from '@/components/ui/Button';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

interface BillItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface BillData {
  billId: string;
  user: string;
  phone: string;
  items: BillItem[];
  subTotal: number;
  discount: number;
  grandTotal: number;
  paymentMethod: string;
  createdAt: string;
}

interface KOTBillProps {
  billData: BillData;
}

const BRAND = {
  name: "Vans Café",
  logo: "https://vanscafe.shop/img/logo/logo-light-full.png",
  description: "Fresh coffee, artisanal drinks, and snacks",
  address: "Near Gulab Bagh, Udaipur, Rajasthan, 313001",
  phone: "+91 8875640905",
  website: "https://vanscafe.shop/",
};

const KOTBill = ({ billData }: KOTBillProps) => {
  const generatePDF = async (): Promise<string> => {
    // Create temporary div for canvas
    const tempDiv = document.createElement('div');
    Object.assign(tempDiv.style, {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
      width: '80mm', // Thermal receipt width
      fontFamily: 'monospace',
      fontSize: '10px',
      lineHeight: '1.4',
      backgroundColor: '#fff',
      color: '#000',
      padding: '8px',
      boxSizing: 'border-box',
    });

    // Build items HTML
    const itemsHtml = billData.items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td style="text-align:right;">${item.quantity}</td>
        <td style="text-align:right;">₹${item.total.toFixed(2)}</td>
      </tr>
    `).join('');

    tempDiv.innerHTML = `
      <div style="text-align:center;">
        <h1 style="margin:0; font-size:32px;">${BRAND.name}</h1>
        <p style="margin:0; font-size:8px;">${BRAND.description}</p>
        <p style="margin:2px 0; font-size:8px;">${BRAND.address}</p>
        <p style="margin:2px 0; font-size:8px;">Tel: ${BRAND.phone}</p>
        <p style="margin:2px 0 4px 0; font-size:8px;">${BRAND.website}</p>
      </div>
      <hr/>
      <div style="font-size:10px; margin-top:8px; margin-bottom:8px;">
        <p>Bill ID: ${billData.billId}</p>
        <p>Date: ${new Date(billData.createdAt).toLocaleString()}</p>
        <p>Payment: ${billData.paymentMethod.toUpperCase()}</p>
        <p>Customer Id: ${billData.user}</p>
        <p>Mobile: ${billData.phone}</p> 
      </div>
      <hr/>
      <table style="width:100%; font-size:10px; border-collapse:collapse;">
        <thead>
          <tr style="border-bottom:1px solid #000;">
            <th style="text-align:left;">Item</th>
            <th style="text-align:right;">Qty</th>
            <th style="text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <hr/>
      <div style="display:flex; justify-content:space-between;">
        <span>Subtotal:</span>
        <span>₹${billData.subTotal.toFixed(2)}</span>
      </div>
      ${billData.discount > 0 ? `<div style="display:flex; justify-content:space-between;">
        <span>Discount:</span>
        <span>-₹${billData.discount.toFixed(2)}</span>
      </div>` : ''}
      <div style="display:flex; justify-content:space-between; font-weight:bold;">
        <span>Total:</span>
        <span>₹${billData.grandTotal.toFixed(2)}</span>
      </div>
      <hr/>
      <p style="text-align:center; font-size:9px; margin-top:4px;">Thank you for your visit!</p>
    `;

    document.body.appendChild(tempDiv);

    // Calculate canvas height automatically based on content
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      backgroundColor: '#fff',
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');

    // Create PDF with dynamic height
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [80, (canvas.height * 80) / canvas.width], // width 80mm, height auto
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 80, (canvas.height * 80) / canvas.width);

    const filename = `kot-${billData.billId}.pdf`;
    pdf.save(filename);

    document.body.removeChild(tempDiv);
    return filename;
  };

  const shareWhatsApp = async () => {
    await generatePDF();

    const phoneNumber = billData.phone.replace(/\D/g, "");

    const message = `
Hello from ${BRAND.name}!

Here are your bill details:
• Bill ID: ${billData.billId}
• Total Amount: ₹${billData.grandTotal.toFixed(2)}

Thank you for visiting us at ${BRAND.address}.
We look forward to serving you again!

— ${BRAND.name}
Tel: ${BRAND.phone}
Website: ${BRAND.website}
`;

    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };


  return (
    <div className="flex justify-end gap-2">
      <Button size='sm' onClick={generatePDF}>Download PDF</Button>
      <Button size='sm' className="bg-green-600 text-white hover:border-white hover:text-white  hover:bg-green-600" onClick={shareWhatsApp}>
        Share on WhatsApp
      </Button>
    </div>
  );
};

export default KOTBill;
