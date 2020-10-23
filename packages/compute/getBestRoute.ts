import { copyGrid, isEmpty } from "@snk/types/grid";
import { pruneLayer } from "./pruneLayer";
import { cleanLayer } from "./cleanLayer";
import type { Snake } from "@snk/types/snake";
import type { Color, Grid } from "@snk/types/grid";

export const getBestRoute = (grid0: Grid, snake0: Snake) => {
  const grid = copyGrid(grid0);
  const colors = extractColors(grid0);
  const snakeN = snake0.length / 2;

  const chain: Snake[] = [snake0];

  for (const color of colors) {
    const gridN = copyGrid(grid);
    const chunk = pruneLayer(grid, color, snakeN);
    const c = cleanLayer(gridN, chain[0], chunk);
    if (c) chain.unshift(...c);
    else throw new Error("some cells are unreachable");
  }

  return chain.reverse().slice(1);
};

const extractColors = (grid: Grid): Color[] => {
  const colors = new Set<Color>();
  grid.data.forEach((c: any) => {
    if (!isEmpty(c)) colors.add(c);
  });
  return Array.from(colors.keys()).sort();
};
