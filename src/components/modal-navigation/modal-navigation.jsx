import React, {useEffect, useMemo} from 'react';
import Button from '../forms/button.jsx';
import PropTypes from 'prop-types';

import './modal-navigation.scss';
import classNames from 'classnames';

const ModalNavigation = ({
    currentPage,
    totalDots,
    onNextPage,
    onBackPage,
    nextButtonText,
    prevButtonText,
    nextButtonImageSrc,
    prevButtonImageSrc,
    className
}) => {
    useEffect(() => {
        new Image().src = nextButtonImageSrc;
        new Image().src = prevButtonImageSrc;
    }, []);

    const dots = useMemo(() => {
        const dotsComponents = [];
        if (currentPage >= 0 && totalDots){
            for (let i = 0; i < totalDots; i++){
                dotsComponents.push(<div
                    key={`dot page-${currentPage} ${i}`}
                    className={`dot ${currentPage === i && 'active'}`}
                />);
            }
        }
        return dotsComponents;
    }, [currentPage, totalDots]);
    
    return (
        <div className={classNames('navigation', className)}>
            {
                <Button
                    onClick={onBackPage}
                    className={classNames('navigation-button', {
                        hidden: !onBackPage,
                        transparent: !prevButtonText
                    })}
                >
                    <img
                        className="left-arrow"
                        alt=""
                        src={prevButtonImageSrc}
                    />
                    <span className="navText">
                        {prevButtonText}
                    </span>
                </Button> }
            {(currentPage >= 0 && totalDots) &&
            <div className="dotRow">
                {dots}
            </div>}
            <Button
                onClick={onNextPage}
                className={classNames('navigation-button', {
                    transparent: !nextButtonText
                })}
            >
                <span className="navText">
                    {nextButtonText}
                </span>
                <img
                    className="right-arrow"
                    alt=""
                    src={nextButtonImageSrc}
                />
            </Button>
        </div>

    );
};
ModalNavigation.propTypes = {
    currentPage: PropTypes.number,
    totalDots: PropTypes.number,
    onNextPage: PropTypes.func,
    onBackPage: PropTypes.func,
    nextButtonText: PropTypes.node,
    prevButtonText: PropTypes.node,
    nextButtonImageSrc: PropTypes.string,
    prevButtonImageSrc: PropTypes.string,
    className: PropTypes.string
};

ModalNavigation.defaultProps = {
    nextButtonImageSrc: '/images/onboarding/right-arrow.svg',
    prevButtonImageSrc: '/images/onboarding/left-arrow.svg'
};

export default ModalNavigation;
