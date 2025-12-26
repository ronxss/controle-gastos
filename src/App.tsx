import '@mantine/core/styles.css';
import { useEffect } from 'react';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { AppShell, Burger, Group, NavLink, Title, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUsers, IconCategory, IconReportMoney, IconPlus } from '@tabler/icons-react'; import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { CadastroCategoria } from './components/CadastroCategoria';
import { GerenciarPessoas } from './components/GerenciarPessoas';
import { CadastroTransacao } from './components/CadastroTransacao';
import { ListaTotaisPessoas } from './components/ListaTotaisPessoa';
import { ListaTotaisCategoria } from './components/ListaTotaisCategoria';
import { useState } from 'react';

function App() {
  useEffect(() => {
    document.title = "Gestão Financeira";
  }, []);
  const [opened, { toggle }] = useDisclosure();
  const [paginaAtiva, setPaginaAtiva] = useState('relatorio-cat');
  return (
    <MantineProvider>
      <Notifications position="top-right" zIndex={2000} />
      <Router>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header bg="blue.7" c="white">
            <Group h="100%" px="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
              <IconReportMoney size={30} />
              <Title order={3}>Gestão Financeira</Title>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar p="md">
            <Text size="xs" fw={700} c="dimmed" mb="xs" tt="uppercase">
              Relatórios
            </Text>
            <NavLink
              label="Totais por Categoria"
              leftSection={<IconCategory size={20} />}
              active={paginaAtiva === 'relatorio-cat'}
              onClick={() => { setPaginaAtiva('relatorio-cat'); toggle(); }}
            />
            <NavLink
              label="Totais por Pessoa"
              leftSection={<IconUsers size={20} />}
              active={paginaAtiva === 'relatorio-pess'}
              onClick={() => { setPaginaAtiva('relatorio-pess'); toggle(); }}
            />

            <Text size="xs" fw={700} c="dimmed" mb="xs" mt="xl" tt="uppercase">
              Cadastros
            </Text>
            <NavLink
              label="Pessoas"
              leftSection={<IconPlus size={20} />}
              active={paginaAtiva === 'cad-pessoa'}
              onClick={() => { setPaginaAtiva('cad-pessoa'); toggle(); }}
            />
            <NavLink
              label="Categorias"
              leftSection={<IconPlus size={20} />}
              active={paginaAtiva === 'cad-cat'}
              onClick={() => { setPaginaAtiva('cad-cat'); toggle(); }}
            />
            <NavLink
              label="Transações"
              leftSection={<IconPlus size={20} />}
              active={paginaAtiva === 'cad-transacao'}
              onClick={() => { setPaginaAtiva('cad-transacao'); toggle(); }}
            />
          </AppShell.Navbar>

          <AppShell.Main bg="gray.0">
            {paginaAtiva === 'relatorio-cat' && <ListaTotaisCategoria />}
            {paginaAtiva === 'relatorio-pess' && <ListaTotaisPessoas />}
            {paginaAtiva === 'cad-cat' && <CadastroCategoria />}
            {paginaAtiva === 'cad-transacao' && <CadastroTransacao />}
            {paginaAtiva === 'cad-pessoa' && <GerenciarPessoas />}
          </AppShell.Main>
        </AppShell>
        );
      </Router>
    </MantineProvider>
  );
}

const styles = {
  nav: { backgroundColor: '#2c3e50', padding: '10px', color: 'white' },
  ul: { display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0 },
};

export default App;