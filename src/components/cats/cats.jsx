const React = require('react');
const bindAll = require('lodash.bindall');

const Modal = require('../modal/base/modal.jsx');

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
const catFacts = [
    'Cats don\'t have 9 lives, but they DO have 9 toes.',
    'All cats are turquoise for a few minutes after they\'re born.',
    'Cats born in the UK prefer tea over water.',
    'The following fact about cats is not fact.',
    'This sentence about cats is false.',
    'Cats aren\'t actually turquoise when they\'re born.',
    'More cats have been to the moon than I have. ',
    'Cats are descended from an ancient alien race from the vicinity of Betelgeuse.',
    'Cats are not not dogs.',
    'The cat Tom, from Tom and Jerry is actually my alter-ego.',
    'If a cat winks twice in a row it means they like to wink.',
    'Cats enjoy playing fetch even more than dogs.',
    'The internet was created as a way to better share images of cats with loved ones.',
    'Cats developed tails as a way to get out of doing homework.',
    'Cats train for marathons by sprinting through your house at very early hours of the morning. ',
    'Cats read newspapers when no one is looking and they can tell if a camera is on in the room.',
    'The word "cat" means "sneezing while cold" in 17 languages. ',
    'Cats are not not adorable.',
    'Cat is the longest word you can type on the keyboard with only one hand.',
    'Meow meow mrow. Meow!',
    'What even is a cat?',
    'The song "Row, Row, Row your boat" is about the authors pet cat.',
    'Cat\'s really like listening to music, but only if it is meowsic.',
    'The first cat was born in 1993.',
    'The Great Catsby is often considered a favorite among cats.',
    'When you\'re not home cats will often try on your shoes.',
    'Cats are actually born in kangaroo pouches.',
    'My friends cat has so many toes.',
    'The greatest writer of all time is a cat known as William Shakespurrrr.',
    'When a cat looks in a mirror it sees purrrrfection.',
    'What\'s a cats favorite movie? Pitch Purrrrfect.',
    'It\'s common knowledge that J.K. Meowling is the real author of the Hairy Potter series.',
    'If my cat went to Hogwarts it would be in Ravenpaw.',
    'Kitty McPurrs-a-lot would make an excellent name for a cat.',
    'Cats blame mice for everything.',
    'Boots & cats & boots & cats & boots & cats & boots & cats.',
    'When a cat is happy sometimes you can hear the soft whirr of its storage system recording the experience for an upcoming show & tell presentation.',
    'Some people think cats are aloof but actually they just really respect your independence.',
    'Modern cats evolved from a creature that looked exactly like Scratch Cat, but more orange.',
    'The reason there are so many cats on the Internet is that all the servers run on hamster wheels.',
    'The word "cat" spelled backwards is taco. Wait, no... burrito? Something like that.',
    'Cats like to attack twist ties, bottle caps, and other reminders of their lack of thumbs.',
    'Kittens were invented by scientists developing a standard measuring system for "cute."',
    'Due to the difference between metric units and other systems, 1 "mew" is about 1.6 "mrow" units.',
    'Cats sometimes knock things off shelves and tables in order to make those items safe from falling.',
    'A cat\'s tail is usually its second- or third-best friend.',
    'Catalogs were originally invented to keep logs of cats.',
    'Catering is food services for cats.',
    'Meow is slang for miauw.',
    'A cat is the only physical entity whose weight equals both 1 kilogram and 1 pound.',
    'Balls of yarn are created by watching videos of cats playing with them in reverse.',
    'Every time you sneeze a tiny kitten is born.',
    'In ancient Greece, cats kept humans as pets.',
    'Bongo cat is the great grandchild of nyancat.',
    'What\'s a cat\'s best friend? Its purrrrse.',
    'Sharing video online was created by cats to get the attention they feel they deserve.',
    'A "catseye" view is a point of view where everything is scratchable.',
    'Cat videos is the first step in their quest for world domination.',
    'The cat\'s meow is the cat\'s meow is the cat\'s meow is the cat\'s meow....',
    'A cat\'s intelligence is distributed throughout its body. Fully half of its brain matter is in its tail.',
    'Cats evolved chromatophores millions of years before octopuses.',
    'Cats are able to read minds through their whiskers.',
    'Soon after birth, cats extend their tails into a breeze and can sail hundreds of feet in the air for miles to find new territory.',
    'Cats\' memory is encoded in their DNA, which explains the knowing looks on their faces.',
    'Charles Francis Richter originally created his scale to measure the integrated power of cat purrs.',
    'Cat hair is being studied for use in building space elevators. Ironically, the first use of space elevators will be as scratching posts.',
    'When you are not looking, cats stare at a point exactly one foot behind your head.',
    'The infamous Weddell Sea cats glide from tree to tree in the forests of Dronning Maud.',
    'Once the antarctic ice melts, archologists believe the origins of cat civilization will be revealed.',
    'Cats rest on their backs because it helps them to absorb cuteness through their bellies.',
    'The 21cm hydrogen line was originally named after a 21cm long cat.',
    'Redshift would be a good name for a cat that does not like you and runs away.',
    'The MIT mascot is actually a cat that enjoys wood working.',
    'The cat packing conjecture is a widely accepted mathematical argument that proves an infinite number of cats is a good thing.',
    'Meor\'s Law states that the number of cats double every 18-24 months.',
    'A group of cats is called a hairball.',
    'There are more hairs on the head of a cat than there are scales on the head of a mouse.',
    'April 32nd is International Pet a Cat Day.',
    'The Scratch Cat is the only cat on the Internet.',
    'This sentence about cats is true.',
    'Cat bites are more common on days that end in y.',
    'Cats have a minimum of two ears.',
    'Cattails were developed in a lab as a way to reconstruct cats using plants. It didn’t work.',
    'Cats developed certain fur patterns to blend in with couch upholstery.',
    'Cats have thumbs, they’re just really really hard to see.',
    'Cats are the first most popular pet in the US, after dogs.',
    'If you rick roll a cat, it will never forgive you.',
    'Cats persuaded humans to create the internet.',
    'If you walk under a rainbow and then pet a black cat, it will actually bring you good luck.',
    'Cats can contain entire universes!',
    'Every time a hat block gets triggered, a cat starts purring.',
    'The Jungle Book is a true story based on a cat named Meowgli.',
    'Camera is a common misspelling of Catmera, a device invented specifically to record cats.',
    'Cats don\'t steal your breath because it doesn\'t smell like catfood.',
    'Cats hang out on keyboards in an attempt to send messages to other internet cats.',
    'Cat is an abbreviation for category.',
    'Cat is an acronym which stands for Cats Are Terrific.',
    'When cats are fully enclosed in boxes, they can teleport to alternative universes.',
    'If you put buttered toast butter-side up, on your cat, then your cat will be able to fly.'
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
        const randomNumber = Math.floor(Math.random() * (catFacts.length - 1));
        const catFact = catFacts[randomNumber];
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
                <a> {'Cats...?'} </a>
            </div>
            <Modal
                useStandardSizes
                className="mod-cats"
                isOpen={this.state.open}
                onRequestClose={this.handleClose}
            >
                <div className="cats-modal-header modal-header">
                    <div className="cats-content-label content-label">
                        {'Did you know...?'}
                    </div>
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
