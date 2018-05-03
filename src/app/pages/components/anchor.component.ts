import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

export interface IDynamicAnchor {
    routerLinkPath: string[];
    href: string;
    text: string;
    title?: string;
}

@Component({
    selector: 'bc-anchor',
    template: `
      <a [routerLink]="model?.routerLinkPath" href="{{model?.href}}" title="{{model?.title}}">{{model?.text}}</a>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnchorComponent implements OnInit, OnDestroy {

    @Input() model: IDynamicAnchor;

    constructor() { }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        console.log('Anchor Destroy');
    }

}
