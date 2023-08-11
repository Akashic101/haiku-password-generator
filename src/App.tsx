import {
  Center,
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Box,
  SegmentedControl,
  AppShell,
  Header,
  Group,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { IconSun, IconMoon } from "@tabler/icons-react";
import GenerateButton from "./components/generateButton";
import Logo from "./components/logo";

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: useColorScheme(),
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme): void =>
    setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));

  return (
    <MantineProvider
      theme={{ colorScheme: colorScheme }}
      withGlobalStyles
      withNormalizeCSS
    >
      {" "}
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
        children={undefined}
      />
      <AppShell
        padding="md"
        header={
          <Header height={60}>
            {
              <Group sx={{ height: "100%" }} px={10} position="apart">
                <Logo />
                <SegmentedControl
                  value={colorScheme}
                  onChange={(value: "light" | "dark") =>
                    toggleColorScheme(value)
                  }
                  data={[
                    {
                      value: "light",
                      label: (
                        <Center>
                          <IconSun size="1rem" stroke={1.5} />
                          <Box ml={10}>Light</Box>
                        </Center>
                      ),
                    },
                    {
                      value: "dark",
                      label: (
                        <Center>
                          <IconMoon size="1rem" stroke={1.5} />
                          <Box ml={10}>Dark</Box>
                        </Center>
                      ),
                    },
                  ]}
                />
              </Group>
            }
          </Header>
        }
      >
        {
          <Center maw={100} h={800} mx="auto">
            <GenerateButton />
          </Center>
        }
      </AppShell>
    </MantineProvider>
  );
}
