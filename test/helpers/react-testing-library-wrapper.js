import {render} from '@testing-library/react';
import {renderWithIntl} from './intl-helpers';

const findNode = (fiberNode, selector, comparator) => {
    if (fiberNode &&
        fiberNode.stateNode &&
        fiberNode.stateNode.state &&
        comparator(selector, fiberNode)) {
        return fiberNode;
    }

    let currentNode;

    if (!currentNode && fiberNode && fiberNode.child) {
        currentNode = findNode(fiberNode.child, selector, comparator);
    }

    if (!currentNode && fiberNode && fiberNode.sibling) {
        currentNode = findNode(fiberNode.sibling, selector, comparator);
    }

    return currentNode;
};

const getInstance = (container, selector, comparator) => {
    const rootFiberKey = Object.keys(container).find(key =>
        key.startsWith('__reactContainer')
    );
    const rootFiber = container[rootFiberKey];
    
    return findNode(rootFiber.stateNode.current, selector, comparator) || null;
};

const compareComponentName = (componentName, fiberNode) => fiberNode.elementType?.name.startsWith(componentName);

const renderWithInstance = (ux, componentName) => {
    const component = render(ux);

    return {
        instance: () => getInstance(
            component.container,
            componentName,
            compareComponentName)?.stateNode,
        findByComponentName: selector => getInstance(
            component.container,
            selector,
            compareComponentName)?.stateNode,
        ...component
    };
};

const renderWithInstanceAndIntl = (ux, componentName) => {
    const component = renderWithIntl(ux);
    
    return {
        instance: () => getInstance(
            component.container,
            componentName,
            compareComponentName)?.stateNode,
        findByComponentName: selector => getInstance(
            component.container,
            selector,
            compareComponentName)?.stateNode,
        ...component
    };
};

export {renderWithInstance as render, renderWithInstanceAndIntl as renderWithIntl};
