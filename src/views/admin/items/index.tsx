import { useState, useCallback, useRef } from 'react'
import Button from '@/components/ui/Button'
import ItemTable from './components/ItemTable'
import CreateEditItemModal from './components/CreateEditItemModal'
import { Item, getAllItems } from '@/services/ItemService'

const ItemPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Item | undefined>()
  const tableRef = useRef<{ reload: () => void }>(null)

  // Fetch items function (paginated)
  const fetchItems = useCallback(
    async (page: number = 1, search: string = '') => {
      try {
        const res = await getAllItems({ page, search })
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
    []
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
    // Refresh the table after create/edit
    if (tableRef.current) {
      tableRef.current.reload()
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-lg font-bold">Items</h1>
        <Button variant="solid" size="sm" onClick={openCreateModal}>
          Create Item
        </Button>
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
