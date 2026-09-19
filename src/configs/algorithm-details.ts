export interface AlgorithmStep {
	stepNumber: number;
	title: string;
	description: string;
}

export interface AlgorithmDetail {
	id: string;
	name: string;
	category: 'sorting' | 'searching' | 'graphs';
	summary: string;
	timeComplexity: {
		best: string;
		average: string;
		worst: string;
	};
	spaceComplexity: string;
	steps: AlgorithmStep[];
	suitableFor: string[];
	visualizationType: 'array' | 'graph';
}

export const ALGORITHM_CONFIG: Record<string, AlgorithmDetail> = {
	// ==========================================
	// SORTING ALGORITHMS
	// ==========================================
	'bubble-sort': {
		id: 'bubble-sort',
		name: 'Bubble Sort',
		category: 'sorting',
		visualizationType: 'array',
		summary: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
		timeComplexity: {
			best: 'O(n)',
			average: 'O(n²)',
			worst: 'O(n²)'
		},
		spaceComplexity: 'O(1)',
		suitableFor: [
			'Educational demonstrations of basic sorting mechanics',
			'Nearly sorted small datasets',
			'Memory-constrained environments requiring stable in-place sorting'
		],
		steps: [
			{ stepNumber: 1, title: 'Start Loop', description: 'Set current index to the start of the array.' },
			{ stepNumber: 2, title: 'Compare Neighbors', description: 'Compare the current element with the adjacent element on its right.' },
			{ stepNumber: 3, title: 'Swap if Needed', description: 'If the left element is larger than the right element, swap their positions.' },
			{ stepNumber: 4, title: 'Advance Pointer', description: 'Move to the next pair of elements and repeat until the end of the unsorted section.' },
			{ stepNumber: 5, title: 'Lock Element', description: 'Mark the last element of the pass as sorted, then decrease the unsorted boundary by 1.' }
		]
	},

	'selection-sort': {
		id: 'selection-sort',
		name: 'Selection Sort',
		category: 'sorting',
		visualizationType: 'array',
		summary: 'An in-place comparison sorting algorithm that divides the array into sorted and unsorted regions, repeatedly finding the smallest element in the unsorted region and moving it to the sorted region.',
		timeComplexity: {
			best: 'O(n²)',
			average: 'O(n²)',
			worst: 'O(n²)'
		},
		spaceComplexity: 'O(1)',
		suitableFor: [
			'Small datasets where swap operations are costly (minimizes total swaps to O(n))',
			'Systems with strict auxiliary memory constraints'
		],
		steps: [
			{ stepNumber: 1, title: 'Set Minimum Pointer', description: 'Assume the first element of the unsorted subarray is the minimum.' },
			{ stepNumber: 2, title: 'Scan Unsorted Region', description: 'Iterate through the remaining unsorted elements to find the actual minimum value.' },
			{ stepNumber: 3, title: 'Update Minimum', description: 'If an element smaller than the current minimum is found, update the minimum index pointer.' },
			{ stepNumber: 4, title: 'Swap', description: 'Swap the smallest found element with the first element of the unsorted section.' },
			{ stepNumber: 5, title: 'Advance Boundary', description: 'Move the boundary between sorted and unsorted sections one step to the right.' }
		]
	},

	'merge-sort': {
		id: 'merge-sort',
		name: 'Merge Sort',
		category: 'sorting',
		visualizationType: 'array',
		summary: 'A divide-and-conquer algorithm that recursively breaks down an array into single-element subarrays, then merges those subarrays back together in sorted order.',
		timeComplexity: {
			best: 'O(n log n)',
			average: 'O(n log n)',
			worst: 'O(n log n)'
		},
		spaceComplexity: 'O(n)',
		suitableFor: [
			'Large datasets requiring guaranteed O(n log n) performance',
			'Linked list sorting (achieves O(1) extra space)',
			'Stable sorting requirements'
		],
		steps: [
			{ stepNumber: 1, title: 'Divide', description: 'Calculate the middle index and divide the array into left and right halves.' },
			{ stepNumber: 2, title: 'Recurse', description: 'Recursively split each subarray until single-element arrays remain.' },
			{ stepNumber: 3, title: 'Compare Subarrays', description: 'Compare the lead elements of two adjacent sorted subarrays.' },
			{ stepNumber: 4, title: 'Merge', description: 'Insert the smaller element into a temporary buffer and increment pointers.' },
			{ stepNumber: 5, title: 'Copy Back', description: 'Copy the combined, sorted temporary array back into the original array space.' }
		]
	},

	// ==========================================
	// SEARCHING ALGORITHMS
	// ==========================================
	'linear-search': {
		id: 'linear-search',
		name: 'Linear Search',
		category: 'searching',
		visualizationType: 'array',
		summary: 'A sequential search method that inspects every element in a list one by one from start to finish until the target element is found or the end is reached.',
		timeComplexity: {
			best: 'O(1)',
			average: 'O(n)',
			worst: 'O(n)'
		},
		spaceComplexity: 'O(1)',
		suitableFor: [
			'Unsorted arrays or lists',
			'Small datasets where overhead from sorting isn\'t justified',
			'Single-pass lookup in streams'
		],
		steps: [
			{ stepNumber: 1, title: 'Initialize Pointer', description: 'Set index pointer to 0.' },
			{ stepNumber: 2, title: 'Inspect Element', description: 'Fetch value at current index and compare with target value.' },
			{ stepNumber: 3, title: 'Evaluate Match', description: 'If value matches target, return current index as result.' },
			{ stepNumber: 4, title: 'Increment Pointer', description: 'If value does not match, increment index pointer by 1.' },
			{ stepNumber: 5, title: 'Terminate', description: 'If end of array is reached without a match, return -1 (not found).' }
		]
	},

	'binary-search': {
		id: 'binary-search',
		name: 'Binary Search',
		category: 'searching',
		visualizationType: 'array',
		summary: 'An efficient search algorithm for sorted datasets that repeatedly divides the search interval in half by comparing the target value to the middle element.',
		timeComplexity: {
			best: 'O(1)',
			average: 'O(log n)',
			worst: 'O(log n)'
		},
		spaceComplexity: 'O(1)',
		suitableFor: [
			'Large, pre-sorted arrays',
			'Frequent lookup operations on static databases'
		],
		steps: [
			{ stepNumber: 1, title: 'Set Boundaries', description: 'Initialize `left` pointer to 0 and `right` pointer to length - 1.' },
			{ stepNumber: 2, title: 'Find Midpoint', description: 'Calculate middle index: `mid = floor((left + right) / 2)`.' },
			{ stepNumber: 3, title: 'Evaluate Midpoint', description: 'Compare element at `mid` with target.' },
			{ stepNumber: 4, title: 'Narrow Interval', description: 'If target is smaller, set `right = mid - 1`. If target is larger, set `left = mid + 1`.' },
			{ stepNumber: 5, title: 'Return Match', description: 'If element at `mid` equals target, return index. If `left > right`, target is not present.' }
		]
	},

	// ==========================================
	// GRAPH ALGORITHMS
	// ==========================================
	'breadth-first-search': {
		id: 'breadth-first-search',
		name: 'Breadth-First Search',
		category: 'graphs',
		visualizationType: 'graph',
		summary: 'A graph traversal algorithm that explores all neighbor nodes at the present depth level before moving on to nodes at the next depth level.',
		timeComplexity: {
			best: 'O(V + E)',
			average: 'O(V + E)',
			worst: 'O(V + E)'
		},
		spaceComplexity: 'O(V)',
		suitableFor: [
			'Finding shortest paths in unweighted graphs',
			'Peer-to-peer network routing',
			'Web crawlers building site index levels'
		],
		steps: [
			{ stepNumber: 1, title: 'Initialize Queue', description: 'Enqueue start node and mark it as visited.' },
			{ stepNumber: 2, title: 'Dequeue Node', description: 'Remove front node from queue to process it.' },
			{ stepNumber: 3, title: 'Fetch Neighbors', description: 'Retrieve all unvisited adjacent neighbors of current node.' },
			{ stepNumber: 4, title: 'Mark & Enqueue', description: 'Mark unvisited neighbors as visited and append them to queue.' },
			{ stepNumber: 5, title: 'Loop / Complete', description: 'Repeat until queue is empty.' }
		]
	},

	'depth-first-search': {
		id: 'depth-first-search',
		name: 'Depth-First Search',
		category: 'graphs',
		visualizationType: 'graph',
		summary: 'A graph traversal algorithm that starts at a root/source node and explores as far as possible along each branch before backtracking.',
		timeComplexity: {
			best: 'O(V + E)',
			average: 'O(V + E)',
			worst: 'O(V + E)'
		},
		spaceComplexity: 'O(V)',
		suitableFor: [
			'Topological sorting and dependency resolution',
			'Solving mazes or pathfinding with dead ends',
			'Detecting cycles in directed/undirected graphs'
		],
		steps: [
			{ stepNumber: 1, title: 'Push Start Node', description: 'Push start node onto stack (or recursive call stack) and mark visited.' },
			{ stepNumber: 2, title: 'Pop Node', description: 'Pop top node from stack for processing.' },
			{ stepNumber: 3, title: 'Select Neighbor', description: 'Pick an adjacent unvisited neighbor of current node.' },
			{ stepNumber: 4, title: 'Explore Deeper', description: 'Mark neighbor as visited and push onto stack to explore immediate branch.' },
			{ stepNumber: 5, title: 'Backtrack', description: 'When no unvisited neighbors remain, backtrack to previous node on stack.' }
		]
	},

	'dijkstra': {
		id: 'dijkstra',
		name: "Dijkstra's Algorithm",
		category: 'graphs',
		visualizationType: 'graph',
		summary: 'An algorithm for finding the shortest paths between nodes in a weighted graph with non-negative edge weights using a greedy min-priority approach.',
		timeComplexity: {
			best: 'O((V + E) log V)',
			average: 'O((V + E) log V)',
			worst: 'O((V + E) log V)'
		},
		spaceComplexity: 'O(V)',
		suitableFor: [
			'GPS and digital map routing applications',
			'Network routing protocols (e.g., OSPF)',
			'Flight path optimization on non-negative weighted graphs'
		],
		steps: [
			{ stepNumber: 1, title: 'Initialize Distances', description: 'Set distance to start node to 0, and all other nodes to infinity. Add all nodes to min-priority queue.' },
			{ stepNumber: 2, title: 'Extract Minimum', description: 'Extract node with smallest tentative distance from priority queue.' },
			{ stepNumber: 3, title: 'Inspect Neighbors', description: 'For current node, consider all unvisited adjacent neighbors.' },
			{ stepNumber: 4, title: 'Relax Edges', description: 'Calculate total distance through current node. If smaller than neighbor\'s current recorded distance, update it.' },
			{ stepNumber: 5, title: 'Finalize Node', description: 'Mark node as processed/visited. Repeat until priority queue is empty or target reached.' }
		]
	},

	'a-star': {
		id: 'a-star',
		name: 'A* Search',
		category: 'graphs',
		visualizationType: 'graph',
		summary: 'A heuristic-driven pathfinding algorithm that extends Dijkstra by using an estimated distance function to direct search toward the target node efficiently.',
		timeComplexity: {
			best: 'O(E)',
			average: 'O(E)',
			worst: 'O(bᵈ)'
		},
		spaceComplexity: 'O(V)',
		suitableFor: [
			'Video game character pathfinding (tile maps, navmeshes)',
			'Robotics movement planning',
			'Real-time optimal route estimation with spatial heuristics'
		],
		steps: [
			{ stepNumber: 1, title: 'Initialize Node Scores', description: 'Set starting node score `g(n)=0` (exact path cost) and calculate heuristic `h(n)` (estimated remaining distance).' },
			{ stepNumber: 2, title: 'Compute f(n)', description: 'Calculate overall node priority `f(n) = g(n) + h(n)` and insert start node into open set.' },
			{ stepNumber: 3, title: 'Pop Lowest f(n)', description: 'Select node with lowest `f(n)` value from open set.' },
			{ stepNumber: 4, title: 'Evaluate & Relax Neighbors', description: 'Calculate tentative `g(n)` for adjacent neighbors. If lower than existing score, record new path and compute `f(n)`.' },
			{ stepNumber: 5, title: 'Terminate', description: 'Move evaluated node to closed set. Stop when target node is reached or open set is empty.' }
		]
	}
};