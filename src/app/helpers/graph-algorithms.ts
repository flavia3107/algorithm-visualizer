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
	const unvisited = grid.flat();
	const startNode = unvisited.find((n) => n.isStart);
	const targetNode = unvisited.find((n) => n.isTarget);

	if (!startNode || !targetNode) return steps;
	startNode.distance = 0;

	const pushStep = (type: VisualizationStep<GridNode[][]>['type'], description: string) =>
		steps.push({ type, data: cloneGrid(grid), description });

	pushStep('info', 'Grid initialized for Dijkstra Search.');

	while (unvisited.length > 0) {
		unvisited.sort((a, b) => a.distance - b.distance);
		const curr = unvisited.shift()!;

		if (curr.isWall) continue;
		if (curr.distance === Infinity) {
			pushStep('info', 'Target is unreachable.');
			return steps;
		}

		curr.isVisited = true;
		pushStep('visit', `Visited node at (${curr.row}, ${curr.col}).`);

		if (curr === targetNode) {
			for (let p: GridNode | null = curr; p; p = p.previousNode) {
				p.isPath = true;
			}
			pushStep('path-found', 'Shortest path found!');
			return steps;
		}

		const neighbors = [
			grid[curr.row - 1]?.[curr.col],
			grid[curr.row + 1]?.[curr.col],
			grid[curr.row]?.[curr.col - 1],
			grid[curr.row]?.[curr.col + 1],
		].filter((n): n is GridNode => Boolean(n && !n.isVisited && !n.isWall));

		for (const neighbor of neighbors) {
			const altDist = curr.distance + 1;
			if (altDist < neighbor.distance) {
				neighbor.distance = altDist;
				neighbor.previousNode = curr;
			}
		}
	}

	return steps;
}

export function generateBFSSteps(initialGrid: GridNode[][]): VisualizationStep<GridNode[][]>[] {
	const steps: VisualizationStep<GridNode[][]>[] = [];
	const grid = cloneGrid(initialGrid);
	let startNode: GridNode | null = null;
	let targetNode: GridNode | null = null;

	for (const row of grid) {
		for (const node of row) {
			if (node.isStart) startNode = node;
			if (node.isTarget) targetNode = node;
		}
	}

	if (!startNode || !targetNode) return steps;

	const pushStep = (type: VisualizationStep<GridNode[][]>['type'], description: string) =>
		steps.push({ type, data: cloneGrid(grid), description });

	pushStep('info', 'Grid initialized for Breadth-First Search.');

	const queue: GridNode[] = [];
	startNode.isVisited = true;
	queue.push(startNode);

	while (queue.length > 0) {
		const curr = queue.shift()!;

		pushStep('visit', `Visited node at (${curr.row}, ${curr.col}).`);
		if (curr === targetNode) {
			for (let p: GridNode | null = curr; p; p = p.previousNode) p.isPath = true;
			pushStep('path-found', 'Shortest path found!');
			return steps;
		}

		const neighbors = [
			grid[curr.row - 1]?.[curr.col],
			grid[curr.row + 1]?.[curr.col],
			grid[curr.row]?.[curr.col - 1],
			grid[curr.row]?.[curr.col + 1],
		].filter((n): n is GridNode => Boolean(n && !n.isVisited && !n.isWall));

		for (const neighbor of neighbors) {
			neighbor.isVisited = true;
			neighbor.previousNode = curr;
			queue.push(neighbor);
		}
	}

	pushStep('info', 'Target is unreachable.');
	return steps;
}