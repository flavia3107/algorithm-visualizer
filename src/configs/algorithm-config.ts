export type StepType = 'compare' | 'swap' | 'visit' | 'mark-sorted' | 'path-found' | 'info';

export interface VisualizationStep<T = any> {
	type: StepType;
	data: T;
	activeIndices?: number[];
	highlightIndices?: number[];
	completedIndices?: number[];
	description: string;
}

export type VisualizerCategory = 'sorting' | 'searching' | 'graph';

export interface AlgorithmMetadata {
	id: string;
	name: string;
	category: VisualizerCategory;
	timeComplexity: string;
	spaceComplexity: string;
	description: string;
}

export interface VisualizerStrategy<T = any> {
	readonly metadata: AlgorithmMetadata;
	generateInitialData(size?: number): T;
	buildSteps(initialData: T, target?: any): VisualizationStep<T>[];
}