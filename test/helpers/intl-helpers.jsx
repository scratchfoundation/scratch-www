import React from 'react';
import {render} from '@testing-library/react';
import {IntlProvider} from 'react-intl';
import {generatedLocales} from '../generated/generated-locales';

const renderWithIntl = ui => ({
    ...render(
        <IntlProvider
            locale="en"
            messages={generatedLocales.en}
        >
            {ui}
        </IntlProvider>
    )
});

export {renderWithIntl};
