/**
 * Lazy Load Module
 * attribute  :: data attribute used to identify the app
 * loaderPath :: path to loader files
 * observer   :: selector of element to observe
 * root       :: element that is used as the viewport for checking visibility of the target
 * rootMargin :: margin around root. Values are similar to css property. Unit-less values not allowed
 * threshold  :: visible amount of item shown in relation to root
 */
/* eslint no-console: 0 */
export class LazyLoad {
  constructor(
    attribute  =  'module',
    loaderPath = './components/loaders/',
    observer,
    root = null,
    rootMargin = '0px',
    threshold = .25
  ) {
    // Module Options
    this.attribute = attribute;
    this.loaderPath = loaderPath;

    // Observer Element
    this.observerElement = document.querySelector(observer) || document.querySelector('body');

    // Observer Options
    this.intersectionOptions = {
      root,
      rootMargin,
      threshold
    };
    this.mutationOptions = {
      attributes: false,
      childList: true,
      subtree: true
    }
  }

  /**
   * Initializes Module
   */
  init() {
    // Gather all module elements by data attribute
    const modules = document.querySelectorAll(`[data-${this.attribute}]`);
    const [...scriptLoader] = modules;
    if (scriptLoader.length > 0) {
      // Intersection Observer
      this.intersectionObserver = new IntersectionObserver(this.intersectionObserverCallback.bind(this), this.intersectionOptions);

      // Observing all current modules
      scriptLoader.forEach(module => this.intersectionObserver.observe(module));

      // Mutation Observer (watching for submodules)
      this.mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this));
      this.mutationObserver.observe(this.observerElement, this.mutationOptions);
    }
  }

  /**
   * Mutation Observer callback
   * @param mutationList
   */
  mutationObserverCallback(mutationList) {
    for (const mutation of mutationList) {
      // Traverse through mutation to check for additional lazy loaded modules
      const [...submodules] = mutation.target.querySelectorAll(`[data-${this.attribute}]`);
      if (submodules.length > 0) {
        submodules.forEach(submodule => this.intersectionObserver.observe(submodule));
      }
    }
  }

  /**
   * Intersection Observer callback
   * @param entries
   * @param observer
   */
   intersectionObserverCallback(entries, observer) {
    if (entries.length > 0) {
      entries.forEach((entry, i) => {
        if (entry.intersectionRatio > 0 && entry.target?.dataset.loaded !== 'true') {
          // Unobserve element
          observer.unobserve(entry.target);

          // Set data-loaded attribute
          entry.target.setAttribute('data-loaded', 'true');

          // Load module and initialize it
          const module = entry.target.getAttribute(`data-${this.attribute}`);
          if (module) {
            import(`${this.loaderPath}${module}.js`)
              .then(loadedModule => {
                loadedModule.default(entry.target, entry.target.dataset);
              })
              .catch(err => {
                console.error('Lazy Load Module Error: ', err);
              });
          }
        }
      });
    }
  }
}

