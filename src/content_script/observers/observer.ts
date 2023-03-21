import select from 'select-dom'

const isElementObserved = (ele: HTMLElement) => ele.dataset.harvestObserved === 'true'

/**
 * MutationObserver
 * @param element valid DOMSelector string or HTMLElement
 * @param observerCallback MutationsObserver callback
 * @param options MutationsObserver options
 */
export const observeElement = (
  element: HTMLElement | string,
  observerCallback: MutationCallback,
  options: MutationObserverInit = { childList: true }
): MutationObserver => {
  const observer = new MutationObserver(observerCallback)
  const observeElement = element instanceof HTMLElement ? element : select(element)

  if (observeElement && !isElementObserved(observeElement)) {
    observer.observe(observeElement, options)
    observeElement.dataset.harvestObserved = 'true'
  }

  return observer
}

export default observeElement
