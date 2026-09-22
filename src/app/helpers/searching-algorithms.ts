import { VisualizationStep } from "../../configs/algorithm-config";

export interface SearchInput {
	list: number[];
	target: number;
}

type StepPayload = Partial<VisualizationStep<SearchInput>>;

function runArraySearch(
	input: SearchInput,
	execute: (ctx: {
		list: number[]; target: number; pushStep: (type: VisualizationStep<SearchInput>['type'], description: string, extra?: StepPayload) => void;
		found: (index: number) => void;
	}
	) => void
): VisualizationStep<SearchInput>[] {
	const steps: VisualizationStep<SearchInput>[] = [];
	const { list, target } = input;
	const pushStep =
		(type: VisualizationStep<SearchInput>['type'], description: string, extra: StepPayload = {}) => steps.push({ type, data: { ...input }, description, ...extra, });
	const found = (index: number) => pushStep('path-found', `Target ${target} found at index ${index}!`, { completedIndices: [index] });

	pushStep('info', `Searching for target value: ${target}.`);
	execute({ list, target, pushStep, found });

	if (steps[steps.length - 1]?.type !== 'path-found') pushStep('info', `Target ${target} was not found in the array.`);
	return steps;
}

export function generateBinarySearchSteps(input: SearchInput): VisualizationStep<SearchInput>[] {
	return runArraySearch(input, ({ list, target, pushStep, found }) => {
		let low = 0;
		let high = list.length - 1;

		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			const val = list[mid];

			pushStep('compare', `Checking midpoint index ${mid} (${val}). Current bounds [${low}, ${high}].`, { activeIndices: [mid], highlightIndices: [low, high] });

			if (val === target) return found(mid);

			const isLessThan = val < target;
			if (isLessThan) low = mid + 1;
			else high = mid - 1;

			const dir = isLessThan ? 'right' : 'left';
			const op = isLessThan ? '<' : '>';
			pushStep('info', `${val} ${op} ${target}. Shrinking range to ${dir} half [${low}, ${high}].`, { highlightIndices: [low, high] });
		}
	});
}

export function generateLinearSearchSteps(input: SearchInput): VisualizationStep<SearchInput>[] {
	return runArraySearch(input, ({ list, target, pushStep, found }) => {
		for (let i = 0; i < list.length; i++) {
			pushStep('compare', `Checking index ${i} (${list[i]}).`, { activeIndices: [i] });
			if (list[i] === target) return found(i);
		}
	});
}