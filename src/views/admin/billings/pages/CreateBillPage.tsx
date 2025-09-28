import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Phone, CreditCard, Smartphone, Banknote, MoreHorizontal, Percent, DollarSign } from 'lucide-react';
import { getAllCategories, Category } from '@/services/CategoryService';
import { createBill, searchUsersByPhone, CreateBillPayload } from '@/services/BillService';
import { getAllItems, Item } from '@/services/ItemService';

/* -------------------------
   Helpers for safe money math
------------------------- */
const toPaise = (amount: number) => Math.round(amount * 100);
const fromPaise = (paise: number) => paise / 100;
const safeAddPaise = (a: number, b: number) => a + b;
const safeMulPaise = (unitPaise: number, qty: number) => Math.round(unitPaise * qty);
const safeMinPaise = (a: number, b: number) => (a < b ? a : b);

/* -------------------------
   Form schema
------------------------- */
const billSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  discount: z.number().min(0).optional(),
  discountType: z.enum(['percentage', 'amount']).optional(),
  paymentMethod: z.enum(['cash', 'card', 'upi', 'other']),
  items: z.array(
    z.object({
      category: z.string().min(1, 'Please select a category'),
      item: z.string().min(1, 'Please select an item'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
    })
  ).min(1, 'At least one item is required'),
});

type BillForm = z.infer<typeof billSchema>;

const CreateBillPage: React.FC = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [rowItemsList, setRowItemsList] = useState<Record<number, Item[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const [phoneQuery, setPhoneQuery] = useState('');
  const [userSuggestions, setUserSuggestions] = useState<{ _id: string; phone: string }[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const suggestionIndexRef = useRef<number>(-1);
  const searchDebounceRef = useRef<number | null>(null);
  const lastSearchToken = useRef(0);

  const { control, register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<BillForm>({
    resolver: zodResolver(billSchema),
    defaultValues: { items: [{ category: '', item: '', quantity: 1 }], paymentMethod: 'cash', discount: 0, discountType: 'percentage' },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const watchedItems = useWatch({ control, name: 'items' });
  const watchedDiscountType = useWatch({ control, name: 'discountType' }) ?? 'percentage';
  const watchedDiscountPaise = useWatch({ control, name: 'discount' }) ?? 0;
  const watchedPhone = useWatch({ control, name: 'phone' }) ?? '';
  const [discountInputValue, setDiscountInputValue] = useState<string>('0');

  /* -------------------------
     Fetch categories & items per row
  ------------------------- */
  const fetchCategories = useCallback(async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data || []);
    } catch (err) { console.error(err); }
  }, []);

  const fetchItemsForRow = useCallback(async (categoryId: string, rowIndex: number) => {
    if (!categoryId) return;
    try {
      const res = await getAllItems({ page: 1, limit: 1000, activeOnly: true, category: categoryId });
      setRowItemsList(prev => ({ ...prev, [rowIndex]: res.items || [] }));
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  /* -------------------------
     Phone suggestions
  ------------------------- */
  useEffect(() => { setPhoneQuery(watchedPhone ?? ''); }, [watchedPhone]);

  useEffect(() => {
    if ((phoneQuery?.length ?? 0) < 3) { setUserSuggestions([]); setIsSuggestionsOpen(false); return; }
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = window.setTimeout(async () => {
      const token = ++lastSearchToken.current;
      try {
        const res = await searchUsersByPhone(phoneQuery);
        if (token !== lastSearchToken.current) return;
        if (res?.status === 1 && Array.isArray(res.data)) { setUserSuggestions(res.data); setIsSuggestionsOpen(true); }
        else { setUserSuggestions([]); setIsSuggestionsOpen(false); }
      } catch (err) { console.error(err); }
    }, 300);
    return () => { if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current); };
  }, [phoneQuery]);

  const selectSuggestion = (phone: string) => { setValue('phone', phone, { shouldDirty: true, shouldValidate: true }); setIsSuggestionsOpen(false); suggestionIndexRef.current = -1; };

  /* -------------------------
     Money calculations
  ------------------------- */
  const subtotalPaise = useMemo(() => {
    return watchedItems.reduce((acc, it, idx) => {
      const rowItems = rowItemsList[idx] || [];
      const selected = rowItems.find(i => i._id === it.item);
      if (!selected) return acc;
      return safeAddPaise(acc, safeMulPaise(toPaise(Number(selected.price)), Number(it.quantity) || 0));
    }, 0);
  }, [watchedItems, rowItemsList]);

  useEffect(() => {
    if (!discountInputValue) { setValue('discount', 0, { shouldDirty: true }); return; }
    if (watchedDiscountType === 'percentage') {
      const percent = Math.max(0, Number(discountInputValue) || 0);
      const boundedPercent = Math.min(percent, 100);
      setValue('discount', safeMinPaise(Math.round((subtotalPaise * boundedPercent) / 100), subtotalPaise), { shouldDirty: true });
    } else {
      const amountPaise = toPaise(Math.max(0, Number(discountInputValue) || 0));
      setValue('discount', safeMinPaise(amountPaise, subtotalPaise), { shouldDirty: true });
    }
  }, [discountInputValue, subtotalPaise, watchedDiscountType, setValue]);

  const discountPaise = watchedDiscountPaise ?? 0;
  const grandTotalPaise = Math.max(0, subtotalPaise - discountPaise);

  /* -------------------------
     Add / Remove Items
  ------------------------- */
  const handleAddItem = useCallback(() => append({ category: '', item: '', quantity: 1 }), [append]);
  const handleRemoveItem = useCallback((index: number) => { if (fields.length > 1) remove(index); }, [remove, fields.length]);

  /* -------------------------
     Submit
  ------------------------- */
  const onSubmit = async (values: BillForm) => {
    if (values.items.some(it => !it.item)) return;
    setIsLoading(true);
    try {
      const payload: CreateBillPayload = {
        phone: values.phone,
        items: values.items.map(i => ({ item: i.item, quantity: Number(i.quantity) })),
        discount: fromPaise(values.discount ?? 0),
        paymentMethod: values.paymentMethod,
      };
      const res = await createBill(payload);
      if (res?.status === 1) navigate('/bill-preview', { state: { billData: res.data } });
      else console.error('create bill failed', res);
    } catch (err) { console.error(err); }
    finally { setIsLoading(false); }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) { case 'cash': return <Banknote className="h-4 w-4" />; case 'card': return <CreditCard className="h-4 w-4" />; case 'upi': return <Smartphone className="h-4 w-4" />; default: return <MoreHorizontal className="h-4 w-4" />; }
  };

  /* -------------------------
     Render
  ------------------------- */
  return (
    <div>
      <form className="grid grid-cols-1 lg:grid-cols-3 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Card */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /> Customer</CardTitle></CardHeader>
            <CardContent>
              <div className="relative">
                <Input
                  {...register('phone')}
                  placeholder="Enter phone number"
                  inputMode="tel"
                  autoComplete="off"
                  value={watchedPhone}
                  className="pl-10"
                  aria-autocomplete="list"
                  aria-controls="phone-suggestions"
                  aria-expanded={isSuggestionsOpen} // eslint-disable-next-line
                  onChange={(e: any) => { setValue('phone', e.target.value, { shouldDirty: true, shouldValidate: true }); setPhoneQuery(e.target.value); }}
                />
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                {isSuggestionsOpen && userSuggestions.length > 0 && (
                  <div ref={suggestionsRef} id="phone-suggestions" className="absolute z-50 mt-2 max-h-48 w-full overflow-auto rounded-md border bg-white shadow-lg">
                    {userSuggestions.map((s, idx) => (
                      <div key={s._id} data-suggestion-index={idx} className={`cursor-pointer px-3 py-2 ${idx === suggestionIndexRef.current ? 'bg-gray-100' : 'hover:bg-gray-50'}`} onMouseDown={(e) => { e.preventDefault(); selectSuggestion(s.phone); }}>
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium">{s.phone}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Items Card */}
          <Card>
            <CardHeader><CardTitle className="text-lg font-semibold">Items</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-12 items-center gap-3">
                  <div className="col-span-3">
                    <Controller control={control} name={`items.${index}.category`} render={({ field: catField }) => (
                      <Select value={catField.value || ""} onValueChange={async (v) => { catField.onChange(v); setValue(`items.${index}.item`, ""); if (v) await fetchItemsForRow(v, index); }}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>{categories.map(cat => <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>)}</SelectContent>
                      </Select>
                    )} />
                  </div>
                  <div className="col-span-6">
                    <Controller control={control} name={`items.${index}.item`} render={({ field: itemField }) => (
                      <Select value={itemField.value || ""} disabled={!getValues(`items.${index}.category`)} onValueChange={itemField.onChange}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Item" /></SelectTrigger>
                        <SelectContent>
                          {(rowItemsList[index] || []).map(it => (
                            <SelectItem key={it._id} value={it._id}>
                              <div className="flex justify-between items-center gap-3">
                                <span>{it.name}</span>
                                <Badge variant="default">₹{Number(it.price).toFixed(2)}</Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )} />
                  </div>
                  <div className="col-span-2">
                    <Controller control={control} name={`items.${index}.quantity`} render={({ field: qtyField }) => (
                      <Input type="number" min={1} max={30} placeholder="Qty" inputMode="numeric" pattern="[0-9]*" className="text-center" {...qtyField} onChange={(e: any) => qtyField.onChange(Math.max(1, Math.min(30, Number(e.target.value) || 1)))} /> // eslint-disable-line
                    )} />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Button type="button" variant="default" size="xs" disabled={fields.length === 1} className="rounded-full" onClick={() => handleRemoveItem(index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {/* eslint-disable-next-line */}
              {errors.items && <p className="text-sm text-destructive">{(errors.items as any)?.message}</p>} 
              <Button type="button" variant="solid" size="sm" className="flex justify-end gap-2 items-center" onClick={handleAddItem}>
                <Plus className="h-5 w-5 mr-2" /> Add Item
              </Button>
            </CardContent>
          </Card>

          {/* Discount & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">Discount</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button type="button" variant={watchedDiscountType === 'percentage' ? 'default' : 'solid'} size="sm" onClick={() => setValue('discountType', 'percentage')}><Percent className="h-4 w-4 mr-1" />%</Button>
                  <Button type="button" variant={watchedDiscountType === 'amount' ? 'default' : 'solid'} size="sm" onClick={() => setValue('discountType', 'amount')}><DollarSign className="h-4 w-4 mr-1" />₹</Button>
                </div>
                {/* eslint-disable-next-line */}
                <Input type="number" placeholder={watchedDiscountType === 'percentage' ? 'Enter %' : 'Enter amount (₹)'} value={discountInputValue} min={0} max={watchedDiscountType === 'percentage' ? 100 : undefined} onChange={(e: any) => setDiscountInputValue(e.target.value)} />
                <div className="text-sm text-muted-foreground">
                  <div>Subtotal: ₹{fromPaise(subtotalPaise).toFixed(2)}</div>
                  <div>Calculated discount: ₹{fromPaise(discountPaise).toFixed(2)}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Payment Method</CardTitle></CardHeader>
              <CardContent>
                <Controller control={control} name="paymentMethod" render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder="Select Payment Method" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash"><div className="flex items-center gap-2">{getPaymentIcon('cash')} Cash</div></SelectItem>
                      <SelectItem value="card"><div className="flex items-center gap-2">{getPaymentIcon('card')} Card</div></SelectItem>
                      <SelectItem value="upi"><div className="flex items-center gap-2">{getPaymentIcon('upi')} UPI</div></SelectItem>
                      <SelectItem value="other"><div className="flex items-center gap-2">{getPaymentIcon('other')} Other</div></SelectItem>
                    </SelectContent>
                  </Select>
                )} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader><CardTitle>Bill Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {watchedItems.map((it, idx) => {
                  const rowItems = rowItemsList[idx] || [];
                  const selected = rowItems.find(i => i._id === it.item);
                  if (!selected) return null;
                  const linePaise = safeMulPaise(toPaise(Number(selected.price)), Number(it.quantity) || 0);
                  return (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div><span className="font-medium">{selected.name}</span> <span className="text-muted-foreground ml-1">×{it.quantity}</span></div>
                      <span className="font-medium">₹{fromPaise(linePaise).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal:</span><span>₹{fromPaise(subtotalPaise).toFixed(2)}</span></div>
                {discountPaise > 0 && <div className="flex justify-between text-success"><span>Discount:</span><span>-₹{fromPaise(discountPaise).toFixed(2)}</span></div>}
                <Separator />
                <div className="flex justify-between text-lg font-bold"><span>Total:</span><span>₹{fromPaise(grandTotalPaise).toFixed(2)}</span></div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || watchedItems.some(it => !it.item)}>{isLoading ? 'Creating bill...' : 'Create Bill'}</Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CreateBillPage;
