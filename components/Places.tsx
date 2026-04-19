import { Input, InputProps } from "components/ui";
import { Box, Text } from "components/ui";
import type { Zip } from "util/places";
import { useState } from "react";
import debounce from "lodash/debounce";

export const ZipField: React.FC<React.PropsWithChildren<InputProps>> = (props) => {
  const [results, setResults] = useState<Zip[]>([]);

  async function doSearch(search: string) {
    const res = await fetch(`/api/places?search=${search}`);
    const d = (await res.json()) as { zips: Zip[] };
    const zips = d.zips;
    setResults(zips);
  }

  return (
    <Box>
      <Input
        {...props}
        onChange={debounce((e) => doSearch(e.target.value), 300)}
      />
      {results &&
        results.map((zip, ix) => (
          <Text key={ix}>
            {zip.zip} {zip.place}
          </Text>
        ))}
    </Box>
  );
};
