import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Form, FormItem } from '@/components/ui/Form'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import { Item, CreateItemPayload, createItem, updateItem } from '@/services/ItemService'
import { Category, getAllCategories } from '@/services/CategoryService'

interface CreateEditItemModalProps {
  isOpen: boolean
  onClose: () => void
  itemToEdit?: Item
  onSuccess: () => void
}

const CreateEditItemModal = ({ isOpen, onClose, itemToEdit, onSuccess }: CreateEditItemModalProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category | null>(null)
  const [price, setPrice] = useState<number>(0)
  const [isActive, setIsActive] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories()
      setCategories(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name)
      setDescription(itemToEdit.description || '')
      setCategory(categories.find(c => c._id === itemToEdit.category?._id) || null)
      setPrice(itemToEdit.price)
      setIsActive(itemToEdit.isActive)
    } else {
      setName('')
      setDescription('')
      setCategory(null)
      setPrice(0)
      setIsActive(true)
    }
  }, [itemToEdit, categories])

  const handleSubmit = async () => {
    if (!category?._id) {
      alert('Please select a category')
      return
    }

    const payload: CreateItemPayload = {
      name,
      description,
      category: category._id,
      price,
      isActive,
    }

    try {
      if (itemToEdit) {
        await updateItem(itemToEdit._id, payload)
      } else {
        await createItem(payload)
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
          <DialogTitle>{itemToEdit ? 'Edit Item' : 'Create Item'}</DialogTitle>
        </DialogHeader>

        <Form className="space-y-4">
          <FormItem label="Name">
            <Input value={name} onChange={e => setName(e.target.value)} />
          </FormItem>

          <FormItem label="Description">
            <Input value={description} onChange={e => setDescription(e.target.value)} />
          </FormItem>

          <FormItem label="Category">
  <Select
    value={category?._id ?? 'none'}
    onValueChange={val =>
      setCategory(val === 'none' ? null : categories.find(c => c._id === val) || null)
    }
  >
    <SelectTrigger>
      <SelectValue placeholder="Select Category" />
    </SelectTrigger>
    <SelectContent className="max-h-60 overflow-auto">
      <SelectItem value="none">None</SelectItem>
      {categories.map(cat => (
        <SelectItem key={cat._id} value={cat._id}>
          {cat.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</FormItem>


          <FormItem label="Price">
            <Input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
          </FormItem>

          <FormItem label="Status">
            <Select value={isActive ? 'active' : 'inactive'} onValueChange={val => setIsActive(val === 'active')}>
              <SelectTrigger>
                <SelectValue />
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
          <Button onClick={handleSubmit}>{itemToEdit ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEditItemModal
