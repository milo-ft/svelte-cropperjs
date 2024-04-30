<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { setAttributes } from './helpers';

	export let selectionId: string = '';
	export let viewerAttributes = {
		resize: 'none',
		width: '200px',
		height: '200px'
	};

	const elements: Record<string, any> = {};
	const dispatch = createEventDispatcher();

	onMount(async () => {
		const [CropperElement, CropperViewer] = (
			await Promise.all([import('@cropper/element'), import('@cropper/element-viewer')])
		).map((module) => module.default);
		await new Promise((resolve) => setTimeout(resolve));
		CropperElement.$define();
		CropperViewer.$define();

		elements.viewer = new CropperViewer();
		setAttributes(elements.viewer, viewerAttributes);
		elements.viewer.setAttribute('selection', `#${selectionId}`);
		elements.viewerContainer.appendChild(elements.viewer);
		await new Promise((resolve) => setTimeout(resolve));
		dispatch('ready');
	});
</script>

<div
	bind:this={elements.viewerContainer}
	style="width: {viewerAttributes.width}; height: {viewerAttributes.height}"
></div>
