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