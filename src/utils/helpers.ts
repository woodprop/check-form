export function createHTMLElement(tag: string, className?: string) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
}