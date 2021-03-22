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
    '/images/cats/Cat4.jpg',
    '/images/cats/Cat5.jpg',
    '/images/cats/Cat6.png',
    '/images/cats/Cat7.jpg',
    '/images/cats/Cat8.jpg',
    '/images/cats/Cat9.jpg',
    '/images/cats/Cat10.png',
    '/images/cats/Cat11.png',
    '/images/cats/Cat12.png',
    '/images/cats/IMG_2167.jpg',
    '/images/cats/IMG_4316.jpg',
    '/images/cats/IMG_5396.jpg'
];

/* eslint-disable max-len */
const mysteryFacts = [
    'I became a pet after retiring from NASA.',
    'I was cursed to take this form by an evil wizard.',
    'My alter ego is Katy Purry.',
    'You should feed me now or I\'ll be late to my bowling league.',
    'You think you know, but you have no idea. This is the diary of Scratch Cat...',
    'I\'m a criminal paw-secutor.',
    'By night, I put on a human costume and fight crime.',
    'My grandma was the inspiration for Warrior Cats.',
    'You think I\'m running back and forth for no reason, but I\'ve got a marathon in June I\'m training for.',
    'Can you please put on the movie Ratatouille?',
    'In my secret lab I\'ve almost perfected prosthetic opposable thumbs.',
    'I\'m late for my audition for Cats: The Musical.',
    'Actually I\'m a famous opera meower.',
    'My purrs are ancient healing magic.',
    'I purr because I contain a small motor.',
    'I\'m not trying to stab you with my claws, I\'m practicing to be on The Great British Bakeoff.',
    'My name is Alexander Hameowlton.',
    'When my humans go to school, I host tea parties with the neighborhood pets.',
    'When I scratch at the furniture it\'s my way of telling you it\'s time for a new couch',
    'I knock things off the table, because things on the table are my mortal enemies.',
    'When I sleep, I dream about three things: fish, catnip, and you.  But mostly fish.',
    'This is my angry face.',
    'I\'m a cat during the day, but I\'m a loaf ... also during the day.',
    'At night I closely study the word "homeowner" because the word "meow" is in it.',
    'My journal is filled with so many cat puns, I almost cat believe it.',
    'I\'m gonna change the world super soon, quick 3-hour power nap first.',
    'If Scratch code happened in real life, "Move 10" would make me just sit there and look at you',
    'I theorized the existence of radium and then was so disappointed to out that Marie Curie had beat me to it in 1902!',
    'In my free time, I like to go bird watching.',
    'Hannah Meowtana was inspired by my life.'
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
                <a> {'Secret Lives'} </a>
            </div>
            <Modal
                useStandardSizes
                className="mod-cats"
                isOpen={this.state.open}
                onRequestClose={this.handleClose}
            >
                <div className="cats-modal-header modal-header">
                    <ModalTitle title={'Shhh... 🤫'} />
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
