import api from './api';
import { TransacaoCreateDto } from '../types/types';
import { ServiceResponse } from '../types/types';
import { TransacoesModel } from '../types/types';

export const transacaoService = {
    async criar(transacao: TransacaoCreateDto): Promise<ServiceResponse<any>> {
        const response = await api.post('/Transacoes', transacao);
        return response.data;
    },
    async listarTodos(): Promise<ServiceResponse<TransacoesModel[]>> {
        const response = await api.get('/Transacoes');
        return response.data;
    }
};