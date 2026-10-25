import { describe, expect, it } from 'vitest';
import { buildSudokuSteps, SUDOKU_INITIAL_GRID, useBacktrackingStore } from './backtrackingStore.js';
import { backtrackingLogic } from '../../components/visualizers/logicData/backtrackingLogic.js';
function valid(grid, givens, complete = false) {
  const units = [...grid, ...grid[0].map((_, c) => grid.map(row => row[c]))];
  for (let r = 0; r < 4; r += 2) for (let c = 0; c < 4; c += 2) units.push([grid[r][c], grid[r][c+1], grid[r+1][c], grid[r+1][c+1]]);
  for (const unit of units) {
    const filled = unit.filter(Boolean);
    expect(new Set(filled).size).toBe(filled.length);
    if (complete) expect([...filled].sort()).toEqual([1,2,3,4]);
  }
  givens.forEach((row,r) => row.forEach((n,c) => { if(n) expect(grid[r][c]).toBe(n); }));
}
describe('Sudoku teaching trace', () => {
  it('preserves clues and constraints at every step, changing at most one cell', () => {
    const original = SUDOKU_INITIAL_GRID.map(row => [...row]);
    const steps = buildSudokuSteps();
    steps.forEach((step, i) => {
      valid(step.grid, original, step.isMatch);
      if (i) expect(step.grid.flatMap((row,r) => row.map((n,c) => n !== steps[i-1].grid[r][c])).filter(Boolean).length).toBeLessThanOrEqual(1);
      if (step.conflictCell) {
        const [r,c] = step.conflictCell;
        expect(step.grid[r][c]).toBe(step.num);
        expect(r === step.row || c === step.col || (Math.floor(r/2) === Math.floor(step.row/2) && Math.floor(c/2) === Math.floor(step.col/2))).toBe(true);
      }
    });
    expect(steps.at(-1).isMatch).toBe(true);
    expect(SUDOKU_INITIAL_GRID).toEqual(original);
  });
  it('backtracks on the old unsolvable puzzle without changing clues or claiming success', () => {
    const input = SUDOKU_INITIAL_GRID.map(row => [...row]);
    input[3][3] = 3;
    const steps = buildSudokuSteps(input);
    expect(steps.at(-1).isMatch).toBe(false);
    expect(steps.at(-1).grid).toEqual(input);
    expect(steps.some(step => step.state.action === 'Backtrack')).toBe(true);
    steps.forEach(step => valid(step.grid, input));
  });
  it('keeps the canvas and Logic tab states and explanations in sync', () => {
    useBacktrackingStore.getState().setTrack('sudoku');
    const steps = useBacktrackingStore.getState().steps;
    const logic = backtrackingLogic['backtracking-sudoku'].steps;
    expect(logic).toHaveLength(steps.length);
    steps.forEach((step,i) => {
      expect(logic[i].grid).toEqual(step.grid);
      expect(logic[i].desc).toBe(step.desc);
      expect(logic[i].conflictCell).toEqual(step.conflictCell);
      expect(logic[i].activeLine).toBe(step.activeLine);
    });
    useBacktrackingStore.getState().setTrack('n-queens');
  });
});
