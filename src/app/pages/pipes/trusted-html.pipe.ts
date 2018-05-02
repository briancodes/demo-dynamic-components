import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'trustedHTML'
})
export class TrustedHtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(value: any, args?: any): any {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }

}
