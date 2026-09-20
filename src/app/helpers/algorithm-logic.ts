

import { VisualizationStep } from "../../configs/algorithm-config";

export interface SearchInput {
	list: number[];
	target: number;
}

export interface GridNode {
	row: number;
	col: number;
	isStart: boolean;
	isTarget: boolean;
	isWall: boolean;
	isVisited: boolean;
	isPath: boolean;
	distance: number;
	previousNode: GridNode | null;
}

function cloneGrid(grid: GridNode[][]): GridNode[][] {
	return grid.map((row) => row.map((node) => ({ ...node })));
}

export function generateBubbleSortSteps(initialData: number[]): VisualizationStep<number[]>[] {
	const steps: VisualizationStep<number[]>[] = [];
	const arr = [...initialData];
	const n = arr.length;
	const completedIndices: number[] = [];

	steps.push({
		type: 'info',
		data: [...arr],
		description: 'Starting array state ready for Bubble Sort.',
	});

	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			steps.push({
				type: 'compare',
				data: [...arr],
				activeIndices: [j, j + 1],
				completedIndices: [...completedIndices],
				description: `Comparing index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]}).`,
			});

			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

				steps.push({
					type: 'swap',
					data: [...arr],
					highlightIndices: [j, j + 1],
					completedIndices: [...completedIndices],
					description: `Swapped elements at index ${j} and ${j + 1}.`,
				});
			}
		}
		completedIndices.push(n - 1 - i);
	}
	completedIndices.push(0);

	steps.push({
		type: 'mark-sorted',
		data: [...arr],
		completedIndices: [...completedIndices],
		description: 'Bubble Sort complete! Array is fully sorted.',
	});

	return steps;
}

export function generateSelectionSortSteps(initialData: number[]): VisualizationStep<number[]>[] {
	const steps: VisualizationStep<number[]>[] = [];
	const arr = [...initialData];
	const n = arr.length;
	const completedIndices: number[] = [];

	steps.push({
		type: 'info',
		data: [...arr],
		description: 'Starting array state ready for Selection Sort.',
	});

	for (let i = 0; i < n; i++) {
		let minIdx = i;

		for (let j = i + 1; j < n; j++) {
			steps.push({
				type: 'compare',
				data: [...arr],
				activeIndices: [j],
				highlightIndices: [minIdx],
				completedIndices: [...completedIndices],
				description: `Comparing index ${j} (${arr[j]}) with current min index ${minIdx} (${arr[minIdx]}).`,
			});

			if (arr[j] < arr[minIdx]) {
				minIdx = j;
			}
		}

		if (minIdx !== i) {
			[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

			steps.push({
				type: 'swap',
				data: [...arr],
				highlightIndices: [i, minIdx],
				completedIndices: [...completedIndices],
				description: `Swapped index ${i} with new minimum value at index ${minIdx}.`,
			});
		}

		completedIndices.push(i);
	}

	steps.push({
		type: 'mark-sorted',
		data: [...arr],
		completedIndices: [...completedIndices],
		description: 'Selection Sort complete!',
	});

	return steps;
}

export function generateBinarySearchSteps(input: SearchInput): VisualizationStep<SearchInput>[] {
	const steps: VisualizationStep<SearchInput>[] = [];
	const { list, target } = input;
	let low = 0;
	let high = list.length - 1;

	steps.push({
		type: 'info',
		data: { ...input },
		description: `Searching for target value: ${target}.`,
	});

	while (low <= high) {
		const mid = Math.floor((low + high) / 2);

		steps.push({
			type: 'compare',
			data: { ...input },
			activeIndices: [mid],
			highlightIndices: [low, high],
			description: `Checking midpoint index ${mid} (${list[mid]}). Current bounds [${low}, ${high}].`,
		});

		if (list[mid] === target) {
			steps.push({
				type: 'path-found',
				data: { ...input },
				completedIndices: [mid],
				description: `Target ${target} found at index ${mid}!`,
			});
			return steps;
		}

		if (list[mid] < target) {
			low = mid + 1;
			steps.push({
				type: 'info',
				data: { ...input },
				highlightIndices: [low, high],
				description: `${list[mid]} < ${target}. Shrinking range to right half [${low}, ${high}].`,
			});
		} else {
			high = mid - 1;
			steps.push({
				type: 'info',
				data: { ...input },
				highlightIndices: [low, high],
				description: `${list[mid]} > ${target}. Shrinking range to left half [${low}, ${high}].`,
			});
		}
	}

	steps.push({
		type: 'info',
		data: { ...input },
		description: `Target ${target} was not found in the array.`,
	});

	return steps;
}

export function generateDijkstraSteps(initialGrid: GridNode[][]): VisualizationStep<GridNode[][]>[] {
	const steps: VisualizationStep<GridNode[][]>[] = [];
	const grid = cloneGrid(initialGrid);

	let startNode: GridNode | null = null;
	let targetNode: GridNode | null = null;
	const unvisitedNodes: GridNode[] = [];

	// Initialize nodes
	for (const row of grid) {
		for (const node of row) {
			if (node.isStart) {
				node.distance = 0;
				startNode = node;
			}
			if (node.isTarget) {
				targetNode = node;
			}
			unvisitedNodes.push(node);
		}
	}

	if (!startNode || !targetNode) return steps;

	steps.push({
		type: 'info',
		data: cloneGrid(grid),
		description: 'Grid initialized for Dijkstra Search.',
	});

	while (unvisitedNodes.length > 0) {
		// Sort unvisited by distance
		unvisitedNodes.sort((a, b) => a.distance - b.distance);
		const closestNode = unvisitedNodes.shift()!;

		if (closestNode.isWall) continue;
		if (closestNode.distance === Infinity) {
			steps.push({
				type: 'info',
				data: cloneGrid(grid),
				description: 'Target is unreachable.',
			});
			return steps;
		}

		closestNode.isVisited = true;

		steps.push({
			type: 'visit',
			data: cloneGrid(grid),
			description: `Visited node at row ${closestNode.row}, col ${closestNode.col}.`,
		});

		if (closestNode === targetNode) {
			// Reconstruct shortest path
			let curr: GridNode | null = closestNode;
			while (curr) {
				curr.isPath = true;
				curr = curr.previousNode;
			}

			steps.push({
				type: 'path-found',
				data: cloneGrid(grid),
				description: 'Shortest path found!',
			});
			return steps;
		}

		// Update unvisited neighbors
		const neighbors: GridNode[] = [];
		const { row, col } = closestNode;
		if (row > 0) neighbors.push(grid[row - 1][col]);
		if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
		if (col > 0) neighbors.push(grid[row][col - 1]);
		if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

		for (const neighbor of neighbors) {
			if (!neighbor.isVisited && !neighbor.isWall) {
				const newDist = closestNode.distance + 1;
				if (newDist < neighbor.distance) {
					neighbor.distance = newDist;
					neighbor.previousNode = closestNode;
				}
			}
		}
	}

	return steps;
}

export const ALGORITHM_MAP: Record<string, (data: any) => VisualizationStep[]> = {
	bubble_sort: (data: number[]) => generateBubbleSortSteps(data),
	selection_sort: (data: number[]) => generateSelectionSortSteps(data),
	binary_search: (data: { list: number[]; target: number }) => generateBinarySearchSteps(data),
	dijkstra: (grid: GridNode[][]) => generateDijkstraSteps(grid),
	// add the rest of algorithms
};