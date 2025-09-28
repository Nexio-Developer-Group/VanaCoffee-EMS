import { useState, useCallback, useRef, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ItemTable from './components/ItemTable'
import CreateEditItemModal from './components/CreateEditItemModal'
import { Category, getAllCategories } from '@/services/CategoryService'
import { getAllItems, Item } from '@/services/ItemService'

const ItemPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Item | undefined>()
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const tableRef = useRef<{ reload: () => void }>(null)

  // Fetch categories for filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories()
        setCategories(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCategories()
  }, [])

  // Fetch items function (paginated + filters + search)
  const fetchItems = useCallback(
    async (page: number = 1) => {
      try {
        const res = await getAllItems({
          page,
          limit: 10,
          category: categoryFilter !== 'all' ? categoryFilter : undefined,
          search,
        })
        return {
          items: res.items,
          total: res.total,
          page: res.page,
          pages: res.pages,
        }
      } catch (error) {
        console.error(error)
        return {
          items: [],
          total: 0,
          page,
          pages: 0,
        }
      }
    },
    [categoryFilter, search]
  )

  const openCreateModal = () => {
    setEditItem(undefined)
    setIsModalOpen(true)
  }

  const handleEdit = (item: Item) => {
    setEditItem(item)
    setIsModalOpen(true)
  }

  const handleSuccess = async () => {
    // reload table whenever a new item is created/edited
    if (tableRef.current) tableRef.current.reload()
  }

  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-lg font-bold">Items</h1>
        <Button variant="solid" size="sm" onClick={openCreateModal}>
          Create Item
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search items..."
          value={search}
          size="sm"
          className="max-w-xs"
          onChange={e => setSearch(e.target.value)}
        />
        <Select value={categoryFilter} onValueChange={val => setCategoryFilter(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-auto">
            <SelectItem value="all">All</SelectItem>
            {categories.map(c => (
              <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Paginated ItemTable */}
      <ItemTable ref={tableRef} fetchItems={fetchItems} onEdit={handleEdit} />

      <CreateEditItemModal
        isOpen={isModalOpen}
        itemToEdit={editItem}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess} // refresh table after modal
      />
    </div>
  )
}

export default ItemPage
