import { useEffect, useState, useCallback } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Category, getAllCategories, deleteCategory } from '@/services/CategoryService'

interface CategoryTableProps {
    onEdit: (category: Category) => void
}

const CategoryTable = ({ onEdit }: CategoryTableProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    // Fetch all categories
    const fetchCategories = useCallback(async () => {
        setLoading(true)
        try {
            const res = await getAllCategories()
            setCategories(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    // Delete category and refresh list
    const handleDelete = useCallback(
        async (id: string) => {
            if (!confirm('Are you sure you want to delete this category?')) return
            try {
                await deleteCategory(id)
                fetchCategories()
            } catch (error) {
                console.error(error)
            }
        },
        [fetchCategories]
    )

    // Load categories on mount
    useEffect(() => {
        fetchCategories()
    }, [fetchCategories, handleDelete, onEdit])

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Search category..."
                    value={search}
                    className="max-w-xs"
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <caption className="sr-only">List of categories</caption>
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Parent</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Active</th>
                            <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map(cat => (
                                <tr key={cat._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{cat.name}</td>
                                    <td className="px-6 py-4">{cat.description || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{cat.parentCategory || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{cat.isActive ? 'Active' : 'Inactive'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap flex justify-end space-x-2">
                                        <Button size="xs" variant="default" onClick={() => onEdit(cat)}>
                                            Edit
                                        </Button>
                                        <Button size="xs" variant="solid" className='bg-red-500 hover:bg-red-600 text-white' onClick={() => handleDelete(cat._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                    {loading ? (
                                        <span className="text-sm text-gray-500">Loading...</span>
                                    ) : (
                                        'No categories found'
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryTable
