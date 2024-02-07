class LazyLoading {

  constructor() {
    this.lazyLoadingImages = [];
    this.lazyLoadingIframes = [];
    this.lazyLoadingBackgrounds = [];
  }

  refresh()
  {
    document.querySelectorAll("*[data-lazy-load='image']").forEach((element) => {
      var rect = element.getBoundingClientRect();
      if(rect.top < (window.innerHeight + window.scrollY)) {
        this.lazyLoadingImages.push(element);
      }
    });
    document.querySelectorAll("*[data-lazy-load='iframe']").forEach((element) => {
      var rect = element.getBoundingClientRect();
      if(rect.top < (window.innerHeight + window.scrollY)) {
        this.lazyLoadingIframes.push(element);
      }
    });
    document.querySelectorAll("*[data-lazy-load='background']").forEach((element) => {
      var rect = element.getBoundingClientRect();
      if(rect.top < (window.innerHeight + window.scrollY)) {
        this.lazyLoadingBackgrounds.push(element);
      }
    });
    if(this.lazyLoadingImages.length > 0 || this.lazyLoadingIframes.length > 0 || this.lazyLoadingBackgrounds.length > 0)
    {
      this.execute();
    }
  }

  execute()
  {
    Debug.startGroup("Lazy loading");
    Debug.log("Images : Start");
    this.lazyLoadingImages.forEach((lazyImage) => {
      Debug.log(lazyImage);
      if(lazyImage.tagName === "PICTURE")
      {
        let image = lazyImage.querySelector("img");
        image.src = image.dataset.src;
        [].forEach.call(lazyImage.querySelectorAll("source"), (source) => {
          source.srcset = source.dataset.srcset;
        });
      }
      else
      {
        lazyImage.src = lazyImage.dataset.src;
      }
      this.lazyLoadingImages = this.lazyLoadingImages.filter((item) => {
        return item !== lazyImage;
      });
      lazyImage.removeAttribute("data-lazy-load");
    });
    Debug.log("Images : End");

    Debug.log("Iframes : Start");
    this.lazyLoadingIframes.forEach((lazyIframe) => {
      lazyIframe.innerHTML = lazyIframe.dataset.iframe;
      this.lazyLoadingIframes = this.lazyLoadingIframes.filter((item) => {
        return item !== iframe;
      });
    });
    Debug.log("Iframes : End");

    Debug.log("Backgrounds : Start");
    if ("IntersectionObserver" in window) {
      let lazyBackgroundObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            lazyBackgroundObserver.unobserve(entry.target);
          }
        });
      });
      this.lazyLoadingBackgrounds.forEach((lazyBackground) => {
        lazyBackgroundObserver.observe(lazyBackground);
        this.lazyLoadingBackgrounds = this.lazyLoadingBackgrounds.filter((item) => {
          return item !== lazyBackground;
        });
      });
    }
    Debug.log("Backgrounds : Stop");

    Debug.stopGroup("Lazy loading");
    Config.getScrollAnimate().refresh();
  }

}
export const lazyLoading = new LazyLoading();