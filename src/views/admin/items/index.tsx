import { useState, useCallback } from 'react'
import Button from '@/components/ui/Button'
import ItemTable from './components/ItemTable'
import CreateEditItemModal from './components/CreateEditItemModal'
import { Item, getAllItems } from '@/services/ItemService'

const ItemPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Item | undefined>()
  const [items, setItems] = useState<Item[]>([])

  // Fetch items function
  const fetchItems = useCallback(async () => {
    try {
      const res = await getAllItems()
      setItems(res.items)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const openCreateModal = () => {
    setEditItem(undefined)
    setIsModalOpen(true)
  }

  const handleEdit = (item: Item) => {
    setEditItem(item)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-lg font-bold">Items</h1>
        <Button variant="solid" size="sm" onClick={openCreateModal}>
          Create Item
        </Button>
      </div>

      {/* Pass items and fetchItems to table */}
      <ItemTable items={items} fetchItems={fetchItems} onEdit={handleEdit} />

      <CreateEditItemModal
        isOpen={isModalOpen}
        itemToEdit={editItem}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchItems} // Refresh table after create/edit
      />
    </div>
  )
}

export default ItemPage
