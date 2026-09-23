import { VisualizationStep } from "../../configs/algorithm-config";

const range = (len: number, start = 0) => Array.from({ length: len }, (_, i) => start + i);

function createRunner(arr: number[], name: string) {
	const steps: VisualizationStep<number[]>[] = [{ type: 'info', data: [...arr], description: `Starting state for ${name}.` }];
	const step = (type: any, desc: string, extra: Partial<VisualizationStep<number[]>> = {}) =>
		steps.push({ type, data: [...arr], description: desc, ...extra });

	return {
		step,
		finish: (c: number[]) => (step('mark-sorted', `${name} complete!`, { completedIndices: c }), steps)
	};
}

export function generateBubbleSortSteps(initialData: number[]): VisualizationStep<number[]>[] {
	const arr = [...initialData], n = arr.length, c: number[] = [];
	const { step, finish } = createRunner(arr, 'Bubble Sort');

	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			step('compare', `Comparing index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]}).`, { activeIndices: [j, j + 1], completedIndices: [...c] });
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				step('swap', `Swapped index ${j} and ${j + 1}.`, { highlightIndices: [j, j + 1], completedIndices: [...c] });
			}
		}
		c.push(n - 1 - i);
	}
	return finish([...c, 0]);
}

export function generateSelectionSortSteps(initialData: number[]): VisualizationStep<number[]>[] {
	const arr = [...initialData], n = arr.length, c: number[] = [];
	const { step, finish } = createRunner(arr, 'Selection Sort');

	for (let i = 0; i < n; i++) {
		let min = i;
		for (let j = i + 1; j < n; j++) {
			step('compare', `Comparing index ${j} (${arr[j]}) with min index ${min} (${arr[min]}).`, { activeIndices: [j], highlightIndices: [min], completedIndices: [...c] });
			if (arr[j] < arr[min]) min = j;
		}
		if (min !== i) {
			[arr[i], arr[min]] = [arr[min], arr[i]];
			step('swap', `Swapped index ${i} with min value at index ${min}.`, { highlightIndices: [i, min], completedIndices: [...c] });
		}
		c.push(i);
	}
	return finish(c);
}

export function generateMergeSortSteps(initialData: number[]): VisualizationStep<number[]>[] {
	const arr = [...initialData];
	const { step, finish } = createRunner(arr, 'Merge Sort');

	function mergeSort(l: number, r: number) {
		if (l >= r) return;
		const m = (l + r) >> 1;
		step('compare', `Splitting range [${l}..${r}]`, { activeIndices: range(m - l + 1, l), highlightIndices: range(r - m, m + 1) });
		mergeSort(l, m);
		mergeSort(m + 1, r);

		const left = arr.slice(l, m + 1), right = arr.slice(m + 1, r + 1);
		let i = 0, j = 0, k = l;

		step('info', `Merging ranges [${l}..${m}] and [${m + 1}..${r}]`, { highlightIndices: range(r - l + 1, l) });

		while (i < left.length || j < right.length) {
			if (j >= right.length || (i < left.length && left[i] <= right[j])) {
				arr[k] = left[i++];
			} else {
				arr[k] = right[j++];
			}
			step('swap', `Placed ${arr[k]} at position ${k}.`, { highlightIndices: [k++] });
		}
	}

	mergeSort(0, arr.length - 1);
	return finish(range(arr.length));
}