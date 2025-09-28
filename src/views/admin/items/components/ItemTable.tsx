import {  useState, useCallback } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Item, deleteItem } from '@/services/ItemService'

interface ItemTableProps {
  items: Item[]
  fetchItems: () => Promise<void>
  onEdit: (item: Item) => void
}

const ItemTable = ({ items, fetchItems, onEdit }: ItemTableProps) => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm('Are you sure you want to delete this item?')) return
      setLoading(true)
      try {
        await deleteItem(id)
        await fetchItems()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [fetchItems]
  )

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search item..."
          value={search}
          className="max-w-xs"
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.category?.name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.formattedPrice || item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.isActive ? 'Active' : 'Inactive'}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-end space-x-2">
                    <Button size="sm" variant="default" onClick={() => onEdit(item)}>Edit</Button>
                    <Button size="sm" variant="solid" onClick={() => handleDelete(item._id)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  {loading ? 'Loading...' : 'No items found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ItemTable
