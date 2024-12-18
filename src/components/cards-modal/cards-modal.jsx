import React, {useCallback, useState} from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Button from '../forms/button.jsx';
import {FormattedMessage, useIntl} from 'react-intl';
import ModalNavigation from '../modal-navigation/modal-navigation.jsx';

import './cards-modal.scss';

const GUIDES_SECTIONS = [
    {
        titleId: 'ideas.modalSectionTitleSpritesAndSounds',
        imgSrc: '/images/ideas/sprites-sounds.svg',
        cards: [
            {
                cardId: 'ideas.modalCardNameCreateSprite',
                hrefId: 'guides.ScratchLearningResource_CreateOriginalSpriteLink'
            },
            {
                cardId: 'ideas.modalCardNameRemix',
                hrefId: 'guides.ScratchLearningResource_RemixRe-imagineSpritesLink'
            },
            {
                cardId: 'ideas.modalCardNameBringDrawingsIntoScratch',
                hrefId: 'guides.ScratchLearningResource_BringYourDrawingsIntoScratchLink'
            },
            {
                cardId: 'ideas.modalCardNameSound',
                hrefId: 'guides.ScratchLearningResource_SoundsAddRecordText-to-SpeechLink'
            },
            {
                cardId: 'ideas.modalCardNameCreateAsset',
                hrefId: 'guides.ScratchLearningResource_CreateanAssetPackLink'
            }
        ]
    },
    {
        titleId: 'ideas.modalSectionTitleAdvancedTopics',
        imgSrc: '/images/ideas/advanced-topics.svg',
        cards: [
            {
                cardId: 'ideas.modalCardNameConditionalStatements',
                hrefId: 'guides.ScratchLearningResource_ConditionalStatementsLink'
            },
            {
                cardId: 'ideas.modalCardNameVariablesLists',
                hrefId: 'guides.ScratchLearningResource_VariablesandListsLink'
            },
            {
                cardId: 'ideas.modalCardNameCustomBlocks',
                hrefId: 'guides.ScratchLearningResource_MyBlocksLink'
            },
            {
                cardId: 'ideas.modalCardNameComputationalConcepts',
                hrefId: 'cards.paperplanes-turtlegraphics-cardsLink'
            },
            {
                cardId: 'ideas.modalCardNameFaceSensing',
                hrefId: 'cards.facesensing-cardsLink'
            }
        ]
    }
];

export const CardsModal = ({isOpen, onClose = () => {}}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const intl = useIntl();
    const onNextPage = useCallback(() => {
        if (currentPage < GUIDES_SECTIONS.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage, setCurrentPage]);
    const onBackPage = useCallback(() => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage, setCurrentPage]);

    if (!isOpen) return null;
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="cards-modal-container"
            overlayClassName="cards-modal-overlay"
        >
            <div className="cards-modal-header">
                <div className="cards-title">
                    <FormattedMessage id={'ideas.modalTitle'} />
                </div>
                <Button
                    className="close-button"
                    isCloseType
                    onClick={onClose}
                />
            </div>
            <div className="cards-modal-section-title">
                <FormattedMessage id={GUIDES_SECTIONS[currentPage].titleId} />
            </div>
            <div className="cards-modal-section-content">
                <img
                    className="section-img"
                    src={GUIDES_SECTIONS[currentPage].imgSrc}
                />
                <div className="cards-modal-cards-list">
                    {GUIDES_SECTIONS[currentPage].cards.map(card => (
                        <div
                            key={card.cardId}
                            className="card"
                        >
                            <FormattedMessage id={card.cardId} />
                            <a
                                href={intl.formatMessage({
                                    id: card.hrefId
                                })}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button>
                                    <img src="/images/ideas/download-icon.svg" />
                                </Button>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <ModalNavigation
                currentPage={currentPage}
                totalDots={GUIDES_SECTIONS.length}
                nextButtonImageSrc="/images/ideas/right-arrow.svg"
                prevButtonImageSrc="/images/ideas/left-arrow.svg"
                onNextPage={onNextPage}
                onBackPage={onBackPage}
                className="cards-modal-navigation"
            />
        </ReactModal>
    );
};

CardsModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};
