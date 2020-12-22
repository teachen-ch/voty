import { useMemo, useState } from "react";
import { Box, Flex, Text } from "rebass";
import { isEqual, cloneDeep } from "lodash";
import { isBrowser } from "util/isBrowser";

type Point = {
  x: number;
  y: number;
};

type Board = string[][];
type Pixels = boolean[][];

type Word = {
  from: Point;
  to: Point;
  solved: boolean;
  word: string;
};

enum State {
  "Normal",
  "Hover",
  "Highlighted",
  "Solved",
  "Error",
}

const { abs, max, round } = Math;

export const Wordsearch: React.FC<{ letters: string; solution: string }> = ({
  letters,
  solution,
}) => {
  const board = useMemo<Board>(() => parseBoard(letters), [letters]);
  const empty = useMemo<Pixels>(() => emptyPixels(board), [board]);
  const words = useMemo<Word[]>(() => parseSolution(solution, board), [
    solution,
    board,
  ]);

  const [start, setStart] = useState<Point | undefined>();
  const [hover, setHover] = useState<Point | undefined>();
  const [hoverPixels, setHoverPixels] = useState<Pixels>(empty);
  const [solvedPixels, setSolvedPixels] = useState<Pixels>(cloneDeep(empty));
  const [errorPixels, setErrorPixels] = useState<Pixels>(empty);

  function doClick(e: React.MouseEvent<HTMLDivElement>, p: Point) {
    e.stopPropagation();
    e.preventDefault();
    if (start && isEqual(start, p)) return;
    return start ? endWord(p) : startWord(p);
  }

  function startWord(p: Point) {
    setStart(p);
  }

  function doHover(p: Point) {
    setHover(p);
    if (start && isStar(start, p)) {
      setHoverPixels(fillLine(start, p));
    } else {
      setHoverPixels(empty);
    }
  }

  function isHighlighted(p: Point): boolean {
    if (isEqual(p, start)) return true;
    return hoverPixels ? hoverPixels[p.y][p.x] : false;
    // return start && hover ? inLine(p, start, hover) : false;
  }

  function fillLine(from: Point, to: Point, pixels?: Pixels): Pixels {
    pixels = pixels || cloneDeep(empty);
    const steps = diagDistance(from, to);
    for (let i = 0; i <= steps; ++i) {
      const t = steps == 0 ? 0 : i / steps;
      const p = lerpPoint(from, to, t);
      pixels[round(p.y)][round(p.x)] = true;
    }
    return pixels;
  }

  function isStar(from: Point, to: Point): boolean {
    if (from.x === to.x || from.y === to.y) return true;
    const diffX = abs(from.x - to.x);
    const diffY = abs(from.y - to.y);
    if (diffX === diffY) return true;
    return false;
  }

  function isSolved(p: Point): boolean {
    return solvedPixels[p.y][p.x];
  }

  function isError(p: Point): boolean {
    return errorPixels[p.y][p.x];
  }

  function endWord(p: Point) {
    if (start) {
      if (isMatch(p)) {
        setSolvedPixels(fillLine(start, p, solvedPixels));
      } else {
        console.warn(`${start.x + 1},${start.y + 1}-${p.x + 1},${p.y + 1}`);
        if (isStar(start, p)) setErrorPixels(fillLine(start, p));
      }
      setHoverPixels(empty);
      setTimeout(clear, 500);
    }
  }

  function clear() {
    setStart(undefined);
    setErrorPixels(empty);
  }

  function isMatch(p: Point): boolean {
    if (isEqual(start, p)) return false;
    const startsWith = words.filter(
      (word) => isEqual(word.from, start) || isEqual(word.to, start)
    );
    const matches = startsWith.filter(
      (word) => isEqual(word.to, p) || isEqual(word.from, p)
    );
    matches.forEach((word) => (word.solved = true));
    return matches.length ? true : false;
  }

  function getState(p: Point): State {
    let state = State.Normal;

    if (isError(p)) state = State.Error;
    else if (start && isSolved(p)) state = State.Solved;
    else if (isEqual(p, hover)) state = State.Hover;
    else if (isHighlighted(p)) state = State.Highlighted;
    else if (isSolved(p)) state = State.Solved;
    return state;
  }

  if (!isBrowser()) return null;

  return (
    <Flex flexDirection="column">
      {board.map((row, y) => (
        <Flex key={y}>
          {row.map((letter, x) => (
            <Box
              key={x}
              onMouseOver={() => doHover({ x, y })}
              onMouseDown={(e) => doClick(e, { x, y })}
              onMouseUp={(e) => doClick(e, { x, y })}
            >
              <Letterbox state={getState({ x, y })} letter={letter} />
            </Box>
          ))}
        </Flex>
      ))}
      <Score words={words} />
    </Flex>
  );
};

const Letterbox: React.FC<{ letter: string; state: State }> = ({
  letter,
  state,
}) => {
  let border = "1px solid lightgray";
  let bg = "inherit";
  let color = "inherit";
  switch (state) {
    case State.Hover:
      border = "3px solid lightgray";
      bg = "lightgray";
      color = "black";
      break;
    case State.Highlighted:
      bg = "lightgray";
      color = "black";
      break;
    case State.Solved:
      bg = "green";
      break;
    case State.Error:
      bg = "red";
      break;
  }
  return (
    <Flex
      bg={bg}
      color={color}
      sx={{ border, boxSizing: "border-box" }}
      width={40}
      height={40}
      justifyContent="center"
      alignItems="center"
    >
      {letter}
    </Flex>
  );
};

const Score: React.FC<{ words: Word[]; last?: Word }> = ({ words, last }) => {
  const total = words.length;
  const solved = words.filter((word) => word.solved).length;
  if (total === solved) {
    return (
      <Box py={2}>
        <Text fontWeight="bold">Yay! Alle Wörter gefunden!</Text>
      </Box>
    );
  } else {
    return (
      <Box width="100%" py={2}>
        <Text fontWeight="bold" fontSize={1}>
          Es fehlen noch {total - solved} Wörter:
          <br />
          {words
            .filter((word) => word.solved === false)
            .map((word) => word.word)
            .join(", ")}
        </Text>
      </Box>
    );
  }
};

// ABCD\n EFGH \n…
function parseBoard(letters: string): Board {
  return letters
    .trim()
    .split("\n")
    .map((row) => row.split(""));
}

// 1,2-4,11 9,1-9,9
function parseSolution(solution: string, board: Board): Word[] {
  return solution
    .trim()
    .split(" ")
    .map((pair) => {
      const [fromS, toS] = pair.split("-");
      const [from, to] = [parsePoint(fromS), parsePoint(toS)];
      const word = getWord(from, to, board);
      return { from, to, solved: false, word };
    });
}

// 1,2 ==> { x: 0, y: 1}
function parsePoint(point: string): Point {
  const strings = point.split(",");
  const x = parseInt(strings[0]) - 1;
  const y = parseInt(strings[1]) - 1;
  return { x, y };
}

function getWord(from: Point, to: Point, board: Board): string {
  let word = "";
  const steps = diagDistance(from, to);
  for (let i = 0; i <= steps; ++i) {
    const t = steps == 0 ? 0 : i / steps;
    const p = lerpPoint(from, to, t);
    word += board[round(p.y)][round(p.x)];
  }
  return word;
}

function lerp(start: number, end: number, t: number) {
  return start + t * (end - start);
}

function lerpPoint(p0: Point, p1: Point, t: number) {
  return { x: lerp(p0.x, p1.x, t), y: lerp(p0.y, p1.y, t) };
}

function diagDistance(p0: Point, p1: Point) {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  return max(abs(dx), abs(dy));
}

function emptyPixels(board: Board): Pixels {
  const rows = board.length;
  const columns = board[0].length;
  return new Array(rows)
    .fill(0)
    .map(() => new Array<boolean>(columns).fill(false));
}
