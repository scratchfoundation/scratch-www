const React = require('react');
const {useEffect, useState} = React;
const PropTypes = require('prop-types');
const {FormattedRelativeTime} = require('react-intl');
const {selectUnit} = require('../../lib/select-unit');

const RelativeTime = ({value}) => {
    const [selectedUnit, setSelectedUnit] = useState(selectUnit(value));

    useEffect(() => {
        // It is unlikely that users will leave this running for days. Don't
        // auto-update beyond hours.
        if (!['second', 'minute', 'hour'].includes(selectedUnit.unit)) return;

        const timerId = setInterval(() => {
            const nextSelectedUnit = selectUnit(value);
            if (selectedUnit.value !== nextSelectedUnit.value ||
                selectUnit.unit !== nextSelectedUnit.unit) {
                setSelectedUnit(nextSelectedUnit);
            }
        }, 10000);

        return () => clearTimeout(timerId);
    }, [value, selectedUnit]);

    return (
        <FormattedRelativeTime
            value={selectedUnit.value}
            unit={selectedUnit.unit}
            numeric="auto"
        />
    );
};

RelativeTime.propTypes = {
    value: PropTypes.instanceOf(Date)
};

module.exports = RelativeTime;
