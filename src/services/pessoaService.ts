import api from './api';
import { PessoaModel, PessoaCreateDto } from '../types/types';
import { ServiceResponse } from '../types/types';

export const pessoaService = {
    async listarTodos(): Promise<ServiceResponse<PessoaModel[]>> {
        const response = await api.get('/Pessoa');
        return response.data;
    },

    async criar(pessoa: PessoaCreateDto): Promise<ServiceResponse<PessoaModel[]>> {
        const response = await api.post('/Pessoa', pessoa);
        return response.data;
    },

    async excluir(id: string): Promise<ServiceResponse<PessoaModel[]>> {
        const response = await api.delete(`/Pessoa/${id}`);
        return response.data;
    }
};