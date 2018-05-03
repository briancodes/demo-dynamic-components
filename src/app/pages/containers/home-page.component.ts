import {
  Component, OnInit,
  ViewChild, ElementRef, AfterViewChecked,
  AfterViewInit, ChangeDetectorRef, EmbeddedViewRef, PLATFORM_ID, Inject, ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResolvedData } from '../services/data-resolver.service';
import { ComponentCreatorService } from '../services/component-creator.service';
import { AnchorComponent, IDynamicAnchor } from '../components/anchor.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'bc-home-page',
  template: `
    <div class="main">
      <h2>Home Page</h2>

      <h3>Rendered with Dynamically Inserted Link Components</h3>
      <div #renderedDivContainer [innerHTML]="markdownHTML | trustedHTML"></div>

      <h3>Original Markdown String</h3>
      <pre><code>{{markdownString}}</code></pre>
      <h3>Generated HTML</h3>
      <pre><code>{{markdownHTML}}</code></pre>
      <h3>HTML Dynamic Components</h3>
      <pre><code>{{renderedHtml}}</code></pre>
    </div>
  `,
  styles: [`
    .main {
      padding: 10px;
    }
    pre {
      width: 100%;
      overflow-x: scroll;
      padding: 5px 5px;
      background-color: #f0f0f0;
      color: black;
    }
  `]
})
export class HomePageComponent implements OnInit, AfterViewInit {

  // ViewContainerRef: Represents a container where one or more Views can be attached
  // @see https://angular.io/api/core/ViewContainerRef
  @ViewChild('renderedDivContainer', { read: ViewContainerRef })
  private articleViewContainerRef: ViewContainerRef;

  renderedHtml: string;
  markdownHTML: string;
  markdownString: string;

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private componentCreator: ComponentCreatorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resolvedData: IResolvedData }) => {
        console.log('Home Page, route.data.subscribe: ', data.resolvedData);
        this.markdownHTML = data.resolvedData.markedHtml;
        this.markdownString = data.resolvedData.markdownString;
      });
  }

  ngAfterViewInit(): void {
    this.addDynamicComponents();
  }

  addDynamicComponents() {
    if (isPlatformBrowser(this.platformId)) {
      this.addDynamicAnchors();
      this.updateOutput();
    }
  }
  /**
     * Links can be in the form:
     * <a data-routerlink="/about" href="/about" >Absolute Link</a>
     *   data-routerlink="/blog/post/route-resolvers-rxjs-behaviorsubject-with-combinelatest"
     *   data-routerlink="../route-resolvers-rxjs-behaviorsubject-with-combinelatest"
     *   data-routerlink="/blog,post,route-resolvers-rxjs-behaviorsubject-with-combinelatest"
     */
  addDynamicAnchors() {
    const nodeList = document.querySelectorAll('a[data-routerlink]');
    // TypeScript NodeList/NodeListOf doesn't have forEach (also browser support)
    const elementArray: HTMLAnchorElement[] = Array.prototype.slice.call(nodeList, 0);

    elementArray.forEach(anchorElement => {
      const angularCompRef = this.componentCreator.createComponent(AnchorComponent, this.articleViewContainerRef);
      const model: IDynamicAnchor = {
        routerLinkPath: anchorElement.getAttribute('data-routerlink').split(','),
        href: anchorElement.getAttribute('href'),
        title: anchorElement.getAttribute('title') || '',
        text: anchorElement.text
      };
      angularCompRef.instance.model = model;
      const newAnchorElement = (angularCompRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      anchorElement.parentElement.replaceChild(newAnchorElement, anchorElement);
      angularCompRef.changeDetectorRef.detectChanges();
    });
  }

  updateOutput() {
    if (
      this.articleViewContainerRef &&
      this.articleViewContainerRef.element &&
      this.articleViewContainerRef.element.nativeElement
    ) {
      this.renderedHtml = this.articleViewContainerRef.element.nativeElement.innerHTML;
      this.cd.detectChanges();
    }
  }

}
