import { VisualizationStep } from "../../configs/algorithm-config";

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

export function generateMergeSortSteps(initialData: number[]): VisualizationStep<number[]>[] {
	const steps: VisualizationStep<number[]>[] = [];
	const arr = [...initialData];

	steps.push({
		type: 'info',
		data: [...arr],
		description: 'Starting array state ready for Merge Sort.',
	});

	function mergeSort(left: number, right: number) {
		if (left >= right) return;

		const mid = Math.floor((left + right) / 2);

		// Highlight split ranges
		steps.push({
			type: 'compare',
			data: [...arr],
			activeIndices: Array.from({ length: mid - left + 1 }, (_, k) => left + k),
			highlightIndices: Array.from({ length: right - mid }, (_, k) => mid + 1 + k),
			description: `Splitting range [${left}..${right}] into left sub-array [${left}..${mid}] and right sub-array [${mid + 1}..${right}].`,
		});

		// Recursively divide
		mergeSort(left, mid);
		mergeSort(mid + 1, right);

		// Merge phase
		merge(left, mid, right);
	}

	function merge(left: number, mid: number, right: number) {
		const leftArr = arr.slice(left, mid + 1);
		const rightArr = arr.slice(mid + 1, right + 1);

		let i = 0;
		let j = 0;
		let k = left;

		steps.push({
			type: 'info',
			data: [...arr],
			highlightIndices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
			description: `Merging sorted sub-arrays [${left}..${mid}] and [${mid + 1}..${right}].`,
		});

		while (i < leftArr.length && j < rightArr.length) {
			const leftIdx = left + i;
			const rightIdx = mid + 1 + j;

			steps.push({
				type: 'compare',
				data: [...arr],
				activeIndices: [leftIdx],
				highlightIndices: [rightIdx],
				description: `Comparing elements from left sub-array (${leftArr[i]}) and right sub-array (${rightArr[j]}).`,
			});

			if (leftArr[i] <= rightArr[j]) {
				arr[k] = leftArr[i];
				i++;
			} else {
				arr[k] = rightArr[j];
				j++;
			}

			steps.push({
				type: 'swap',
				data: [...arr],
				highlightIndices: [k],
				description: `Placed ${arr[k]} into position ${k}.`,
			});

			k++;
		}

		// Copy remaining elements of leftArr, if any
		while (i < leftArr.length) {
			arr[k] = leftArr[i];

			steps.push({
				type: 'swap',
				data: [...arr],
				highlightIndices: [k],
				description: `Placed remaining left sub-array element ${arr[k]} into position ${k}.`,
			});

			i++;
			k++;
		}

		// Copy remaining elements of rightArr, if any
		while (j < rightArr.length) {
			arr[k] = rightArr[j];

			steps.push({
				type: 'swap',
				data: [...arr],
				highlightIndices: [k],
				description: `Placed remaining right sub-array element ${arr[k]} into position ${k}.`,
			});

			j++;
			k++;
		}
	}

	mergeSort(0, arr.length - 1);

	const completedIndices = arr.map((_, idx) => idx);

	steps.push({
		type: 'mark-sorted',
		data: [...arr],
		completedIndices,
		description: 'Merge Sort complete!',
	});

	return steps;
}