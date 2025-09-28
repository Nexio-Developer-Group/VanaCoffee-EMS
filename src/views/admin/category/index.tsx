import { useState } from 'react'
import Button from '@/components/ui/Button'
import CategoryTable from './components/CategoryTable'
import CreateEditCategoryModal from './components/CreateEditCategoryModal'
import { Category } from '@/services/CategoryService'

const CategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editCategory, setEditCategory] = useState<Category | undefined>()

  const openCreateModal = () => {
    setEditCategory(undefined)
    setIsModalOpen(true)
  }

  const handleEdit = (category: Category) => {
    setEditCategory(category)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-lg font-bold">Categories</h1>
        <Button variant='solid' size='sm' onClick={openCreateModal}>Create Category</Button>
      </div>

      <CategoryTable onEdit={handleEdit} />

      <CreateEditCategoryModal
        isOpen={isModalOpen}
        categoryToEdit={editCategory}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  )
}

export default CategoryPage
