<script lang="ts">
	import { Cropper, Viewer } from '$lib/index';
	const containerClass = 'container';
	const aspectRatio = 1;
	let selectionId = 'cropper-selection';
	let toCanvasContainer: HTMLDivElement;
	let canvasActions: any;
	let selectionActions: any;
	let imageActions: any;
</script>

<h1>Svelte-CropperJs</h1>
<table>
	<tr>
		<td>
			<Cropper
				src="cat.png"
				{selectionId}
				{containerClass}
				bind:canvasActions
				bind:selectionActions
				bind:imageActions
			/>
		</td>
		<td>
			<Viewer {selectionId} />
			<div>
				<h2>Canvas actions</h2>
				<button
					on:click={async () => toCanvasContainer.replaceChildren(await canvasActions.toCanvas())}
					>toCanvas</button
				>
			</div>
			<div>
				<h2>Selection actions</h2>
				<button
					on:click={async () =>
						toCanvasContainer.replaceChildren(await selectionActions.toCanvas())}>toCanvas</button
				>
			</div>
			<div>
				<h2>Image actions</h2>
				<button on:click={() => imageActions.center()}>Center</button>
			</div>
		</td>
		<td><div bind:this={toCanvasContainer} class="canvas-container"></div></td>
	</tr>
</table>

<style>
	:global(.container cropper-canvas) {
		width: 48em;
		height: 48em;
	}
</style>
