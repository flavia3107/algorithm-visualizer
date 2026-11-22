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

const cloneGrid = (grid: GridNode[][]): GridNode[][] =>
	grid.map((row) => row.map((node) => ({ ...node })));

const getManhattanDistance = (a: GridNode, b: GridNode): number =>
	Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

function getEndpoints(grid: GridNode[][]): { startNode: GridNode | null; targetNode: GridNode | null } {
	let startNode: GridNode | null = null;
	let targetNode: GridNode | null = null;
	for (const row of grid) {
		for (const node of row) {
			if (node.isStart) startNode = node;
			if (node.isTarget) targetNode = node;
		}
	}
	return { startNode, targetNode };
}

function getNeighbors(grid: GridNode[][], node: GridNode): GridNode[] {
	const { row, col } = node;
	return [
		grid[row - 1]?.[col],
		grid[row + 1]?.[col],
		grid[row]?.[col - 1],
		grid[row]?.[col + 1],
	].filter((n): n is GridNode => Boolean(n && !n.isVisited && !n.isWall));
}

function getNodeChain(node: GridNode | null): string[] {
	const chain: string[] = [];
	for (let p = node; p; p = p.previousNode) {
		chain.push(`${p.row + 1},${p.col + 1}`);
	}
	return chain.reverse();
}

function runSearchAlgorithm(
	initialGrid: GridNode[][],
	algoName: string,
	executeSearch: (ctx: {
		grid: GridNode[][];
		startNode: GridNode;
		targetNode: GridNode;
		pushStep: (
			type: VisualizationStep<GridNode[][]>['type'],
			desc: string,
			extra?: {
				queue?: string[];
				stack?: string[];
				priorityQueue?: { id: string; cost: number }[];
				currentNode?: GridNode | null;
			}
		) => void;
		markPath: (target: GridNode, msg?: string) => void;
	}) => void
): VisualizationStep<GridNode[][]>[] {
	const steps: VisualizationStep<GridNode[][]>[] = [];
	const grid = cloneGrid(initialGrid);
	const { startNode, targetNode } = getEndpoints(grid);

	if (!startNode || !targetNode) return steps;

	let latestSelectedNodes: string[] = [];

	const pushStep = (
		type: VisualizationStep<GridNode[][]>['type'],
		description: string,
		extra?: {
			queue?: string[];
			stack?: string[];
			priorityQueue?: { id: string; cost: number }[];
			currentNode?: GridNode | null;
		}
	) => {
		if (extra?.currentNode) {
			latestSelectedNodes = getNodeChain(extra.currentNode);
		}

		steps.push({
			type,
			data: cloneGrid(grid),
			description,
			queue: extra?.queue ?? [],
			stack: extra?.stack ?? [],
			priorityQueue: extra?.priorityQueue ?? [],
			selectedNodes: [...latestSelectedNodes],
		});
	};

	const markPath = (curr: GridNode, successMsg = 'Shortest path found!') => {
		for (let p: GridNode | null = curr; p; p = p.previousNode) {
			p.isPath = true;
		}
		latestSelectedNodes = getNodeChain(curr);
		pushStep('path-found', successMsg, { currentNode: curr });
	};

	pushStep('info', `Grid initialized for ${algoName}.`);
	executeSearch({ grid, startNode, targetNode, pushStep, markPath });

	if (steps[steps.length - 1]?.type !== 'path-found') {
		steps.push({
			type: 'info',
			data: cloneGrid(grid),
			description: 'Target is unreachable.',
			queue: [],
			stack: [],
			priorityQueue: [],
			selectedNodes: [...latestSelectedNodes],
		});
	}

	return steps;
}

export function generateDijkstraSteps(grid: GridNode[][]) {
	return runSearchAlgorithm(grid, 'Dijkstra Search', ({ grid, startNode, targetNode, pushStep, markPath }) => {
		startNode.distance = 0;
		const unvisited = grid.flat();

		while (unvisited.length > 0) {
			unvisited.sort((a, b) => a.distance - b.distance);
			const curr = unvisited.shift()!;

			if (curr.isWall) continue;
			if (curr.distance === Infinity) return;

			curr.isVisited = true;
			const pqSnapshot = unvisited
				.filter(n => !n.isVisited && n.distance !== Infinity)
				.map(n => ({ id: `${n.row},${n.col}`, cost: n.distance }));

			pushStep('visit', `Visited node at (${curr.row + 1}, ${curr.col + 1}).`, { priorityQueue: pqSnapshot, currentNode: curr });

			if (curr === targetNode) return markPath(curr);

			for (const neighbor of getNeighbors(grid, curr)) {
				const altDist = curr.distance + 1;
				if (altDist < neighbor.distance) {
					neighbor.distance = altDist;
					neighbor.previousNode = curr;
				}
			}
		}
	});
}

export function generateBFSSteps(grid: GridNode[][]) {
	return runSearchAlgorithm(grid, 'Breadth-First Search', ({ grid, startNode, targetNode, pushStep, markPath }) => {
		const queue: GridNode[] = [startNode];
		startNode.isVisited = true;

		while (queue.length > 0) {
			const curr = queue.shift()!;
			const queueSnapshot = queue.map(n => `${n.row},${n.col}`);

			pushStep('visit', `Visited node at (${curr.row + 1}, ${curr.col + 1}).`, { queue: queueSnapshot, currentNode: curr });

			if (curr === targetNode) return markPath(curr);

			for (const neighbor of getNeighbors(grid, curr)) {
				neighbor.isVisited = true;
				neighbor.previousNode = curr;
				queue.push(neighbor);
			}
		}
	});
}

export function generateDFSSteps(grid: GridNode[][]) {
	return runSearchAlgorithm(grid, 'Depth-First Search', ({ grid, startNode, targetNode, pushStep, markPath }) => {
		const stack: GridNode[] = [startNode];

		while (stack.length > 0) {
			const curr = stack.pop()!;
			if (curr.isVisited || curr.isWall) continue;

			curr.isVisited = true;
			const stackSnapshot = stack.map(n => `${n.row},${n.col}`);
			pushStep('visit', `Visited node at (${curr.row + 1}, ${curr.col + 1}).`, { stack: stackSnapshot, currentNode: curr });

			if (curr === targetNode) return markPath(curr, 'Path found (DFS does not guarantee shortest path)!');

			for (const neighbor of getNeighbors(grid, curr)) {
				neighbor.previousNode = curr;
				stack.push(neighbor);
			}
		}
	});
}

export function generateAStarSteps(grid: GridNode[][]) {
	return runSearchAlgorithm(grid, 'A* Search', ({ grid, startNode, targetNode, pushStep, markPath }) => {
		startNode.distance = 0;
		const openSet: GridNode[] = [startNode];

		while (openSet.length > 0) {
			openSet.sort((a, b) => {
				const fA = a.distance + getManhattanDistance(a, targetNode);
				const fB = b.distance + getManhattanDistance(b, targetNode);
				return fA === fB
					? getManhattanDistance(a, targetNode) - getManhattanDistance(b, targetNode)
					: fA - fB;
			});

			const curr = openSet.shift()!;
			if (curr.isWall) continue;
			if (curr.distance === Infinity) return;

			curr.isVisited = true;
			const pqSnapshot = openSet.map(n => ({ id: `${n.row},${n.col}`, cost: n.distance + getManhattanDistance(n, targetNode) }));

			pushStep('visit', `Visited node at (${curr.row + 1}, ${curr.col + 1}).`, {
				priorityQueue: pqSnapshot,
				currentNode: curr
			});

			if (curr === targetNode) return markPath(curr, 'Shortest path found using A*!');

			for (const neighbor of getNeighbors(grid, curr)) {
				const tentativeGScore = curr.distance + 1;
				if (tentativeGScore < neighbor.distance) {
					neighbor.distance = tentativeGScore;
					neighbor.previousNode = curr;
					if (!openSet.includes(neighbor)) openSet.push(neighbor);
				}
			}
		}
	});
}
