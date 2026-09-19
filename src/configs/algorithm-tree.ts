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
			key: 'binary_search',
			title: 'Binary Search',
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
			key: 'breadth-first-search',
			title: 'Breadth-First Search',
			icon: 'share'
		},
		{
			key: 'depth-first-search',
			title: 'Depth-First Search',
			icon: 'share',
			rotate: true
		},
		{
			key: 'a-star',
			title: 'A*',
			icon: 'hub'
		}
	]
};