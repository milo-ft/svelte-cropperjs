const mappings: Record<string, string> = {
  scaleStep: 'scale-step',
  themeColor: 'theme-color',
  aspectRatio: 'aspect-ratio',
  initialAspectRatio: 'initial-aspect-ratio',
  initialCoverage: 'initial-coverage'
};

export function setAttributes(element: HTMLElement, attributes: Record<string, any>) {
  for (const key in attributes)
    element.setAttribute(mappings[key] ?? key, attributes[key]);
}
