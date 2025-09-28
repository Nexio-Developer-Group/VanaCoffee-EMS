// components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDashboardStats, DashboardStats } from '@/services/ReportsService';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import Loading from '@/components/shared/Loading';

const periods = ['daily', 'weekly', 'monthly'] as const;

const AdminHome: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<typeof periods[number]>('daily');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await getDashboardStats({ period });
      if (res.status === 1 && res.data) setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, [period]);

 

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading loading />
      </div>
    );
  }

  return (
    <div>
      {/* Header & Period Selector */}
      <div className="flex items-center justify-between w-full mb-6">
        <h3 className="text-2xl font-semibold">Dashboard</h3>
        <Select value={period} onValueChange={(value) => setPeriod(value as typeof periods[number])}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            {periods.map((p) => (
              <SelectItem key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalBills}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{stats.totalAmount.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Discount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.avgDiscount}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Active Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-medium">{stats.mostActiveSegment}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recurring Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.recurringCustomers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.newCustomers}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
