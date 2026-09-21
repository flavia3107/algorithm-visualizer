import { VisualizationStep } from "../../configs/algorithm-config";
import { SearchInput } from "./algorithm-logic";


export function generateBinarySearchSteps(input: SearchInput): VisualizationStep<SearchInput>[] {
	const steps: VisualizationStep<SearchInput>[] = [];
	const { list, target } = input;
	let low = 0;
	let high = list.length - 1;

	steps.push({
		type: 'info',
		data: { ...input },
		description: `Searching for target value: ${target}.`,
	});

	while (low <= high) {
		const mid = Math.floor((low + high) / 2);

		steps.push({
			type: 'compare',
			data: { ...input },
			activeIndices: [mid],
			highlightIndices: [low, high],
			description: `Checking midpoint index ${mid} (${list[mid]}). Current bounds [${low}, ${high}].`,
		});

		if (list[mid] === target) {
			steps.push({
				type: 'path-found',
				data: { ...input },
				completedIndices: [mid],
				description: `Target ${target} found at index ${mid}!`,
			});
			return steps;
		}

		if (list[mid] < target) {
			low = mid + 1;
			steps.push({
				type: 'info',
				data: { ...input },
				highlightIndices: [low, high],
				description: `${list[mid]} < ${target}. Shrinking range to right half [${low}, ${high}].`,
			});
		} else {
			high = mid - 1;
			steps.push({
				type: 'info',
				data: { ...input },
				highlightIndices: [low, high],
				description: `${list[mid]} > ${target}. Shrinking range to left half [${low}, ${high}].`,
			});
		}
	}

	steps.push({
		type: 'info',
		data: { ...input },
		description: `Target ${target} was not found in the array.`,
	});

	return steps;
}