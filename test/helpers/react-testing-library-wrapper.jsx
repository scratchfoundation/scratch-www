import React from 'react';
import {render} from '@testing-library/react';
import {renderWithIntl} from './intl-helpers';
import {IntlProvider} from 'react-intl';
import {generatedLocales} from '../generated/generated-locales';

const findNode = (fiberNode, selector, comparator) => {
    if (fiberNode &&
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

const findAllNodes = (fiberNode, selector, comparator) => {
    let currentNodes = [];

    if (fiberNode &&
        comparator(selector, fiberNode)) {
        currentNodes.push(fiberNode);
    }

    if (fiberNode && fiberNode.child) {
        currentNodes = [...currentNodes, ...findAllNodes(fiberNode.child, selector, comparator)];
    }

    if (fiberNode && fiberNode.sibling) {
        currentNodes = [...currentNodes, ...findAllNodes(fiberNode.sibling, selector, comparator)];
    }

    if (fiberNode && fiberNode._reactInternals) {
        currentNodes = [...currentNodes, ...findAllNodes(fiberNode._reactInternals, selector, comparator)];
    }

    return currentNodes;
};


const getInstance = (container, selector, comparator) => {
    const rootFiberKey = Object.keys(container).find(key =>
        key.startsWith('__reactContainer')
    );
    const rootFiber = container[rootFiberKey];

    return findNode(rootFiber.stateNode.current, selector, comparator) || null;
};

const compareComponentName = (componentName, fiberNode) => fiberNode.elementType?.name?.startsWith(componentName);

const renderWithInstance = (ux, componentName) => {
    const component = render(ux);

    const instance = getInstance(
        component.container,
        componentName,
        compareComponentName);

    return {
        instance: () => {
            const node = getInstance(
                component.container,
                componentName,
                compareComponentName);

            return node?.stateNode || node;
        },
        findByComponentName: selector => {
            const node = findNode(
                instance,
                selector,
                compareComponentName);

            return node?.stateNode || node;
        },
        findAllByComponentName: selector => {
            const nodes = findAllNodes(
                instance,
                selector,
                compareComponentName);

            return nodes;
        },
        ...component
    };
};

const renderWithInstanceAndIntl = (ux, componentName) => {
    const component = renderWithIntl(ux);

    return {
        instance: () => {
            const node = getInstance(
                component.container,
                componentName,
                compareComponentName);

            return node?.stateNode || node;
        },
        findByComponentName: selector => {
            const node = findNode(
                getInstance(
                    component.container,
                    componentName,
                    compareComponentName),
                selector,
                compareComponentName);

            return node?.stateNode || node;
        },
        findAllByComponentName: selector => {
            const nodes = findAllNodes(
                getInstance(
                    component.container,
                    componentName,
                    compareComponentName),
                selector,
                compareComponentName);

            return nodes;
        },
        rerenderWithIntl: newUx => {
            component.rerender(
                <IntlProvider
                    locale="en"
                    messages={generatedLocales.en}
                >
                    {newUx ?? ux}
                </IntlProvider>
            );
        },
        ...component
    };
};

export {renderWithInstance as render, renderWithInstanceAndIntl as renderWithIntl};
