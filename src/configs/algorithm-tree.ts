export interface AlgorithmItem {
	key: string;
	title: string;
	icon: string;
	rotate?: boolean;
}

export const ALGORITHM_TREE: { [key: string]: AlgorithmItem[] } = {
	sorting: [
		{
			key: 'bubble_sort',
			title: 'Bubble Sort',
			icon: 'compare_arrows'
		},
		{
			key: 'selection_sort',
			title: 'Selection Sort',
			icon: 'swap_vert'
		},
		{
			key: 'merge_sort',
			title: 'Merge Sort',
			icon: 'merge'
		}
	],
	searching: [
		{
			key: 'binnary_search',
			title: 'Binnary Search',
			icon: 'search'
		},
		{
			key: 'linear_search',
			title: 'Linear Search',
			icon: 'search'
		}
	],
	graphs: [
		{
			key: 'dijkstra',
			title: 'Dijkstra\'s Algorithm',
			icon: 'share'
		},
		{
			key: 'bfs',
			title: 'Breadth-First Search',
			icon: 'share'
		},
		{
			key: 'dfs',
			title: 'Depth-First Search',
			icon: 'share',
			rotate: true
		},
		{
			key: 'a*',
			title: 'A*',
			icon: 'hub'
		}
	]
};