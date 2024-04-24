<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { setAttributes } from './helpers';

	export let containerClass = 'container';
	export let src = '';
	export let alt = '';
	export let selectionId = 'cropper-selection';

	const dispatch = createEventDispatcher();

	export let canvasAttributes = {
		background: true,
		disabled: false,
		scaleStep: 0.1,
		themeColor: '#3399ff'
	};

	export let imageAttributes = {
		rotatable: true,
		scalable: true,
		skewable: true,
		translatable: true
	};

	export let shadeAttributes = {
		themeColor: 'rgba(0, 0, 0, 0.65)'
	};

	export let handleAttributes = {
		themeColor: '#39f'
	};

	export let handleSelectAttributes = {
		plain: true,
		themeColor: 'rgba(51, 153, 255, 0.5)'
	};

	export let handleMoveAttributes = {
		themeColor: 'rgba(255, 255, 255, 0.1)'
	};

	export let selectionAttributes = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		aspectRatio: 1,
		initialAspectRatio: 1,
		initialCoverage: 0.8,
		movable: true,
		resizable: true,
		zoomable: true,
		multiple: false,
		keyboard: true,
		outlined: true,
		themeColor: 'rgba(255, 255, 255, 0.6)'
	};

	export let gridAttributes = {
		rows: 3,
		columns: 3,
		bordered: true,
		covered: true,
		themeColor: 'rgba(238, 238, 238, 0.5)'
	};

	export let crossHairAttributes = {
		centered: true,
		themeColor: 'rgba(238, 238, 238, 0.5)'
	};

	export const canvasActions = {
		toCanvas(opts: any) {
			return elements.canvas.$toCanvas(opts);
		}
	};

	export const selectionActions = {
		center() {
			return elements.selection.$center();
		},
		move(x: number, y?: number) {
			return elements.selection.$move(x, y ?? x);
		},
		moveTo(x: number, y?: number) {
			return elements.selection.$moveTo(x, y ?? x);
		},
		resize(action: string, offsetX: number, offsetY: number, aspectRatio?: number) {
			if (aspectRatio === undefined) {
				return elements.selection.$resize(action, offsetX, offsetY);
			}
			return elements.selection.$resize(action, offsetX, offsetY, aspectRatio);
		},
		zoom(ratio: number, pivot?: { x: number; y: number }) {
			if (pivot !== undefined) {
				return elements.selection.$zoom(ratio, pivot);
			}
			return elements.selection.$zoom(ratio);
		},
		change(opts: { x: number; y: number; width?: number; height?: number; aspectRatio?: number }) {
			if (opts.aspectRatio !== undefined && opts.width !== undefined && opts.height !== undefined)
				return elements.selection.$change(
					opts.x,
					opts.y,
					opts.width,
					opts.height,
					opts.aspectRatio
				);
			else if (opts.width !== undefined && opts.height !== undefined)
				return elements.selection.$change(opts.x, opts.y, opts.width, opts.height);
			else return elements.selection.$change(opts.x, opts.y);
		},
		clear() {
			return elements.selection.$clear();
		},
		reset() {
			return elements.selection.$reset();
		},
		render() {
			return elements.selection.$render();
		},
		toCanvas() {
			return elements.selection.$toCanvas();
		}
	};

	export const imageActions = {
		ready(callback: () => void) {
			return elements.image.$ready(callback);
		},
		center(size?: 'contain' | 'cover') {
			if (size !== undefined) return elements.image.$center(size);
			return elements.image.$center();
		},
		move(x: number, y?: number) {
			return elements.image.$move(x, y ?? x);
		},
		moveTo(x: number, y?: number) {
			return elements.image.$moveTo(x, y ?? x);
		},
		rotate(angle: number | string, pivot?: { x: number; y: number }) {
			if (pivot !== undefined) return elements.image.$rotate(angle, pivot.x, pivot.y);
			return elements.image.$rotate(angle);
		},
		zoom(ratio: number, pivot?: { x: number; y: number }) {
			if (pivot !== undefined) return elements.image.$zoom(ratio, pivot.x, pivot.y);
			return elements.image.$zoom(ratio);
		},
		scale(x: number, y?: number) {
			return elements.image.$scale(x, y ?? x);
		},
		skew(x: number | string, y?: number | string) {
			return elements.image.$skew(x, y ?? x);
		},
		translate(x: number, y?: number) {
			return elements.image.$translate(x, y ?? x);
		},
		transform(a: number, b: number, c: number, d: number, e: number, f: number) {
			return elements.image.$transform(a, b, c, d, e, f);
		},
		setTransform(a: number, b: number, c: number, d: number, e: number, f: number) {
			return elements.image.$setTransform(a, b, c, d, e, f);
		},
		setTransformMatrix(a: Array<number>) {
			return elements.image.$setTransform(a);
		},
		getTransform() {
			return elements.image.$getTransform();
		},
		resetTransform() {
			return elements.image.$resetTransform();
		}
	};

	const elements: Record<string, any> = {};

	let handleActions = [
		'n-resize',
		'e-resize',
		's-resize',
		'w-resize',
		'ne-resize',
		'nw-resize',
		'se-resize',
		'sw-resize'
	];

	onMount(async () => {
		const [
			CropperElement,
			CropperCanvas,
			CropperImage,
			CropperShade,
			CropperHandle,
			CropperSelection,
			CropperGrid,
			CropperCrosshair
		] = (
			await Promise.all([
				import('@cropper/element'),
				import('@cropper/element-canvas'),
				import('@cropper/element-image'),
				import('@cropper/element-shade'),
				import('@cropper/element-handle'),
				import('@cropper/element-selection'),
				import('@cropper/element-grid'),
				import('@cropper/element-crosshair')
			])
		).map((module) => module.default);
		CropperElement.$define();
		CropperCanvas.$define();
		CropperImage.$define();
		CropperShade.$define();
		CropperHandle.$define();
		CropperSelection.$define();
		CropperGrid.$define();
		CropperCrosshair.$define();

		elements.canvas = new CropperCanvas();
		setAttributes(elements.canvas, canvasAttributes);
		elements.canvas.addEventListener('action', dispatchEvent('action'));
		elements.canvas.addEventListener('actionstart', dispatchEvent('actionstart'));
		elements.canvas.addEventListener('actionmove', dispatchEvent('actionmove'));
		elements.canvas.addEventListener('actionend', dispatchEvent('actionend'));
		elements.container.appendChild(elements.canvas);

		elements.image = new CropperImage();
		elements.image.setAttribute('src', src);
		elements.image.setAttribute('alt', alt);
		setAttributes(elements.image, imageAttributes);
		elements.image.addEventListener('transform', dispatchEvent('transform'));
		elements.canvas.appendChild(elements.image);

		elements.shade = new CropperShade();
		setAttributes(elements.shade, shadeAttributes);
		elements.canvas.appendChild(elements.shade);

		elements.selectHandle = new CropperHandle();
		setAttributes(elements.selectHandle, handleSelectAttributes);
		elements.selectHandle.setAttribute('action', 'select');
		elements.canvas.appendChild(elements.selectHandle);

		elements.selection = new CropperSelection();
		setAttributes(elements.selection, selectionAttributes);
		elements.selection.setAttribute('id', selectionId);
		elements.selection.addEventListener('change', dispatchEvent('change'));
		elements.selection.addEventListener('change', updateShade);
		elements.canvas.appendChild(elements.selection);

		elements.grid = new CropperGrid();
		setAttributes(elements.grid, gridAttributes);
		elements.selection.appendChild(elements.grid);

		elements.crossHair = new CropperCrosshair();
		setAttributes(elements.crossHair, crossHairAttributes);
		elements.selection.appendChild(elements.crossHair);

		elements.handleMove = new CropperHandle();
		setAttributes(elements.handleMove, handleMoveAttributes);
		elements.handleMove.setAttribute('action', 'move');
		elements.selection.appendChild(elements.handleMove);

		for (const action of handleActions) {
			const key = `handle${action}`;
			elements[key] = new CropperHandle();
			setAttributes(elements[key], handleAttributes);
			elements[key].setAttribute('action', action);
			elements.selection.appendChild(elements[key]);
		}
	});

	function dispatchEvent(type: string) {
		return function (event: any) {
			dispatch(type, event);
		};
	}

	function updateShade(event: any) {
		const { x, y, width, height } = event.detail;
		elements.shade.$change(x, y, width, height);
	}
</script>

<div bind:this={elements.container} class="cropper-container {containerClass}"></div>
