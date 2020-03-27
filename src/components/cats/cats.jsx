const React = require('react');
const bindAll = require('lodash.bindall');

const Modal = require('../modal/base/modal.jsx');
const ModalTitle = require('../modal/base/modal-title.jsx');

require('./cats.scss');

const catImages = [
    '/images/cats/IMG_9775.jpg',
    '/images/cats/IMG_9766.jpg',
    '/images/cats/IMG_9587.jpg',
    '/images/cats/IMG_6558.jpg',
    '/images/cats/IMG_6521.jpg',
    '/images/cats/IMG_6020.jpg',
    '/images/cats/IMG_5880.jpg',
    '/images/cats/IMG_3218.jpg',
    '/images/cats/IMG_2776.jpg',
    '/images/cats/IMG_2775.jpg',
    '/images/cats/IMG_2681.jpg',
    '/images/cats/IMG_1092.jpg',
    '/images/cats/IMG_0684.jpg',
    '/images/cats/IMG_0698.jpg',
    '/images/cats/IMG_0504.jpg',
    '/images/cats/IMG_0288.jpg',
    '/images/cats/IMG_0122.jpg',
    '/images/cats/IMG_2507.jpg',
    '/images/cats/IMG_1977.jpg',
    '/images/cats/IMG_1696.jpg',
    '/images/cats/IMG_1463.jpg',
    '/images/cats/IMG_1157.jpg',
    '/images/cats/IMG_0681.jpg',
    '/images/cats/IMG_0135.jpg',
    '/images/cats/IMG_0071.jpg',
    '/images/cats/1.jpg',
    '/images/cats/2.jpg',
    '/images/cats/3.jpg',
    '/images/cats/4.jpg',
    '/images/cats/Cat1.jpg',
    '/images/cats/Cat2.jpg',
    '/images/cats/Cat3.jpg',
    '/images/cats/Cat4.jpg'
];

/* eslint-disable max-len */
const mysteryFacts = [
    'How small can they make a t-shirt?',
    'Why do hotdogs come in packages of 8?',
    'Who let the dogs out?',
    'Why are cats so cute?',
    'Where is the other sock?',
    'Why is the sky blue?',
    'Why does everyday end in y?',
    'How many licks does it take to get to the center of a lollipop? ',
    'How many bites does it take to get to the center of a corndog?',
    'How many hours can a cat sleep in one day?',
    'Am I hungry?',
    'What should I eat?',
    'Who will make me a sandwich?',
    'Where are my glasses?',
    'Why did I walk into this room?',
    'Where is the bathroom?',
    'Where is the mop?',
    'Why are ants so strong?',
    'Why do I wake up before my alarm goes off?',
    'Where do almonds come from?',
    'When is the sky blue?',
    'Wherefore art thou Romeo?',
    'What was the Scratch Cat like as a kitten?',
    'What is the plural of Moose?',
    'Whose chair is that?',
    'Who paid for that floor?',
    'What is my cat\'s favorite color?',
    'What is that cat\'s favorite color?',
    'Does the "close door" button on an elevator really work?'
];

/* eslint-enable max-len */

class Cats extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCatsClick',
            'handleClose',
            'pickRandomFact'
        ]);
        this.state = {
            open: false
        };
    }

    handleCatsClick () {
        this.setState({open: true});
    }

    handleClose () {
        this.setState({open: false});
    }

    pickRandomFact () {
        const randomNumber = Math.floor(Math.random() * (mysteryFacts.length - 1));
        const catFact = mysteryFacts[randomNumber];
        return catFact;
    }

    pickRandomCatImage () {
        const randomNumber = Math.floor(Math.random() * (catImages.length - 1));
        const catImage = catImages[randomNumber];
        return catImage;
    }

    render () {
        return (<React.Fragment>
            <div onClick={this.handleCatsClick}>
                <a> {'Mystery'} </a>
            </div>
            <Modal
                useStandardSizes
                className="mod-cats"
                isOpen={this.state.open}
                onRequestClose={this.handleClose}
            >
                <div className="cats-modal-header modal-header">
                    <ModalTitle title={'Hmmm...'} />
                </div>
                <div className="cats-modal-content modal-content">
                    <p> {this.pickRandomFact()} </p>
                    <img src={this.pickRandomCatImage()} />
                </div>
            </Modal>
        </React.Fragment>
        );

    }
}

module.exports = Cats;
