

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