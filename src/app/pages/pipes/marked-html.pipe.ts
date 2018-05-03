import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'markedHTML'
})
export class MarkedHTMLPipe implements PipeTransform {

  private renderer = new marked.Renderer();
  private defaultOptions: marked.MarkedOptions = {};

  constructor() {
    // this.applyDefaultOptions();
  }

  /**
   * Note: allowJs:true for marked
   * @see https://github.com/angular/angular/issues/21080
   * @see https://github.com/angular/angular/issues/19757#issuecomment-353933280
  **/
  transform(markdown: string, options?: marked.MarkedOptions): any {
    let mergedRenderer: marked.Renderer;
    if (options && options.renderer) {
      mergedRenderer = new marked.Renderer();
      Object.assign(mergedRenderer, this.renderer, options.renderer);
    }
    const mergedOptions = Object.assign({}, this.defaultOptions, options);
    if (mergedRenderer) {
      mergedOptions.renderer = mergedRenderer;
    }
    let html = '';
    if (markdown) {
      html = marked(markdown, mergedOptions);
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
