import { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import Button from '@/components/ui/Button'
import { Item, deleteItem } from '@/services/ItemService'

interface ItemTableProps {
  fetchItems: (page?: number) => Promise<{
    items: Item[]
    total: number
    page: number
    pages: number
  }>
  onEdit: (item: Item) => void
}

const ItemTable = forwardRef(({ fetchItems, onEdit }: ItemTableProps, ref) => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const loadItems = useCallback(async (p: number = 1) => {
    setLoading(true)
    try {
      const res = await fetchItems(p)
      setItems(res.items)
      setPage(res.page)
      setTotalPages(res.pages)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [fetchItems])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  // expose reload function to parent
  useImperativeHandle(ref, () => ({
    reload: () => loadItems(page),
  }))

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm('Are you sure you want to delete this item?')) return
      setLoading(true)
      try {
        await deleteItem(id)
        await loadItems(page)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [loadItems, page]
  )

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    loadItems(newPage)
  }

  return (
    <div className="space-y-4">
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
            {items.length > 0 ? (
              items.map(item => (
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

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-2">
        <Button
          size="sm"
          variant="default"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
        <span className="px-2 py-1 bg-gray-100 rounded">{page} / {totalPages}</span>
        <Button
          size="sm"
          variant="default"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
})

ItemTable.displayName = 'ItemTable'

export default ItemTable
