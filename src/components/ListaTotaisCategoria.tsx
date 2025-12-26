import React, { useEffect, useState } from 'react';
import { Table, Container, Title, Text, Paper, Group, Grid, ThemeIcon, Loader, Center, Button, Box } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight, IconWallet, IconRefresh } from '@tabler/icons-react';
import { relatorioService, ResumoFinanceiro } from '../services/relatorioService';

export const ListaTotaisCategoria = () => {
    const [relatorio, setRelatorio] = useState<ResumoFinanceiro | null>(null);
    const [loading, setLoading] = useState(true);

    const carregarDados = async () => {
        setLoading(true);
        const res = await relatorioService.obterTotaisPorCategoria();
        if (res.sucesso) {
            setRelatorio(res.dados);
        }
        setLoading(false);
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

    if (!relatorio) return <Text c="red">Nenhum dado disponível.</Text>;

    return (
        <Container size="lg" py="xl">
            <Group justify="space-between" mb="xl">
                <Title order={2} fw={700}>Relatório por Categoria</Title>
                <Button
                    variant="light"
                    leftSection={<IconRefresh size={16} />}
                    onClick={carregarDados}
                >
                    Atualizar
                </Button>
            </Group>

            <Grid mb="xl">
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper withBorder p="md" radius="md">
                        <Group>
                            <ThemeIcon color="teal" variant="light" size="xl" radius="md">
                                <IconArrowUpRight size={28} />
                            </ThemeIcon>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Total Receitas</Text>
                                <Text size="xl" fw={700} c="teal.7">
                                    R$ {relatorio.resumoGeral.totalReceitas.toLocaleString('pt-BR')}
                                </Text>
                            </Box>
                        </Group>
                    </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper withBorder p="md" radius="md">
                        <Group>
                            <ThemeIcon color="red" variant="light" size="xl" radius="md">
                                <IconArrowDownRight size={28} />
                            </ThemeIcon>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Total Despesas</Text>
                                <Text size="xl" fw={700} c="red.7">
                                    R$ {relatorio.resumoGeral.totalDespesas.toLocaleString('pt-BR')}
                                </Text>
                            </Box>
                        </Group>
                    </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper withBorder p="md" radius="md">
                        <Group>
                            <ThemeIcon color="blue" variant="light" size="xl" radius="md">
                                <IconWallet size={28} />
                            </ThemeIcon>
                            <Box>
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">Saldo Total</Text>
                                <Text size="xl" fw={700} c="blue.7">
                                    R$ {relatorio.resumoGeral.saldoLiquido.toLocaleString('pt-BR')}
                                </Text>
                            </Box>
                        </Group>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Paper withBorder radius="md" p="0">
                <Table highlightOnHover verticalSpacing="sm">
                    <Table.Thead bg="gray.0">
                        <Table.Tr>
                            <Table.Th>Categoria</Table.Th>
                            <Table.Th ta="right">Receitas</Table.Th>
                            <Table.Th ta="right">Despesas</Table.Th>
                            <Table.Th ta="right">Saldo</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {relatorio.relatorioIndividual.map((item, index) => {
                            const saldoItem = item.receitas - item.despesas;
                            return (
                                <Table.Tr key={index}>
                                    <Table.Td fw={500}>{item.descricao}</Table.Td>
                                    <Table.Td ta="right" c="teal.7">
                                        R$ {item.receitas.toLocaleString('pt-BR')}
                                    </Table.Td>
                                    <Table.Td ta="right" c="red.7">
                                        R$ {item.despesas.toLocaleString('pt-BR')}
                                    </Table.Td>
                                    <Table.Td ta="right" fw={700} c={saldoItem >= 0 ? 'teal.9' : 'red.9'}>
                                        R$ {saldoItem.toLocaleString('pt-BR')}
                                    </Table.Td>
                                </Table.Tr>
                            );
                        })}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Container>
    );
};