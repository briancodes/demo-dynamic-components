import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';

@Injectable()
export class ComponentCreatorService {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {

    }

    /**
     * Create a component as a View attached to the app root component
     *
     * Getting the DOM Element from the returned ComponentRef:
     * ```
     * const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;
      ```
     * @see https://medium.com/@caroso1222/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
     * @param component
     */
    createApplicationRefComponent<T>(component: Type<T>): ComponentRef<T> {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);

        this.appRef.attachView(componentRef.hostView);

        return componentRef;
    }

    destroyApplicationRefComponent(componentRef: ComponentRef<any>) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

    /**
     * Create a component, and attach to the viewContainerRef
     * If no index (index of embedded views) is supplied, adds the DOM element at the next available embedded view index (0)
     * e.g. the immediate sibling of the ViewContainerRef's rendered element
     *
     * @param component
     * @param viewContainerRef
     * @param index Index of embeddedView. If empty
     */
    createComponent<T>(component: Type<T>, viewContainerRef: ViewContainerRef, index?: number): ComponentRef<T> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const componentRef = viewContainerRef.createComponent(componentFactory, index);
        return componentRef;
    }

}
