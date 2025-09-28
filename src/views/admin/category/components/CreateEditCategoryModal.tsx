import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Form, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'
import {
  createCategory,
  updateCategory,
  CreateCategoryPayload,
  Category,
  getAllCategories,
} from '@/services/CategoryService'

interface CreateEditCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  categoryToEdit?: Category
  onSuccess: () => void
}

const CreateEditCategoryModal = ({
  isOpen,
  onClose,
  categoryToEdit,
  onSuccess,
}: CreateEditCategoryModalProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [parentCategory, setParentCategory] = useState<string | null>(null)
  const [isActive, setIsActive] = useState(true)
  const [allCategories, setAllCategories] = useState<Category[]>([])

  // Load all categories for parent dropdown
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories()
      setAllCategories(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Load data if editing
  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name)
      setDescription(categoryToEdit.description || '')
      setParentCategory(categoryToEdit.parentCategory || null)
      setIsActive(categoryToEdit.isActive)
    } else {
      setName('')
      setDescription('')
      setParentCategory(null)
      setIsActive(true)
    }
  }, [categoryToEdit])

  const handleSubmit = async () => {
    const payload: CreateCategoryPayload = {
      name,
      description,
      parentCategory,
      isActive,
    }
    try {
      if (categoryToEdit) {
        await updateCategory(categoryToEdit._id, payload)
      } else {
        await createCategory(payload)
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={val => !val && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{categoryToEdit ? 'Edit Category' : 'Create Category'}</DialogTitle>
        </DialogHeader>

        <Form className="space-y-4">
          <FormItem label="Name">
            <Input value={name} onChange={e => setName(e.target.value)} />
          </FormItem>

          <FormItem label="Description">
            <Input value={description} onChange={e => setDescription(e.target.value)} />
          </FormItem>

          <FormItem label="Parent Category">
            <Select
              value={parentCategory ?? 'none'}
              onValueChange={val => setParentCategory(val === 'none' ? null : val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {allCategories
                  .filter(cat => cat._id !== categoryToEdit?._id)
                  .map(cat => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </FormItem>

          <FormItem label="Status">
            <Select
              value={isActive ? 'active' : 'inactive'}
              onValueChange={val => setIsActive(val === 'active')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        </Form>

        <DialogFooter className="flex justify-end space-x-2 mt-4">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{categoryToEdit ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEditCategoryModal
