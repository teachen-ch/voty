import { useMemo, useState } from "react";
import { Box, Flex, Text } from "rebass";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import random from "lodash/random";
import remove from "lodash/remove";

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
  "Start",
  "Solved",
  "Error",
}

const { abs, max, round } = Math;

export const Wordsearch: React.FC<React.PropsWithChildren<{ letters: string; solution: string }>> = ({
  letters,
  solution,
}) => {
  const board = useMemo<Board>(() => parseBoard(letters), [letters]);
  const solutions = useMemo<Word[]>(() => parseSolution(solution, board), [
    solution,
    board,
  ]);
  return <Puzzle board={board} solutions={solutions} />;
};
export const WordsearchGen: React.FC<React.PropsWithChildren<{
  words: string[];
  rows: number;
  cols: number;
}>> = ({ words, rows = 8, cols = 10 }) => {
  const { board, solutions } = useMemo(
    () => generatePuzzle(rows, cols, words),
    [words, rows, cols]
  );
  return <Puzzle board={board} solutions={solutions} />;
};

const Puzzle: React.FC<React.PropsWithChildren<{ board: Board; solutions: Word[] }>> = ({
  board,
  solutions,
}) => {
  const empty = useMemo<Pixels>(() => emptyPixels(board), [board]);
  const [start, setStart] = useState<Point | undefined>();
  const [hover, setHover] = useState<Point | undefined>();
  const [last, setLast] = useState<Word | undefined>();
  const [hoverPixels, setHoverPixels] = useState<Pixels>(empty);
  const [solvedPixels, setSolvedPixels] = useState<Pixels>(cloneDeep(empty));
  const [errorPixels, setErrorPixels] = useState<Pixels>(empty);

  function doClick(e: React.MouseEvent<HTMLDivElement>, p: Point) {
    e.stopPropagation();
    e.preventDefault();
    if (e.type === "mouseup" && start && isEqual(start, p)) return;
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
      const match = isMatch(p);
      if (match) {
        setLast(match);
        setSolvedPixels(fillLine(start, p, solvedPixels));
      } else {
        console.warn(`${start.x + 1},${start.y + 1}-${p.x + 1},${p.y + 1}`);
        if (isStar(start, p)) setErrorPixels(fillLine(start, p));
      }
      setHoverPixels(empty);
      setHover(undefined);
      setStart(undefined);
      setTimeout(clear, 500);
    }
  }

  function clear() {
    setStart(undefined);
    setLast(undefined);
    setErrorPixels(empty);
  }

  function isMatch(p: Point): Word | undefined {
    if (isEqual(start, p)) return;
    const startsWith = solutions.filter(
      (word) => isEqual(word.from, start) || isEqual(word.to, start)
    );
    const matches = startsWith.filter(
      (word) => isEqual(word.to, p) || isEqual(word.from, p)
    );
    matches.forEach((word) => (word.solved = true));
    return matches.length ? matches[0] : undefined;
  }

  function getState(p: Point): State {
    let state = State.Normal;

    if (isError(p)) state = State.Error;
    else if (last && isSolved(p)) state = State.Solved;
    else if (start && isEqual(start, p)) state = State.Start;
    else if (isEqual(p, hover)) state = State.Hover;
    else if (isHighlighted(p)) state = State.Highlighted;
    else if (isSolved(p)) state = State.Solved;
    return state;
  }

  return (
    <Flex flexDirection="column">
      {board.map((row, y) => (
        <Flex key={y}>
          {row.map((letter, x) => (
            <Box
              key={x}
              onMouseOver={() => doHover({ x, y })}
              onMouseOut={() => setHover(undefined)}
              onMouseDown={(e) => doClick(e, { x, y })}
              onMouseUp={(e) => doClick(e, { x, y })}
            >
              <Letterbox state={getState({ x, y })} letter={letter} />
            </Box>
          ))}
        </Flex>
      ))}
      <Score words={solutions} />
    </Flex>
  );
};

const Letterbox: React.FC<React.PropsWithChildren<{ letter: string; state: State }>> = ({
  letter,
  state,
}) => {
  let border = "1px solid lightgray";
  let bg = "inherit";
  let color = "inherit";
  switch (state) {
    case State.Start:
      border = "3px solid yellow";
      bg = "lightgray";
      color = "black";
      break;
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

const Score: React.FC<React.PropsWithChildren<{ words: Word[]; last?: Word }>> = ({ words }) => {
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

function generatePuzzle(
  rows: number,
  cols: number,
  words: string[]
): { board: Board; solutions: Word[] } {
  words.sort((a, b) => b.length - a.length);
  let board: Board = new Array(rows)
    .fill(0)
    .map(() => new Array<string>(cols).fill("-"));
  let solutions = words.map((word) => {
    for (let tries = 0; tries < 30; ++tries) {
      const [x, y] = [random(0, cols - 1), random(0, rows - 1)];
      const possible = findDirections(word, rows, cols, { x, y }, board);
      if (possible.length === 0) continue;
      const from = { x, y };
      const to = possible[random(0, possible.length - 1)];
      fillWord(word, from, to, board);
      return { from, to, word, solved: false };
    }
    remove(words, word);
    return {
      from: { x: -1, y: -1 },
      to: { x: -1, y: -1 },
      word: "",
      solved: false,
    };
  });
  solutions = solutions.filter((s) => s.word !== "");

  board = board.map((row) =>
    row.map((letter) => (letter === "-" ? randLetter() : letter))
  );
  return { board, solutions };
}

function randLetter(): string {
  return String.fromCharCode(Math.floor(Math.random() * 25) + 65);
}

function findDirections(
  word: string,
  rows: number,
  cols: number,
  from: Point,
  board: Board
) {
  const dirs: Point[] = [];
  const len = word.length;
  const { x, y } = from;

  if (
    x + len <= cols &&
    y + len <= rows &&
    checkWord(word, from, { x: x + len - 1, y: y + len - 1 }, board)
  )
    dirs.push({ x: x + len - 1, y: y + len - 1 });
  if (
    x - len >= 0 &&
    y + len <= rows &&
    checkWord(word, from, { x: x - len + 1, y: y + len - 1 }, board)
  )
    dirs.push({ x: x - len + 1, y: y + len - 1 });
  if (
    x + len <= cols &&
    y - len >= 0 &&
    checkWord(word, from, { x: x + len - 1, y: y - len + 1 }, board)
  )
    dirs.push({ x: x + len - 1, y: y - len + 1 });
  if (
    x - len >= 0 &&
    y - len >= 0 &&
    checkWord(word, from, { x: x - len + 1, y: y - len + 1 }, board)
  )
    dirs.push({ x: x - len + 1, y: y - len + 1 });
  if (x + len <= cols && checkWord(word, from, { x: x + len - 1, y }, board))
    dirs.push({ x: x + len - 1, y });
  if (y + len <= rows && checkWord(word, from, { x: x, y: y + len - 1 }, board))
    dirs.push({ x: x, y: y + len - 1 });
  if (x - len >= 0 && checkWord(word, from, { x: x - len + 1, y }, board))
    dirs.push({ x: x - len + 1, y });
  if (y - len >= 0 && checkWord(word, from, { x: x, y: y - len + 1 }, board))
    dirs.push({ x: x, y: y - len + 1 });
  return dirs;
}

function checkWord(word: string, from: Point, to: Point, board: Board) {
  const len = word.length;
  for (let i = 0; i <= len; ++i) {
    const t = len == 0 ? 0 : i / len;
    const p = lerpPoint(from, to, t);
    const current = board[round(p.y)][round(p.x)];
    if (current !== "-" && current !== word[i]) return false;
  }
  return true;
}

function fillWord(word: string, from: Point, to: Point, board: Board) {
  const len = diagDistance(from, to);
  for (let i = 0; i <= len; ++i) {
    const t = len == 0 ? 0 : i / len;
    const p = lerpPoint(from, to, t);
    board[Math.round(p.y)][Math.round(p.x)] = word[i];
  }
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
