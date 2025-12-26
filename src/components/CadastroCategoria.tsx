import React, { useState, useEffect } from 'react';
import { TextInput, Select, Button, Table, Container, Paper, Title, Group, Stack, Badge, Tooltip, Box, ThemeIcon, ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconList, IconCircleCheck, IconAlertCircle, IconTrash } from '@tabler/icons-react';
import { categoriaService } from '../services/categoriaService';
import { CategoriaModel, FinalidadeEnum } from '../types/types';

export const CadastroCategoria = () => {
    const [categorias, setCategorias] = useState<CategoriaModel[]>([]);
    const [descricao, setDescricao] = useState('');
    const [finalidade, setFinalidade] = useState<string>(FinalidadeEnum.Despesa.toString());

    useEffect(() => {
        carregarCategorias();
    }, []);

    const carregarCategorias = async () => {
        const res = await categoriaService.listarTodos();
        if (res.sucesso) setCategorias(res.dados);
    };

    const handleSalvar = async (e: React.FormEvent) => {
        e.preventDefault();

        const novaCategoria = { descricao, finalidade: Number(finalidade) };
        const res = await categoriaService.criar(novaCategoria);

        if (res.sucesso) {
            notifications.show({
                title: 'Sucesso!',
                message: 'Categoria cadastrada com sucesso.',
                color: 'teal',
                icon: <IconCircleCheck size={18} />,
            });
            setCategorias(res.dados);
            setDescricao('');
        } else {
            notifications.show({
                title: 'Erro',
                message: res.mensagem || 'Erro ao cadastrar categoria',
                color: 'red',
                icon: <IconAlertCircle size={18} />,
            });
        }
    };

    const handleExcluir = async (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
            const res = await categoriaService.excluir(id);
            if (res.sucesso) {
                notifications.show({
                    title: 'Sucesso!',
                    message: 'Categoria Excluída com sucesso.',
                    color: 'teal',
                    icon: <IconCircleCheck size={18} />,
                });
                setCategorias(res.dados);
            } else {
                notifications.show({
                    title: 'Erro',
                    message: res.mensagem || 'Erro ao excluir categoria',
                    color: 'red',
                    icon: <IconAlertCircle size={18} />,
                });
            }
        }
    };

    const getBadgeColor = (finalidade: number) => {
        if (finalidade === FinalidadeEnum.Receita) return 'teal';
        if (finalidade === FinalidadeEnum.Despesa) return 'red';
        return 'blue';
    };

    return (
        <Container size="md" py="xl">
            <Stack gap="xl">
                <Paper withBorder p="xl" radius="md" shadow="sm">
                    <Group mb="lg">
                        <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                            <IconPlus size={20} />
                        </ThemeIcon>
                        <Title order={3}>Nova Categoria</Title>
                    </Group>

                    <form onSubmit={handleSalvar}>
                        <Group align="flex-end">
                            <TextInput
                                label="Descrição da Categoria"
                                value={descricao}
                                onChange={(e) => setDescricao(e.currentTarget.value)}
                                required
                                style={{ flex: 1 }}
                            />

                            <Select
                                label="Finalidade"
                                data={[
                                    { value: FinalidadeEnum.Despesa.toString(), label: 'Despesa' },
                                    { value: FinalidadeEnum.Receita.toString(), label: 'Receita' },
                                    { value: FinalidadeEnum.Ambas.toString(), label: 'Ambas' },
                                ]}
                                value={finalidade}
                                onChange={(val) => setFinalidade(val || '0')}
                                required
                                style={{ width: 180 }}
                            />

                            <Button type="submit" leftSection={<IconPlus size={18} />}>
                                Cadastrar
                            </Button>
                        </Group>
                    </form>
                </Paper>

                <Box>
                    <Group mb="md">
                        <IconList size={22} color="gray" />
                        <Title order={4} c="dimmed">Categorias Existentes</Title>
                    </Group>

                    <Paper withBorder radius="md" shadow="sm" p="md">
                        <Table highlightOnHover verticalSpacing="sm">
                            <Table.Thead bg="gray.0">
                                <Table.Tr>
                                    <Table.Th>Descrição</Table.Th>
                                    <Table.Th>Finalidade</Table.Th>
                                    <Table.Th>Ações</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {categorias.map((cat) => (
                                    <Table.Tr key={cat.id}>
                                        <Table.Td fw={500}>{cat.descricao}</Table.Td>
                                        <Table.Td>
                                            <Badge
                                                variant="light"
                                                color={getBadgeColor(cat.finalidade)}
                                                size="sm"
                                            >
                                                {FinalidadeEnum[cat.finalidade]}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <Tooltip label="Excluir Categoria">
                                                <ActionIcon
                                                    color="red"
                                                    variant="subtle"
                                                    onClick={() => handleExcluir(cat.id!)}
                                                >
                                                    <IconTrash size={18} />
                                                </ActionIcon>
                                            </Tooltip>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                </Box>
            </Stack>
        </Container>
    );
};