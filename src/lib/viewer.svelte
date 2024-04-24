<script lang="ts">
	import { onMount } from 'svelte';
	import { setAttributes } from './helpers';

	export let selectionId: string = '';
	export let viewerAttributes = {
		resize: 'none',
		width: '200px',
		height: '200px'
	};

	const elements: Record<string, any> = {};

	onMount(async () => {
		const [CropperElement, CropperViewer] = (
			await Promise.all([import('@cropper/element'), import('@cropper/element-viewer')])
		).map((module) => module.default);
		CropperElement.$define();
		CropperViewer.$define();

		elements.viewer = new CropperViewer();
		setAttributes(elements.viewer, viewerAttributes);
		elements.viewer.setAttribute('selection', `#${selectionId}`);
		elements.viewerContainer.appendChild(elements.viewer);
	});
</script>

<div
	bind:this={elements.viewerContainer}
	style="width: {viewerAttributes.width}; height: {viewerAttributes.height}"
></div>
