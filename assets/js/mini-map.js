const styles = `
html {
  --blue-brighter: #e3f0f8;
  --blue-bright: #4ab9f8;
  --blue: #1c7cbb;
  --blue-dark: #1d5a88;
  --blue-darker: #0a1922;
  --green-bright: #39b97c;
  --green: #10967a;
  --green-dark: #09795c;
  --red-bright: #ff7d72;
  --red: #d73f34;
  --red-dark: #c52d22;
  --red-darker: #a50d02;
  --white: #fff;
  --grey-brighter: #f5fbff;
  --grey-bright: #e1e1e1;
  --grey: #767676;
  --grey-dark: #5a5a5a;
  --grey-darker: #394d5c;
  --grey-very-dark: #343434;
  --c-text: var(--grey-darker);
  --c-text-catchy: var(--blue-darker);
  --c-highlight: var(--blue-dark);
  --c-bg: var(--white);
  --soft-shadow-dark: 0px 0.5px 1.4px #0000001a,
    0px 1.3px 3.8px rgba(0, 0, 0, 0.125), 0px 3px 9px rgba(0, 0, 0, 0.135),
    0px 10px 30px rgba(0, 0, 0, 0.145);
  --soft-shadow-small: 0px 0.5px 1.4px rgba(0, 0, 0, 0.015),
    0px 1.3px 3.8px #00000005, 0px 3px 9px rgba(0, 0, 0, 0.025),
    0px 10px 30px rgba(0, 0, 0, 0.035);
  --soft-shadow-large: 0px 1.3px 1px -10px rgba(0, 0, 0, 0.031),
    0px 3.2px 2.5px -10px rgba(0, 0, 0, 0.044),
    0px 6px 4.6px -10px rgba(0, 0, 0, 0.055),
    0px 10.7px 8.3px -10px rgba(0, 0, 0, 0.066),
    0px 20.1px 15.5px -10px rgba(0, 0, 0, 0.079), 0px 48px 37px -10px #0000001c;
  --grid-outer-padding: 1rem;
  --gradient-blue: linear-gradient(220.55deg, #1d5a88, #1c7cbb);
  --grid-gap: 2.5em;
  --coding-font: consolas, monaco, "andale mono", "ubuntu mono", monospace;
  --scrollbar-bg: var(--c-bg);
  --scrollbar-thumb: var(--blue);
  accent-color: var(--blue);
  color: var(--c-text);
  font-family: -apple-system, blinkmacsystemfont, segoe ui, roboto, helvetica,
    arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
  font-size: 120%;
  font-weight: 400;
  line-height: 1.6;
  overflow-y: scroll;
}


mini-map {
  display: block;
  // position: absolute;
  position: fixed;
  top: 5em;
  right: 10em;
  height: calc(100% - 7em);
  padding: 4em 1em 1em;
}

mini-map .screen-image {
  border-radius: 0.5em;
  box-shadow: var(--soft-shadow-small);
  position: sticky;
  padding: 6px;
  top: 1em;
  bottom: 1em;
}

mini-map .pointer {
  // width: 1.5em;
  height: 1.5em;
  padding: 0.25em;
  border-radius: .375em;
  position: absolute;
  top: 8px;
  right: -.25em;
  left: -.25em;
  transform: translateY(0);
  border: 2px solid var(--blue);
  filter: drop-shadow(0 0 0.125rem #aaa);
}

mini-map .pointer svg {
  fill: white;
  display: block;
  width: 1em;
  height: 100%;
  background: var(--blue-bright);
}

mini-map .screen-image .canvas {
  background: white -moz-element(#map) no-repeat scroll center center / contain;
}

mini-map .screen-image svg {
  position: absolute;
  bottom: -1.25em;
  left: 97%;
  width: 1.75em;
  height: 1.75em;
  fill: var(--c-highlight);;
}

mini-map .screen-image .hint {
  position: absolute;
  bottom: -2.375em;
  left: -0.5em;
  font-size: 0.875em;
  width: max-content;
  text-decoration: none;
}
`;

class MiniMap extends HTMLElement {
  constructor() {
    super();

    this.elementCssIsSupported = CSS.supports(
      'background',
      'white -moz-element(#map)'
    );

    if (this.elementCssIsSupported) {
      const styleElem = document.createElement('style');
      styleElem.innerHTML = styles;
      document.head.appendChild(styleElem);
    }
  }

  removeMap() {
    return this.parentNode.removeChild(this);
  }

  connectedCallback() {
    if (!this.elementCssIsSupported) return this.removeMap();

    const mapContainer = document.getElementById('map');
    const {
      width: containerWidth,
      height: containerHeight,
      top: containerTop,
    } = mapContainer.getBoundingClientRect();

    const topScrollBorder = containerTop + window.scrollY;

    this.innerHTML = `
      <div class="screen-image">
        <div class="pointer"></div>
        <div class="canvas"></div>
        <svg aria-hidden="true">
            <use xlink:href="/assets/images/sprite.svg#icon-arrow-right-top"/>
        </svg>
        <a class="hand-written hint" href="https://www.stefanjudis.com/a-firefox-only-minimap/">Woah! What's this?</a>
      </div>
      `;

    const windowAspectRatio =
      window.visualViewport.height / window.visualViewport.width;
    const containerAspectRatio = containerHeight / containerWidth;

    const mapWidth = 90;
    const mapHeight = Math.floor(mapWidth * containerAspectRatio);
    const mq = window.matchMedia('(min-width: 70em)');

    const isNotEnoughSpace = mapHeight + 100 > window.innerHeight || !mq.matches;
    if (isNotEnoughSpace) return this.removeMap();

    mq.addEventListener(
      'change',
      () => {
        console.log('removing');
        if (!mq.matches) this.parentNode.removeChild(this);
      },
      { once: true }
    );

    const map = this.querySelector('.canvas');
    map.style.width = `${mapWidth}px`;
    map.style.height = `${mapHeight}px`;

    const pointer = this.querySelector('.pointer');
    const pointerHeight =
      (mapWidth + 2) *
      windowAspectRatio *
      (window.visualViewport.width / containerWidth);
    pointer.style.height = `${pointerHeight}px`;

    setPointerPosition(window.scrollY);

    window.addEventListener(
      'scroll',
      () => {
        setPointerPosition(window.scrollY);
      },
      {
        passive: true,
      }
    );

    function setPointerPosition(scrollY) {
      const pixelsScrolledIntoMain = window.scrollY - topScrollBorder;
      const scrolledIntoRatio = pixelsScrolledIntoMain / containerHeight;
      const transform = Math.floor(scrolledIntoRatio * mapHeight);

      if (scrolledIntoRatio > 0 && transform < mapHeight - pointerHeight + 16) {
        pointer.style.transform = `translateY(${transform}px)`;
      }
    }
  }
}

customElements.define('mini-map', MiniMap);
