/*
 * Helpers for using enzyme and react-test-renderer with react-intl
 */
import React from 'react';
import renderer from 'react-test-renderer';
import {createIntl, IntlProvider} from 'react-intl';
import {mount, shallow} from 'enzyme';
import intlShape from '../../src/lib/intl-shape';

const shallowWithIntl = (node, {context} = {}) => shallow(
    node,
    {
        context: Object.assign({}, context),
        wrappingComponent: IntlProvider,
        wrappingComponentProps: {
            locale: 'en',
            messages: {}
        }
    }
).dive();

const mountWithIntl = (node, {context, childContextTypes} = {}) => {
    const intl = createIntl({locale: 'en', messages: {}});
    return mount(
        node,
        {
            context: Object.assign({}, context, {intl}),
            childContextTypes: Object.assign({}, {intl: intlShape}, childContextTypes),
            wrappingComponent: IntlProvider,
            wrappingComponentProps: {
                locale: 'en',
                messages: {}
            }
        }
    );
};

// react-test-renderer component for use with snapshot testing
const componentWithIntl = (children, props = {locale: 'en'}) => renderer.create(
    <IntlProvider
        textComponent="span"
        {...props}
    >
        {children}
    </IntlProvider>
);

export {
    componentWithIntl,
    shallowWithIntl,
    mountWithIntl
};
