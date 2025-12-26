import React, { useState, useEffect } from 'react';
import { TextInput, NumberInput, Button, Table, Container, Paper, Title, Group, Stack, ActionIcon, Tooltip, ThemeIcon, Box, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconUserPlus, IconUsers, IconTrash, IconCheck, IconAlertTriangle, IconIdBadge2 } from '@tabler/icons-react';
import { pessoaService } from '../services/pessoaService';
import { PessoaModel } from '../types/types';

export const GerenciarPessoas = () => {
    const [pessoas, setPessoas] = useState<PessoaModel[]>([]);
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState<number | string>(0);

    useEffect(() => {
        carregarPessoas();
    }, []);

    const carregarPessoas = async () => {
        const res = await pessoaService.listarTodos();
        if (res.sucesso) setPessoas(res.dados);
    };

    const handleSalvar = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await pessoaService.criar({ nome, idade: Number(idade) });

        if (res.sucesso) {
            notifications.show({
                title: 'Sucesso',
                message: 'Pessoa cadastrada com sucesso!',
                color: 'teal',
                icon: <IconCheck size={18} />,
            });
            setPessoas(res.dados);
            setNome('');
            setIdade(0);
        } else {
            notifications.show({
                title: 'Erro no Cadastro',
                message: res.mensagem,
                color: 'red',
                icon: <IconAlertTriangle size={18} />,
            });
        }
    };

    const handleExcluir = async (id: string) => {
        if (window.confirm("Tem certeza? Isso apagará todas as transações desta pessoa!")) {
            const res = await pessoaService.excluir(id);
            if (res.sucesso) {
                notifications.show({
                    title: 'Excluído',
                    message: 'Registro removido com sucesso.',
                    color: 'blue',
                });
                setPessoas(res.dados);
            } else {
                notifications.show({
                    title: 'Erro ao excluir',
                    message: res.mensagem,
                    color: 'red',
                });
            }
        }
    };

    return (
        <Container size="md" py="xl">
            <Stack gap="xl">

                <Paper withBorder p="xl" radius="md" shadow="sm">
                    <Group mb="lg">
                        <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                            <IconUserPlus size={20} />
                        </ThemeIcon>
                        <Title order={3}>Cadastrar Nova Pessoa</Title>
                    </Group>

                    <form onSubmit={handleSalvar}>
                        <Group align="flex-end">
                            <TextInput
                                label="Nome Completo"
                                placeholder="Ex: João Silva"
                                value={nome}
                                onChange={(e) => setNome(e.currentTarget.value)}
                                required
                                style={{ flex: 1 }}
                            />

                            <NumberInput
                                label="Idade"
                                placeholder="0"
                                value={idade}
                                onChange={setIdade}
                                min={0}
                                max={120}
                                required
                                style={{ width: 120 }}
                            />

                            <Button type="submit" leftSection={<IconUserPlus size={18} />}>
                                Cadastrar
                            </Button>
                        </Group>
                    </form>
                </Paper>

                <Box>
                    <Group mb="md" justify="space-between">
                        <Group gap="xs">
                            <IconUsers size={22} color="gray" />
                            <Title order={4} c="dimmed">Pessoas Cadastradas</Title>
                        </Group>
                        <Text size="xs" c="dimmed">{pessoas.length} registros encontrados</Text>
                    </Group>

                    <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
                        <Table highlightOnHover verticalSpacing="sm">
                            <Table.Thead bg="gray.0">
                                <Table.Tr>
                                    <Table.Th>Nome</Table.Th>
                                    <Table.Th>Idade</Table.Th>
                                    <Table.Th w={100} ta="center">Ações</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {pessoas.map((p) => (
                                    <Table.Tr key={p.id}>
                                        <Table.Td fw={500}>
                                            <Group gap="sm">
                                                <IconIdBadge2 size={16} color="gray" />
                                                {p.nome}
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>{p.idade} anos</Table.Td>
                                        <Table.Td>
                                            <Group justify="center">
                                                <Tooltip label="Excluir Registro">
                                                    <ActionIcon
                                                        color="red"
                                                        variant="subtle"
                                                        onClick={() => handleExcluir(p.id!)}
                                                    >
                                                        <IconTrash size={18} />
                                                    </ActionIcon>
                                                </Tooltip>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                                {pessoas.length === 0 && (
                                    <Table.Tr>
                                        <Table.Td colSpan={3} ta="center" py="xl" c="dimmed">
                                            Nenhuma pessoa cadastrada ainda.
                                        </Table.Td>
                                    </Table.Tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                </Box>
            </Stack>
        </Container>
    );
};