import {
  Button,
  Group,
  Stack,
  Text,
  Title,
  CopyButton,
  ActionIcon,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { generate } from "random-words";
import { useEffect, useState } from "react";

export default function GenerateButton(): React.JSX.Element {
  const [firstLine, setFirstLine] = useState([""]);
  const [secondLine, setSecondLine] = useState([""]);
  const [thirdLine, setThirdLine] = useState([""]);
  const [haikuPassword, setHaikuPassword] = useState("");

  function generateWords(): { word: string; numSyllables: number } {
    let word = generate().toString().toLowerCase();
    const vowelClusters = word.match(/[aeiouy]+/g);
    const numSyllables = vowelClusters ? vowelClusters.length : 0;
    return { word: word, numSyllables: numSyllables };
  }

  function generateLine(wantedSyllables: number): string[] {
    const generatedWords: string[] = [];
    let currentTotalSyllables = 0;

    while (currentTotalSyllables !== wantedSyllables) {
      const { word, numSyllables } = generateWords();

      if (currentTotalSyllables + numSyllables > wantedSyllables) {
        generatedWords.length = 0;
        currentTotalSyllables = 0;
        continue;
      }

      generatedWords.push(word);
      currentTotalSyllables += numSyllables;
    }
    return generatedWords;
  }

  useEffect(() => {
    const capitalizeWord = (word: String) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    const capitalizedfirstArray = firstLine.map(capitalizeWord);
    const capitalizedsecondArray = secondLine.map(capitalizeWord);
    const capitalizedThirdArray = thirdLine.map(capitalizeWord);

    const combinedArray = [
      ...capitalizedfirstArray,
      ...capitalizedsecondArray,
      ...capitalizedThirdArray,
    ];
    setHaikuPassword(combinedArray.join(""));
  }, [firstLine, secondLine, thirdLine]);

  function generateHaikuPassword() {
    setFirstLine(generateLine(5));
    setSecondLine(generateLine(7));
    setThirdLine(generateLine(5));
  }

  return (
    <Group position="center">
      <Stack>
        <Text fs="italic">{firstLine.join(" ")}</Text>
        <Text fs="italic">{secondLine.join(" ")}</Text>
        <Text fs="italic">{thirdLine.join(" ")}</Text>
        <Title order={1}>{haikuPassword}</Title>
      </Stack>
      <Button
        color="pink"
        size="xl"
        onClick={(): void => {
          generateHaikuPassword();
        }}
      >
        Generate a Haiku-Password
      </Button>
      {haikuPassword && (
        <CopyButton value={haikuPassword}>
          {({ copied, copy }) => (
            <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
              {copied ? <IconCheck size="2rem" /> : <IconCopy size="1rem" />}
            </ActionIcon>
          )}
        </CopyButton>
      )}
    </Group>
  );
}
