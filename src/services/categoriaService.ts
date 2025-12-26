import api from './api';
import { CategoriaModel, CategoriaCreateDto } from '../types/types';
import { ServiceResponse } from '../types/types'; // Seu tipo padrão de resposta

export const categoriaService = {
    async listarTodos(): Promise<ServiceResponse<CategoriaModel[]>> {
        const response = await api.get('/Categoria');
        return response.data;
    },

    async criar(categoria: CategoriaCreateDto): Promise<ServiceResponse<CategoriaModel[]>> {
        const response = await api.post('/Categoria', categoria);
        return response.data;
    },
    async excluir(id: string): Promise<ServiceResponse<CategoriaModel[]>> {
        const response = await api.delete(`/Categoria/${id}`);
        return response.data;
    }
};