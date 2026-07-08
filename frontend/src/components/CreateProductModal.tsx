import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Loader2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts.ts';
import { toast } from 'sonner';

const productSchema = z.object({
  name: z.string().min(3, 'The name must be at least 3 characters long'),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, 'The price must be greater than zero'),
  stock: z.coerce.number().int().min(0, 'The stock cannot be negative'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProductModal({ isOpen, onClose }: Props) {
  const { createProduct } = useProducts();
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.input<typeof productSchema>, any, ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  if (!isOpen) return null;

  async function handleCreateProduct(data: ProductFormData) {
    try {
      await createProduct(data);
      toast.success('Product created successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Error creating product. Try again.');
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800">New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit(handleCreateProduct)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product name</label>
            <input 
              {...register('name')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Mechanical Keyboard"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea 
              {...register('description')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
              <input 
                type="number" step="0.01"
                {...register('price')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input 
                type="number"
                {...register('stock')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.stock && <span className="text-red-500 text-xs">{errors.stock.message}</span>}
            </div>
          </div>

          <footer className="pt-4 flex gap-3">
            <button 
              type="button" onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Save'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}