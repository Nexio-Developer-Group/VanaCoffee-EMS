// BillsPage.tsx
import { useEffect, useState } from 'react';
import { Bill, getAllBills, updateBillStatus, deleteBill } from '@/services/BillService';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BillsPage = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPhone, setSearchPhone] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'cancelled'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchBills = async () => {
    setLoading(true);
    try {
      const params: any = { page }; // eslint-disable-line
      if (statusFilter !== 'all') params.status = statusFilter;
      if (searchPhone) params.phone = searchPhone;

      const res = await getAllBills(params);
      setBills(res.data);
      setTotalPages(res.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
    // eslint-disable-next-line
  }, [page, statusFilter]);

  const handleStatusChange = async (billId: string, status: 'pending' | 'paid' | 'cancelled') => {
    try {
      await updateBillStatus(billId, status);
      setBills((prev) =>
        prev.map((b) => (b._id === billId ? { ...b, status } : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (billId: string) => {
    if (!confirm('Are you sure you want to delete this bill?')) return;
    try {
      await deleteBill(billId);
      setBills((prev) => prev.filter((b) => b._id !== billId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchBills();
  };

  const calculateTotals = (bill: Bill) => {
    const subTotal = bill.items.reduce((sum, item: any) => sum + item.price * item.quantity, 0); // eslint-disable-line
    const grandTotal = subTotal - (bill.discount || 0);
    const itemsWithTotal = bill.items.map((item: any) => ({ // eslint-disable-line
      ...item,
      total: item.price * item.quantity,
    }));
    return { subTotal, grandTotal, itemsWithTotal };
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bills</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4 items-center">
        <Input
          placeholder="Search by phone"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}> 
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Bills Table */}
      <table className="min-w-full border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Bill ID</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Total Amount</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Payment Mode</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center p-4">Loading...</td>
            </tr>
          ) : bills.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">No bills found.</td>
            </tr>
          ) : (
            bills.map((bill) => {
              const { subTotal, grandTotal, itemsWithTotal } = calculateTotals(bill);
              const billPreviewData = {
                billId: bill.billId,
                user: bill._id,
                phone: bill.phone,
                items: itemsWithTotal,
                subTotal,
                discount: bill.discount,
                grandTotal,
                paymentMethod: bill.paymentMethod,
                status: bill.status,
                createdAt: bill.createdAt,
              };

              return (
                <tr key={bill._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{bill.billId}</td>
                  <td className="p-2 border">{bill.phone}</td>
                  <td className="p-2 border">₹{grandTotal.toFixed(2)}</td>
                  <td className="p-2 border">
                    {/* ShadCN Select for Status */}
                    <Select
                      value={bill.status}
                        //   eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onValueChange={(value) => handleStatusChange(bill._id, value as any)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-2 border">{bill.paymentMethod}</td>
                  <td className="p-2 border flex justify-center gap-2">
                    {/* <Button size="xs" onClick={() => navigate(`/bills/edit/${bill._id}`)}>
                      <Edit size={16} />
                    </Button> */}
                    <Button
                      size="xs"
                      onClick={() => navigate(`/bill-preview`, { state: { billData: billPreviewData } })}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button size="xs" variant="solid" className='bg-red-500 hover:bg-red-600 text-white' onClick={() => handleDelete(bill._id)}>
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
        <span className="flex items-center px-2">{page} / {totalPages}</span>
        <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default BillsPage;
