import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
    name: 'markedHTML'
})
export class MarkedHTMLPipe implements PipeTransform {

    private renderer = new marked.Renderer();
    private defaultOptions: marked.MarkedOptions = {};

    constructor() {
        this.applyDefaultOptions();
    }

    /**
     * We merge the default renderer onto the options.renderer. This will be
     * by ref, so the caller of this.transform can check what has been applied by default
     * Note: allowJs:true for marked
     * @see https://github.com/angular/angular/issues/21080
     * @see https://github.com/angular/angular/issues/19757#issuecomment-353933280
    **/
    transform(markdown: string, options?: marked.MarkedOptions): any {
        if (options && options.renderer) {
            options.renderer = Object.assign(this.renderer, options.renderer);
        }
        const mergedOptions = Object.assign(this.defaultOptions, options);
        let html = '';
        if (markdown) {
            html = marked(markdown, mergedOptions); // options can be undefined, merged onto marked's defaults
        }
        return html;
    }

    public getMarkedFunction(): any {
        return marked;
    }

    private applyDefaultOptions() {
        this.renderer.link = function (href, title, text) {
            title = title || href;
            return `<a target="_blank" rel="noopener" href="${href}" title="${title}">${text}</a>`;
        };
        this.defaultOptions.renderer = this.renderer;
    }

}
