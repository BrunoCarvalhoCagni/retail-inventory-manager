import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.ts';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export function useProducts() {
  const queryClient = useQueryClient();

  // Busca produtos
  const query = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get<Product[]>('/products');
      return response.data;
    },
  });

  // Mutação para criar produto
  const createMutation = useMutation({
    mutationFn: async (newProduct: Omit<Product, 'id'>) => {
      await api.post('/products', newProduct);
    },
    onSuccess: () => {
      // Invalida o cache e atualiza a lista automaticamente
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return { ...query, createProduct: createMutation.mutateAsync };
}