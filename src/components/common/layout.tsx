import { AppShell, Burger, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function LayOut({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main className="main">
        <Center>{children}</Center>
      </AppShell.Main>
    </AppShell>
  );
}
