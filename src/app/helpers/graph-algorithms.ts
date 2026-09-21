import { VisualizationStep } from "../../configs/algorithm-config";

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
