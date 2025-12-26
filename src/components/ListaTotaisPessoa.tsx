import React, { useEffect, useState } from 'react';
import { Table, Container, Title, Text, Paper, Group, Grid, ThemeIcon, Loader, Center, Button, Box, Badge } from '@mantine/core';
import {
    IconUser,
    IconArrowUpRight,
    IconArrowDownRight,
    IconBusinessplan,
    IconRefresh
} from '@tabler/icons-react';
import { relatorioService, ResumoFinanceiro } from '../services/relatorioService';

export const ListaTotaisPessoas = () => {
    const [relatorio, setRelatorio] = useState<ResumoFinanceiro | null>(null);
    const [loading, setLoading] = useState(true);

    const carregarDados = async () => {
        setLoading(true);
        try {
            const res = await relatorioService.obterTotaisPorPessoa();
            if (res.sucesso) {
                setRelatorio(res.dados);
            }
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    if (loading) {
        return (
            <Center style={{ height: '50vh' }}>
                <Loader size="xl" variant="dots" />
            </Center>
        );
    }

    if (!relatorio) return <Text c="red" ta="center">Nenhum dado disponível.</Text>;

    return (
        <Container size="lg" py="xl">
            {/* Cabeçalho */}
            <Group justify="space-between" mb="xl">
                <Box>
                    <Title order={2} fw={700}>Relatório Financeiro por Pessoa</Title>
                    <Text c="dimmed" size="sm">Visão geral de receitas, despesas e saldos individuais</Text>
                </Box>
                <Button
                    variant="light"
                    color="blue"
                    leftSection={<IconRefresh size={16} />}
                    onClick={carregarDados}
                >
                    Atualizar Dados
                </Button>
            </Group>

            {/* Cards de Resumo Geral */}
            <Grid mb="xl">
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper withBorder p="md" radius="md" shadow="xs">
                        <Group>
                            <ThemeIcon color="teal" variant="light" size="xl" radius="md">
                                <IconArrowUpRight size={28} />
                            </ThemeIcon>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Total Receitas</Text>
                                <Text size="xl" fw={700} c="teal.8">
                                    R$ {relatorio.resumoGeral.totalReceitas.toLocaleString('pt-BR')}
                                </Text>
                            </Box>
                        </Group>
                    </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper withBorder p="md" radius="md" shadow="xs">
                        <Group>
                            <ThemeIcon color="red" variant="light" size="xl" radius="md">
                                <IconArrowDownRight size={28} />
                            </ThemeIcon>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Total Despesas</Text>
                                <Text size="xl" fw={700} c="red.8">
                                    R$ {relatorio.resumoGeral.totalDespesas.toLocaleString('pt-BR')}
                                </Text>
                            </Box>
                        </Group>
                    </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper withBorder p="md" radius="md" shadow="xs" bg="blue.0">
                        <Group>
                            <ThemeIcon color="blue" variant="filled" size="xl" radius="md">
                                <IconBusinessplan size={28} />
                            </ThemeIcon>
                            <Box>
                                <Text size="xs" c="blue.9" fw={700} tt="uppercase">Saldo Líquido</Text>
                                <Text size="xl" fw={900} c="blue.9">
                                    R$ {relatorio.resumoGeral.saldoLiquido.toLocaleString('pt-BR')}
                                </Text>
                            </Box>
                        </Group>
                    </Paper>
                </Grid.Col>
            </Grid>

            {/* Tabela de Detalhes */}
            <Paper withBorder radius="md" p="0" shadow="sm">
                <Table highlightOnHover verticalSpacing="md">
                    <Table.Thead bg="gray.0">
                        <Table.Tr>
                            <Table.Th><Group gap="xs"><IconUser size={16} /> Nome</Group></Table.Th>
                            <Table.Th ta="right">Receitas</Table.Th>
                            <Table.Th ta="right">Despesas</Table.Th>
                            <Table.Th ta="right">Saldo Individual</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {relatorio.relatorioIndividual.map((item, index) => (
                            <Table.Tr key={index}>
                                <Table.Td fw={500}>{item.nome}</Table.Td>
                                <Table.Td ta="right" c="teal.7">
                                    R$ {item.receitas.toLocaleString('pt-BR')}
                                </Table.Td>
                                <Table.Td ta="right" c="red.7">
                                    R$ {item.despesas.toLocaleString('pt-BR')}
                                </Table.Td>
                                <Table.Td ta="right">
                                    <Badge
                                        color={item.saldo >= 0 ? 'teal' : 'red'}
                                        variant="light"
                                        size="lg"
                                        radius="sm"
                                    >
                                        R$ {item.saldo.toLocaleString('pt-BR')}
                                    </Badge>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Container>
    );
};