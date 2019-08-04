import ScrollBooster from 'scrollbooster';

const getDevice = () => {
  const ua = navigator.userAgent;
  const iphone = ua.indexOf('iPhone') > 0;
  const ipod = ua.indexOf('iPod') > 0;
  const androidSp = ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0;
  const ipad = ua.indexOf('iPad') > 0;
  const androidT = ua.indexOf('Android') > 0;

  let device = 'other';
  if (iphone || ipod || androidSp) {
    device = 'smartphone';
  } else if (ipad || androidT) {
    device = 'tablet';
  }
  return device;
};

const isTouchDisplay = () => getDevice() !== 'other';

const viewportPipeline = document.querySelectorAll('.scrollbooster-viewport-pipeline');
const contentPipeline = document.querySelectorAll('.scrollbooster-viewport-content-pipeline');
const viewportPipelineOther = document.querySelectorAll('.scrollbooster-viewport-pipeline-other');
const contentPipelineOther = document.querySelectorAll('.scrollbooster-viewport-content-pipeline-other');
const viewportPipelineOtherEn = document.querySelectorAll('.scrollbooster-viewport-pipeline-other-en');
const contentPipelineOtherEn = document.querySelectorAll('.scrollbooster-viewport-content-pipeline-other-en');
const viewportContractOther = document.querySelectorAll('.scrollbooster-viewport-contract-other');
const contentContractOther = document.querySelectorAll('.scrollbooster-viewport-content-contract-other');
const viewportUniversity = document.querySelectorAll('.scrollbooster-viewport-university');
const contentUniversity = document.querySelectorAll('.scrollbooster-viewport-content-university');

const scrollTarget = [
  {
    width: 1495, viewport: viewportPipeline, content: contentPipeline, scrollBooster: [], isScrollBooster: false,
  },
  {
    width: 585, viewport: viewportPipelineOther, content: contentPipelineOther, scrollBooster: [], isScrollBooster: false,
  },
  {
    width: 615, viewport: viewportPipelineOtherEn, content: contentPipelineOtherEn, scrollBooster: [], isScrollBooster: false,
  },
  {
    width: 832, viewport: viewportContractOther, content: contentContractOther, scrollBooster: [], isScrollBooster: false,
  },
  {
    width: 975, viewport: viewportUniversity, content: contentUniversity, scrollBooster: [], isScrollBooster: false,
  },
];

function windowResize() {
  scrollTarget.forEach((target, targetIndex) => {
    if (window.innerWidth > target.width && target.isScrollBooster) {
      Array.from(target.viewport).forEach(() => {
        target.scrollBooster.pop().destroy();
      });
      scrollTarget[targetIndex].isScrollBooster = false;
    } else if (window.innerWidth <= target.width && !target.isScrollBooster) {
      Array.from(target.viewport).forEach((val, index) => {
        target.scrollBooster.push(new ScrollBooster({
          viewport: scrollTarget[targetIndex].viewport[index],
          content: scrollTarget[targetIndex].content[index],
          bounce: true,
          textSelection: !isTouchDisplay(),
          emulateScroll: false,
          mode: 'x',
          onUpdate: (data) => {
            scrollTarget[targetIndex].content[index].style.transform = `translate(${-data.position.x}px)`;
          },
          onClick: (data, event) => {
            if (event.target.classList.contains('link')) {
              event.preventDefault();
            }
          },
        }));
      });
      scrollTarget[targetIndex].isScrollBooster = true;
    }
  });
}

windowResize();

window.onresize = windowResize;
