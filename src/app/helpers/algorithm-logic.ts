

import { VisualizationStep } from "../../configs/algorithm-config";
import { GridNode, generateDijkstraSteps, generateBFSSteps, generateDFSSteps, generateAStarSteps } from "./graph-algorithms";
import { generateBinarySearchSteps, generateLinearSearchSteps } from "./searching-algorithms";
import { generateBubbleSortSteps, generateMergeSortSteps, generateSelectionSortSteps } from "./sorting-algorithms";

export const ALGORITHM_MAP: Record<string, (data: any) => VisualizationStep[]> = {
	bubble_sort: (data: number[]) => generateBubbleSortSteps(data),
	selection_sort: (data: number[]) => generateSelectionSortSteps(data),
	merge_sort: (data: number[]) => generateMergeSortSteps(data),

	binary_search: (data: { list: number[]; target: number }) => generateBinarySearchSteps(data),
	linear_search: (data: { list: number[]; target: number }) => generateLinearSearchSteps(data),

	dijkstra: (grid: GridNode[][]) => generateDijkstraSteps(grid),
	breadth_first_search: (grid: GridNode[][]) => generateBFSSteps(grid),
	depth_first_search: (grid: GridNode[][]) => generateDFSSteps(grid),
	a_star: (grid: GridNode[][]) => generateAStarSteps(grid)
};

export function generateInitialDataFor(algoKey: string, size: number): any {
	if (['bubble_sort', 'selection_sort', 'merge_sort'].includes(algoKey)) {
		return Array.from({ length: size }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
	}

	if (['binary_search', 'linear_search'].includes(algoKey)) {
		const list = Array.from({ length: size }, (_, i) => (i + 1) * 2);
		return { list, target: list[Math.floor(Math.random() * list.length)] };
	}

	if (['dijkstra', 'breadth_first_search', 'depth_first_search', 'a_star'].includes(algoKey)) {
		return Array.from({ length: 10 }, (_, r) =>
			Array.from({ length: 25 }, (_, c) => {
				const isStart = r === 2 && c === 2, isTarget = r === 7 && c === 22;
				return {
					row: r, col: c, isStart, isTarget,
					isWall: !isStart && !isTarget && Math.random() < 0.2,
					isVisited: false, isPath: false, distance: Infinity, previousNode: null
				};
			})
		);
	}

	return [];
}