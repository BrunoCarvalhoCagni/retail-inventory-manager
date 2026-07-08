import { useProducts } from './hooks/useProducts.ts';
import { Package, Plus, Loader2 } from 'lucide-react';
import { CreateProductModal } from './components/CreateProductModal.tsx';
import { Toaster } from 'sonner';
import { useState } from 'react';

export default function App() {
  const { data: products, isLoading } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toaster position="top-right" richColors />
      <CreateProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Package className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">Retail Inventory</h1>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} />
            New Product
          </button>
        </header>

        <main className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">Product</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Stock</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.description}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products?.length === 0 && (
            <div className="p-12 text-center text-gray-500">No products registered.</div>
          )}
        </main>
      </div>
    </div>
  );
}