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
	pseudocodeLines: PseudocodeLine[];
}

export interface PseudocodeLine {
	text: string;
	indent: number;
}


export const ALGORITHM_CONFIG: Record<string, AlgorithmDetail> = {
	'bubble_sort': {
		id: 'bubble_sort',
		name: 'Bubble Sort',
		category: 'sorting',
		visualizationType: 'array',
		summary: 'A simple comparison-based sorting algorithm that repeatedly steps through a list, comparing adjacent elements and swapping them if out of order.',
		timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
		spaceComplexity: 'O(1)',
		suitableFor: [
			'Educational demonstrations of basic sorting mechanics',
			'Nearly sorted small datasets',
			'Memory-constrained environments requiring stable in-place sorting'
		],
		pseudocodeLines: [
			{ text: 'function bubbleSort(arr):', indent: 0 },
			{ text: 'n = length(arr)', indent: 1 },
			{ text: 'for i from 0 to n - 1:', indent: 1 },
			{ text: 'swapped = false', indent: 2 },
			{ text: 'for j from 0 to n - i - 2:', indent: 2 },
			{ text: 'if arr[j] > arr[j + 1]:', indent: 3 },
			{ text: 'swap(arr[j], arr[j + 1])', indent: 4 },
			{ text: 'swapped = true', indent: 4 },
			{ text: 'if not swapped:', indent: 2 },
			{ text: 'break', indent: 3 },
			{ text: 'return arr', indent: 0 }
		],
		steps: [
			{ stepNumber: 1, title: 'Start Loop', description: 'Set current index to the start of the array.' },
			{ stepNumber: 2, title: 'Compare Neighbors', description: 'Compare the current element with the adjacent element on its right.' },
			{ stepNumber: 3, title: 'Swap if Needed', description: 'If the left element is larger than the right element, swap their positions.' },
			{ stepNumber: 4, title: 'Advance Pointer', description: 'Move to the next pair of elements and repeat until the end of the unsorted section.' },
			{ stepNumber: 5, title: 'Lock Element', description: 'Mark the last element of the pass as sorted, then decrease the unsorted boundary by 1.' }
		]
	},
	'selection_sort': {
		id: 'selection_sort',
		name: 'Selection Sort',
		category: 'sorting',
		visualizationType: 'array',
		summary: 'An in-place comparison sorting algorithm that repeatedly finds the smallest element in an unsorted region and appends it to the sorted region.',
		timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
		spaceComplexity: 'O(1)',
		suitableFor: [
			'Small datasets where swap operations are costly (minimizes total swaps to O(n))',
			'Systems with strict auxiliary memory constraints'
		],
		pseudocodeLines: [
			{ text: 'function selectionSort(arr):', indent: 0 },
			{ text: 'n = length(arr)', indent: 1 },
			{ text: 'for i from 0 to n - 2:', indent: 1 },
			{ text: 'minIndex = i', indent: 2 },
			{ text: 'for j from i + 1 to n - 1:', indent: 2 },
			{ text: 'if arr[j] < arr[minIndex]:', indent: 3 },
			{ text: 'minIndex = j', indent: 4 },
			{ text: 'if minIndex != i:', indent: 2 },
			{ text: 'swap(arr[i], arr[minIndex])', indent: 3 },
			{ text: 'return arr', indent: 0 }
		],
		steps: [
			{ stepNumber: 1, title: 'Set Minimum Pointer', description: 'Assume the first element of the unsorted subarray is the minimum.' },
			{ stepNumber: 2, title: 'Scan Unsorted Region', description: 'Iterate through the remaining unsorted elements to find the actual minimum value.' },
			{ stepNumber: 3, title: 'Update Minimum', description: 'If an element smaller than the current minimum is found, update the minimum index pointer.' },
			{ stepNumber: 4, title: 'Swap', description: 'Swap the smallest found element with the first element of the unsorted section.' },
			{ stepNumber: 5, title: 'Advance Boundary', description: 'Move the boundary between sorted and unsorted sections one step to the right.' }
		]
	},
	'merge_sort': {
		id: 'merge_sort',
		name: 'Merge Sort',
		category: 'sorting',
		visualizationType: 'array',
		summary: 'A divide-and-conquer algorithm that recursively splits an array into single-element subarrays and merges them back together in sorted order.',
		timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
		spaceComplexity: 'O(n)',
		suitableFor: [
			'Large datasets requiring guaranteed O(n log n) performance',
			'Linked list sorting (achieves O(1) extra space)',
			'Stable sorting requirements'
		],
		pseudocodeLines: [
			{ text: 'function mergeSort(arr):', indent: 0 },
			{ text: 'if length(arr) <= 1:', indent: 1 },
			{ text: 'return arr', indent: 2 },
			{ text: '', indent: 0 },
			{ text: 'mid = length(arr) / 2', indent: 1 },
			{ text: 'left = mergeSort(arr[0...mid-1])', indent: 1 },
			{ text: 'right = mergeSort(arr[mid...end])', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'return merge(left, right)', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'function merge(left, right):', indent: 0 },
			{ text: 'result = []', indent: 1 },
			{ text: 'i = 0, j = 0', indent: 1 },
			{ text: 'while i < length(left) and j < length(right):', indent: 1 },
			{ text: 'if left[i] <= right[j]:', indent: 2 },
			{ text: 'append left[i] to result', indent: 3 },
			{ text: 'i = i + 1', indent: 3 },
			{ text: 'else:', indent: 2 },
			{ text: 'append right[j] to result', indent: 3 },
			{ text: 'j = j + 1', indent: 3 },
			{ text: '', indent: 0 },
			{ text: 'append remaining elements of left and right to result', indent: 1 },
			{ text: 'return result', indent: 1 }
		],
		steps: [
			{ stepNumber: 1, title: 'Divide', description: 'Calculate the middle index and divide the array into left and right halves.' },
			{ stepNumber: 2, title: 'Recurse', description: 'Recursively split each subarray until single-element arrays remain.' },
			{ stepNumber: 3, title: 'Compare Subarrays', description: 'Compare the lead elements of two adjacent sorted subarrays.' },
			{ stepNumber: 4, title: 'Merge', description: 'Insert the smaller element into a temporary buffer and increment pointers.' },
			{ stepNumber: 5, title: 'Copy Back', description: 'Copy the combined, sorted temporary array back into the original array space.' }
		]
	},
	'linear_search': {
		id: 'linear_search',
		name: 'Linear Search',
		category: 'searching',
		visualizationType: 'array',
		summary: 'A sequential search method that inspects every element in a list one by one from start to finish until the target element is found or the end is reached.',
		timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
		spaceComplexity: 'O(1)',
		suitableFor: [
			'Unsorted arrays or lists',
			'Small datasets where overhead from sorting isn\'t justified',
			'Single-pass lookup in streams'
		],
		pseudocodeLines: [
			{ text: 'function linearSearch(arr, target):', indent: 0 },
			{ text: 'for i from 0 to length(arr) - 1:', indent: 1 },
			{ text: 'if arr[i] == target:', indent: 2 },
			{ text: 'return i', indent: 3 },
			{ text: 'return -1', indent: 0 }
		],
		steps: [
			{ stepNumber: 1, title: 'Initialize Pointer', description: 'Set index pointer to 0.' },
			{ stepNumber: 2, title: 'Inspect Element', description: 'Fetch value at current index and compare with target value.' },
			{ stepNumber: 3, title: 'Evaluate Match', description: 'If value matches target, return current index as result.' },
			{ stepNumber: 4, title: 'Increment Pointer', description: 'If value does not match, increment index pointer by 1.' },
			{ stepNumber: 5, title: 'Terminate', description: 'If end of array is reached without a match, return -1 (not found).' }
		]
	},
	'binary_search': {
		id: 'binary_search',
		name: 'Binary Search',
		category: 'searching',
		visualizationType: 'array',
		summary: 'An efficient search algorithm for sorted datasets that repeatedly divides the search interval in half by comparing the target value to the middle element.',
		timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
		spaceComplexity: 'O(1)',
		suitableFor: [
			'Large, pre-sorted arrays',
			'Frequent lookup operations on static databases'
		],
		pseudocodeLines: [
			{ text: 'function binarySearch(arr, target):', indent: 0 },
			{ text: 'left = 0', indent: 1 },
			{ text: 'right = length(arr) - 1', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'while left <= right:', indent: 1 },
			{ text: 'mid = floor((left + right) / 2)', indent: 2 },
			{ text: 'if arr[mid] == target:', indent: 2 },
			{ text: 'return mid', indent: 3 },
			{ text: 'else if arr[mid] < target:', indent: 2 },
			{ text: 'left = mid + 1', indent: 3 },
			{ text: 'else:', indent: 2 },
			{ text: 'right = mid - 1', indent: 3 },
			{ text: '', indent: 0 },
			{ text: 'return -1', indent: 0 }
		],
		steps: [
			{ stepNumber: 1, title: 'Set Boundaries', description: 'Start with the full array by marking the first and last items as your search area.' },
			{ stepNumber: 2, title: 'Find Midpoint', description: 'Find the middle item in the current search area.' },
			{ stepNumber: 3, title: 'Evaluate Midpoint', description: 'Check whether the middle item is the target you are looking for.' },
			{ stepNumber: 4, title: 'Narrow Interval', description: 'If the target is smaller, eliminate the right half. If it is larger, eliminate the left half.' },
			{ stepNumber: 5, title: 'Return Result', description: 'If you find the target, return its location. If the search area shrinks to nothing, report that it was not found.' }
		]
	},
	'breadth_first_search': {
		id: 'breadth_first_search',
		name: 'Breadth-First Search',
		category: 'graphs',
		visualizationType: 'graph',
		summary: 'A graph traversal algorithm that explores all neighbor nodes at the present depth level before moving on to nodes at the next depth level.',
		timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
		spaceComplexity: 'O(V)',
		suitableFor: [
			'Finding shortest paths in unweighted graphs',
			'Peer-to-peer network routing',
			'Web crawlers building site index levels'
		],
		pseudocodeLines: [
			{ text: 'function breadthFirstSearch(graph, startNode):', indent: 0 },
			{ text: 'create Queue q', indent: 1 },
			{ text: 'create set visited', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'q.enqueue(startNode)', indent: 1 },
			{ text: 'visited.add(startNode)', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'while q is not empty:', indent: 1 },
			{ text: 'node = q.dequeue()', indent: 2 },
			{ text: 'process(node)', indent: 2 },
			{ text: '', indent: 0 },
			{ text: 'for each neighbor of graph.getNeighbors(node):', indent: 2 },
			{ text: 'if neighbor not in visited:', indent: 3 },
			{ text: 'visited.add(neighbor)', indent: 4 },
			{ text: 'q.enqueue(neighbor)', indent: 4 }
		],
		steps: [
			{ stepNumber: 1, title: 'Initialize Queue', description: 'Enqueue start node and mark it as visited.' },
			{ stepNumber: 2, title: 'Dequeue Node', description: 'Remove front node from queue to process it.' },
			{ stepNumber: 3, title: 'Fetch Neighbors', description: 'Retrieve all unvisited adjacent neighbors of current node.' },
			{ stepNumber: 4, title: 'Mark & Enqueue', description: 'Mark unvisited neighbors as visited and append them to queue.' },
			{ stepNumber: 5, title: 'Loop / Complete', description: 'Repeat until queue is empty.' }
		]
	},
	'depth_first_search': {
		id: 'depth_first_search',
		name: 'Depth-First Search',
		category: 'graphs',
		visualizationType: 'graph',
		summary: 'A graph traversal algorithm that starts at a root node and explores as far as possible along each branch before backtracking.',
		timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
		spaceComplexity: 'O(V)',
		suitableFor: [
			'Topological sorting and dependency resolution',
			'Solving mazes or pathfinding with dead ends',
			'Detecting cycles in directed/undirected graphs'
		],
		pseudocodeLines: [
			{ text: 'function depthFirstSearch(graph, startNode):', indent: 0 },
			{ text: 'create Stack s', indent: 1 },
			{ text: 'create set visited', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 's.push(startNode)', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'while s is not empty:', indent: 1 },
			{ text: 'node = s.pop()', indent: 2 },
			{ text: '', indent: 0 },
			{ text: 'if node not in visited:', indent: 2 },
			{ text: 'visited.add(node)', indent: 3 },
			{ text: 'process(node)', indent: 3 },
			{ text: '', indent: 0 },
			{ text: 'for each neighbor of graph.getNeighbors(node):', indent: 3 },
			{ text: 'if neighbor not in visited:', indent: 4 },
			{ text: 's.push(neighbor)', indent: 5 }
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
		timeComplexity: { best: 'O((V + E) log V)', average: 'O((V + E) log V)', worst: 'O((V + E) log V)' },
		spaceComplexity: 'O(V)',
		suitableFor: [
			'GPS and digital map routing applications',
			'Network routing protocols (e.g., OSPF)',
			'Flight path optimization on non-negative weighted graphs'
		],
		pseudocodeLines: [
			{ text: 'function dijkstra(graph, startNode):', indent: 0 },
			{ text: 'create map distance', indent: 1 },
			{ text: 'create PriorityQueue pq', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'for each node in graph.nodes:', indent: 1 },
			{ text: 'distance[node] = infinity', indent: 2 },
			{ text: 'distance[startNode] = 0', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'pq.enqueue(startNode, priority=0)', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'while pq is not empty:', indent: 1 },
			{ text: 'current = pq.dequeueMin()', indent: 2 },
			{ text: '', indent: 0 },
			{ text: 'for each (neighbor, weight) of graph.getEdges(current):', indent: 2 },
			{ text: 'newDist = distance[current] + weight', indent: 3 },
			{ text: 'if newDist < distance[neighbor]:', indent: 3 },
			{ text: 'distance[neighbor] = newDist', indent: 4 },
			{ text: 'pq.insertOrUpdate(neighbor, priority=newDist)', indent: 4 },
			{ text: '', indent: 0 },
			{ text: 'return distance', indent: 0 }
		],
		steps: [
			{ stepNumber: 1, title: 'Initialize Distances', description: 'Set distance to start node to 0, and all other nodes to infinity. Add all nodes to min-priority queue.' },
			{ stepNumber: 2, title: 'Extract Minimum', description: 'Extract node with smallest tentative distance from priority queue.' },
			{ stepNumber: 3, title: 'Inspect Neighbors', description: 'For current node, consider all unvisited adjacent neighbors.' },
			{ stepNumber: 4, title: 'Relax Edges', description: 'Calculate total distance through current node. If smaller than neighbor\'s current recorded distance, update it.' },
			{ stepNumber: 5, title: 'Finalize Node', description: 'Mark node as processed/visited. Repeat until priority queue is empty or target reached.' }
		]
	},
	'a_star': {
		id: 'a_star',
		name: 'A* Search',
		category: 'graphs',
		visualizationType: 'graph',
		summary: 'This algorithm finds the shortest path to a goal by combining known distances with an estimated remaining cost to prioritize the best route.',
		timeComplexity: { best: 'O(E)', average: 'O(E)', worst: 'O(bᵈ)' },
		spaceComplexity: 'O(V)',
		suitableFor: [
			'Video game character pathfinding (tile maps, navmeshes)',
			'Robotics movement planning',
			'Real-time optimal route estimation with spatial heuristics'
		],
		pseudocodeLines: [
			{ text: 'function aStar(graph, startNode, goalNode, heuristic):', indent: 0 },
			{ text: 'create PriorityQueue openSet', indent: 1 },
			{ text: 'create map gScore', indent: 1 },
			{ text: 'create map fScore', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'for each node in graph.nodes:', indent: 1 },
			{ text: 'gScore[node] = infinity', indent: 2 },
			{ text: 'fScore[node] = infinity', indent: 2 },
			{ text: '', indent: 0 },
			{ text: 'gScore[startNode] = 0', indent: 1 },
			{ text: 'fScore[startNode] = heuristic(startNode, goalNode)', indent: 1 },
			{ text: 'openSet.enqueue(startNode, priority=fScore[startNode])', indent: 1 },
			{ text: '', indent: 0 },
			{ text: 'while openSet is not empty:', indent: 1 },
			{ text: 'current = openSet.dequeueMin()', indent: 2 },
			{ text: 'if current == goalNode:', indent: 2 },
			{ text: 'return reconstructPath(current)', indent: 3 },
			{ text: '', indent: 0 },
			{ text: 'for each (neighbor, weight) of graph.getEdges(current):', indent: 2 },
			{ text: 'tentativeG = gScore[current] + weight', indent: 3 },
			{ text: 'if tentativeG < gScore[neighbor]:', indent: 3 },
			{ text: 'gScore[neighbor] = tentativeG', indent: 4 },
			{ text: 'fScore[neighbor] = tentativeG + heuristic(neighbor, goalNode)', indent: 4 },
			{ text: 'if neighbor not in openSet:', indent: 4 },
			{ text: 'openSet.enqueue(neighbor, priority=fScore[neighbor])', indent: 5 },
			{ text: '', indent: 0 },
			{ text: 'return failure', indent: 0 }
		],
		steps: [
			{ stepNumber: 1, title: 'Initialize Node Scores', description: 'Set the starting point cost to zero and estimate the remaining distance to the destination.' },
			{ stepNumber: 2, title: 'Compute Priority', description: 'Combine the distance traveled so far with the estimated distance remaining, then add the starting point to the list of places to explore.' },
			{ stepNumber: 3, title: 'Pick Best Candidate', description: 'Choose the point from your exploration list that has the lowest total estimated distance.' },
			{ stepNumber: 4, title: 'Explore Neighbors', description: 'Look at all connected neighbors. If reaching a neighbor through the current point is faster than any previously found route, update its shortest path.' },
			{ stepNumber: 5, title: 'Finish Search', description: 'Mark the current point as fully checked. Stop once you reach the destination or run out of places to explore.' }
		]
	}
};