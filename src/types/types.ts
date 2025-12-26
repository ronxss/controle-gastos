export interface PessoaModel {
    id: string;
    nome: string;
    idade: number;
}

export interface PessoaCreateDto {
    nome: string;
    idade: number;
}

export enum FinalidadeEnum {
    Despesa = 0,
    Receita = 1,
    Ambas = 2
}

export enum TipoTransacaoEnum {
    Despesa = 0,
    Receita = 1
}

export interface CategoriaModel {
    id: string;
    descricao: string;
    finalidade: FinalidadeEnum;
}

export interface CategoriaCreateDto {
    descricao: string;
    finalidade: FinalidadeEnum;
}
export interface TransacoesModel {
    id: string;
    descricao: string;
    valor: number;
    tipoTransacao: TipoTransacaoEnum;
    categoriaId: string;
    pessoaId: string;
}

export interface TransacaoCreateDto {
    descricao: string;
    valor: number;
    tipoTransacao: number; // 0 para Despesa, 1 para Receita
    pessoaId: string;
    categoriaId: string;
}

export interface RelatorioPessoa {
    nome: string;
    receitas: number;
    despesas: number;
    saldo: number;
}

export interface ResumoGeral {
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
}
export interface ServiceResponse<T> {
    dados: T;
    mensagem: string;
    sucesso: boolean;
}
