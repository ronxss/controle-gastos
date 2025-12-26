import api from './api';
import { ServiceResponse } from '../types/types';

export interface ResumoFinanceiro {
    relatorioIndividual: {
        nome: string;
        descricao: string;
        receitas: number;
        despesas: number;
        saldo: number;
    }[];
    resumoGeral: {
        totalReceitas: number;
        totalDespesas: number;
        saldoLiquido: number;
    };
}


export const relatorioService = {
    async obterTotaisPorPessoa(): Promise<ServiceResponse<ResumoFinanceiro>> {
        const response = await api.get<ServiceResponse<ResumoFinanceiro>>('/Pessoa/totais');
        return response.data;
    },
    async obterTotaisPorCategoria(): Promise<ServiceResponse<ResumoFinanceiro>> {
        const response = await api.get<ServiceResponse<ResumoFinanceiro>>('/Categoria/totais');
        return response.data;
    }
};