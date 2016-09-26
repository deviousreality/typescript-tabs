interface NavTabOptions {
  activeIndex?: number,
  containerClass?: string,
  contentClass?: string,
  contentItemClass?: string
  navigationClass?: string,
  navigationItemClass?: string,
  navigationItemClickClass? : string
}

module UI {

    class tabObject {
        public navigationContainerClass: string = '.m-nav-tabs';
        public navigationItemClass: string = '.m-nav-item';
        public navigationItemClickClass: string = '.m-nav-itemlink';
        public contentClass: string = '.m-tab-content';
        public contentItemClass: string = '.m-tab-pane';
        public activeClass: string = '.is-active';
        
        private hideClass: string = '.u-hide';
        private showClass: string = '.u-show';

        private 

        private element: Element;
        private activeIndex: number = 0;
        private navigationArray: NodeListOf<Element>;
        private contentArray: NodeListOf<Element>;

        constructor(element: Element, options?: NavTabOptions) {
            this.setOptions(options);
            this.element = element;
            this.navigationArray = this.element.querySelectorAll(this.navigationItemClass);
            this.contentArray = this.element.querySelectorAll(this.contentItemClass);

            for (let i = 0; i < this.navigationArray.length; i++) {
                let link = this.navigationArray[i].querySelector(this.navigationItemClickClass);
                this.handleClick(link, i);
            }
            this.showTab(this.activeIndex);
        }

        public getInstance() {
            return this.element;
        }

        public gotoTab(index: number) {
            this.showTab(index);
        }

        public removeTabs() {
            let active = this.activeClass.indexOf(".") !== -1 ? this.activeClass.substring(1) : this.activeClass;
            let hide = this.hideClass.indexOf(".") !== -1 ? this.hideClass.substring(1) : this.hideClass;
            let show = this.showClass.indexOf(".") !== -1 ? this.showClass.substring(1) : this.showClass;
            this.element.querySelector(this.navigationContainerClass).classList.add(hide);
            for (let i = 0; i < this.contentArray.length; i++) {
                this.contentArray[i].classList.remove(active);
                this.contentArray[i].classList.add(show);
            }
        }

        public restoreTabs() {
            let active = this.activeClass.indexOf(".") !== -1 ? this.activeClass.substring(1) : this.activeClass;
            let hide = this.hideClass.indexOf(".") !== -1 ? this.hideClass.substring(1) : this.hideClass;
            let show = this.showClass.indexOf(".") !== -1 ? this.showClass.substring(1) : this.showClass;
            this.element.querySelector(this.navigationContainerClass).classList.remove(hide);
            for (let i = 0; i < this.contentArray.length; i++) {
                this.contentArray[i].classList.remove(show);
            }
            this.showTab(this.activeIndex);
        }

        private handleClick(link: Element, index: number) {
            let that = this;
            link.addEventListener('click', function (e) {
                that.showTab(index);
                return false;
            });
        }

        private setOptions(options?: NavTabOptions) {
            options = options || {};
            this.activeIndex = options.activeIndex || this.activeIndex;
            this.activeClass = options.navigationItemClass || this.activeClass;
            this.contentClass = options.contentClass || this.contentClass;
            this.contentItemClass = options.contentItemClass || this.contentItemClass;
            this.navigationContainerClass = options.navigationClass || this.navigationContainerClass;
            this.navigationItemClass = options.navigationItemClass || this.navigationItemClass;
            this.navigationItemClickClass = options.navigationItemClickClass || this.navigationItemClickClass;
        }

        private showTab(index: number) {
            if (index === this.navigationArray.length) return false;
            if (index >= 0 && index <= this.navigationArray.length) {
                let active = this.activeClass.indexOf(".") !== -1 ? this.activeClass.substring(1) : this.activeClass;
                this.navigationArray[this.activeIndex].classList.remove(active);
                this.navigationArray[index].classList.add(active);
                this.contentArray[this.activeIndex].classList.remove(active);
                this.contentArray[index].classList.add(active);
                this.activeIndex = index;
            }
        }

    }

    export module tabWidget {
        let tabs = [];

        export function initTabs(selector: string, options?: NavTabOptions) {
            let elements = document.querySelectorAll(selector);
            for (let i = 0; i < elements.length; i++) {
                tabs.push(new tabObject(elements[i]));
            }
        }

        export function gotoTab(selector: string, index: number) {
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].getInstance().id === selector.substring(1) ||
                    tabs[i].getInstance().className === selector.substring(1)) {
                    tabs[i].gotoTab(index);
                }
            }
        }

        export function removeTabs(selector: string) {
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].getInstance().id === selector.substring(1) ||
                    tabs[i].getInstance().className === selector.substring(1)) {
                    tabs[i].removeTabs();
                }
            }
        }

        export function restoreTabs(selector: string) {
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].getInstance().id === selector.substring(1) ||
                    tabs[i].getInstance().className === selector.substring(1)) {
                    tabs[i].restoreTabs();
                }
            }
        }
    }  
}
 
(() => {
  UI.tabWidget.initTabs(".m-tabs");
  //UI.tabWidget.gotoTab('#foo', 1);
  UI.tabWidget.removeTabs("#foo");
  UI.tabWidget.restoreTabs("#foo");  
})();
