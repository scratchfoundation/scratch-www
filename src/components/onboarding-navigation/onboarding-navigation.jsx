import React, {useEffect} from 'react';
import Button from '../forms/button.jsx';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import './onboarding-navigation.scss';
import classNames from 'classnames';

const OnboardingNavigation = ({
    currentPage,
    totalDots,
    onNextPage,
    onBackPage,
    nextButtonText
}) => {
    const dots = [];

    useEffect(() => {
        new Image().src = '/images/onboarding/right-arrow.svg';
        new Image().src = '/images/onboarding/left-arrow.svg';
    }, []);

    if (currentPage >= 0 && totalDots){
        for (let i = 0; i < totalDots; i++){
            dots.push(<div
                key={`dot page-${currentPage} ${i}`}
                className={`dot ${currentPage === i && 'active'}`}
            />);
        }
    }
    
    return (
        <div className="navigation">
            {
                <Button
                    onClick={onBackPage}
                    className={classNames({
                        hidden: !onBackPage
                    })}
                >
                    <img
                        className="left-arrow"
                        alt=""
                        src="/images/onboarding/left-arrow.svg"
                    />
                    <span className="navText">
                        {<FormattedMessage
                            id={'becomeAScratcher.buttons.back'}
                        />}
                    </span>
                </Button> }
            {(currentPage >= 0 && totalDots) &&
            <div className="dotRow">
                {dots}
            </div>}
            <Button onClick={onNextPage}>
                <span className="navText">
                    {nextButtonText || <FormattedMessage id={'becomeAScratcher.buttons.next'} />}
                </span>
                <img
                    className="right-arrow"
                    alt=""
                    src="/images/onboarding/right-arrow.svg"
                />
            </Button>
        </div>

    );
};
OnboardingNavigation.propTypes = {
    currentPage: PropTypes.number,
    totalDots: PropTypes.number,
    onNextPage: PropTypes.func,
    onBackPage: PropTypes.func,
    nextButtonText: PropTypes.string
};

export default OnboardingNavigation;
