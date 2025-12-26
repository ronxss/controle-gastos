import React, { useState, useEffect } from 'react';
import { Container, Paper, Title, TextInput, NumberInput, Select, Button, Stack, Group, Divider, Notification, ThemeIcon, } from '@mantine/core';
import { IconCheck, IconX, IconDeviceFloppy, IconAlertTriangle } from '@tabler/icons-react';
import { IconPlus } from '@tabler/icons-react';
import { pessoaService } from '../services/pessoaService';
import { categoriaService } from '../services/categoriaService';
import { PessoaModel, TipoTransacaoEnum, TransacaoCreateDto } from '../types/types';
import { notifications } from '@mantine/notifications';
import { transacaoService } from '../services/transacaoService';

export const CadastroTransacao = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [transacao, setTransacao] = useState<TransacaoCreateDto[]>([]);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<number | string>(0);
    const [pessoaId, setPessoaId] = useState<string | null>(null);
    const [categoriaId, setCategoriaId] = useState<string | null>(null);
    const [tipoTransacao, setTipoTransacao] = useState<string>(TipoTransacaoEnum.Despesa.toString());
    const [pessoaModel, setPessoaModel] = useState<PessoaModel[]>([]);
    const [pessoas, setPessoas] = useState<{ value: string; label: string }[]>([]);
    const [categorias, setCategorias] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        carregarPessoas();
        carregarCategorias();
    }, []);

    const carregarPessoas = async () => {
        const resP = await pessoaService.listarTodos();
        if (resP.sucesso) {
            setPessoaModel(resP.dados);
            const formatadas = resP.dados.map((p: any) => ({
                value: p.id.toString(),
                label: p.nome
            }));
            setPessoas(formatadas);
        }
    };

    const carregarCategorias = async () => {
        const resC = await categoriaService.listarTodos();
        if (resC.sucesso) {

            const formatadas = resC.dados.map((c: any) => ({
                value: c.id.toString(),
                label: c.descricao
            }));
            setCategorias(formatadas);
        }
    };

    const handleSalvar = async (e: React.FormEvent) => {
        e.preventDefault();

        const pessoaV = pessoaModel.find(p => String(p.id) === String(pessoaId));
        if (pessoaV) {
            if (Number(pessoaV.idade) < 18 && String(tipoTransacao) === '1') {
                notifications.show({
                    title: 'Bloqueado',
                    message: 'Menores de idade não podem registrar receitas.',
                    color: 'red'
                });
                return;
            }
        }

        const res = await transacaoService.criar({
            descricao,
            valor: Number(valor),
            pessoaId: pessoaId ? String(pessoaId) : "",
            categoriaId: categoriaId ? String(categoriaId) : "",
            tipoTransacao: tipoTransacao === TipoTransacaoEnum.Receita.toString() ? TipoTransacaoEnum.Receita : TipoTransacaoEnum.Despesa
        });

        if (res.sucesso) {
            notifications.show({
                title: 'Sucesso',
                message: 'Transação cadastrada com sucesso!',
                color: 'teal',
                icon: <IconCheck size={18} />,
            });

            setTransacao(res.dados);

        } else {
            notifications.show({
                title: 'Erro no Cadastro',
                message: res.mensagem,
                color: 'red',
                icon: <IconAlertTriangle size={18} />,
            });
        }

        setSuccess(true);
    };

    const getBadgeColor = (tipoTransacao: number) => {
        if (tipoTransacao === TipoTransacaoEnum.Receita) return 'teal';
        if (tipoTransacao === TipoTransacaoEnum.Despesa) return 'red';
        return 'blue';
    };
    return (
        <Container size="sm" py="xl">
            <Paper withBorder p="xl" radius="md" shadow="sm">
                <Group mb="lg">
                    <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                        <IconPlus size={20} />
                    </ThemeIcon>
                    <Title order={3}>Nova Transação</Title>
                </Group>

                {error && (
                    <Notification icon={<IconX size={18} />} color="red" title="Erro de Validação" mb="md" onClose={() => setError(null)}>
                        {error}
                    </Notification>
                )}

                {success && (
                    <Notification icon={<IconCheck size={18} />} color="teal" title="Sucesso!" mb="md" onClose={() => setSuccess(false)}>
                        Transação registrada com sucesso.
                    </Notification>
                )}

                <form onSubmit={handleSalvar}>
                    <Stack gap="md">
                        <TextInput
                            label="Descrição"
                            value={descricao}
                            onChange={(e) => setDescricao(e.currentTarget.value)}
                            required
                        />

                        <Group grow>
                            <Group grow>
                                <NumberInput
                                    label="Valor (R$)"
                                    placeholder="0.00"
                                    value={valor}
                                    onChange={setValor}
                                    required
                                />
                                <Select
                                    label="Tipo"
                                    data={[
                                        { value: TipoTransacaoEnum.Despesa.toString(), label: 'Despesa' },
                                        { value: TipoTransacaoEnum.Receita.toString(), label: 'Receita' },
                                    ]}
                                    value={tipoTransacao}
                                    onChange={(val) => setTipoTransacao(val || '0')}
                                    required
                                    style={{ width: 180 }}
                                />
                            </Group>

                            <Select
                                label="Pessoa"
                                data={pessoas}
                                value={pessoaId}
                                onChange={setPessoaId}
                                required
                            />
                        </Group>

                        <Select
                            label="Categoria"
                            data={categorias}
                            value={categoriaId}
                            onChange={setCategoriaId}
                            required
                        />

                        <Divider my="sm" />

                        <Button
                            type="submit"
                            size="md"
                            leftSection={<IconDeviceFloppy size={20} />}
                            fullWidth
                        >
                            Salvar Transação
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
};