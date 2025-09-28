import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Receipt } from 'lucide-react';
import KOTBill from '../components/KOTBill';

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
  status: string;
  createdAt: string;
}

const BRAND = {
  name: "Vans Café",
  logo: "https://vanscafe.shop/img/logo/logo-light-full.png",
  description: "Fresh coffee, artisanal drinks, and snacks",
  address: "Near Gulab Bagh, Udaipur, Rajasthan, 313001",
  phone: "+91 8875640905",
  website: "https://vanscafe.shop/",
};

const BillPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const billData = location.state?.billData as BillData;

  if (!billData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Card className="p-8 text-center">
          <CardContent>
            <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">No Bill Data Found</h2>
            <p className="text-muted-foreground mb-4">The bill data is not available.</p>
            <Button onClick={() => navigate('/create-bill')}>Create New Bill</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex justify-between flex-col sm:flex-row gap-2 mb-4">
        <Button variant="solid" size="sm" onClick={() => navigate('/bill-book/new')}>
          Back to Create Bill
        </Button>

        <KOTBill billData={billData} />
      </div>

      {/* Invoice Preview */}
      <Card className="overflow-hidden">
        <div className="bg-white p-8 md:p-12 text-black">
          {/* Brand Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold">{BRAND.name}</h1>
            <div className="w-36 h-1 bg-black mt-3 mb-3"></div>
            <p className="text-sm text-gray-600">{BRAND.description}</p>
            <p className="text-xs mt-1">{BRAND.address}</p>
            <p className="text-xs mt-1">Tel: {BRAND.phone}</p>
          </div>

          {/* Bill + Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-3">Bill Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Bill ID:</span>
                  <span>{billData.billId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{formatDate(billData.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant="default">{billData.status.toUpperCase()}</Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Payment Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span>{billData.paymentMethod.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer ID:</span>
                  <span>{billData.user.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mobile:</span>
                  <span>{billData.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Items</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-1">Item</th>
                  <th className="text-right py-1">Price</th>
                  <th className="text-right py-1">Qty</th>
                  <th className="text-right py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {billData.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td className="text-right">₹{item.price.toFixed(2)}</td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">₹{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{billData.subTotal.toFixed(2)}</span>
            </div>
            {billData.discount > 0 && (
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>-₹{billData.discount.toFixed(2)}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{billData.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p>Thank you for your visit!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BillPreview;
