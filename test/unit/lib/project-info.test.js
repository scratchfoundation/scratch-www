/* eslint-disable no-use-before-define */
const projectInfo = require('../../../src/lib/project-info');

describe('unit test lib/project-info.js', () => {
    test('videoSensing returns true for a version 3 project with video', () => {
        const result = projectInfo[videoVersion3.projectVersion].videoSensing(videoVersion3);
        expect(result).toEqual(true);
    });

    test('videoSensing returns false for a version 3 project with no video', () => {
        const result = projectInfo[noVideoVersion3.projectVersion].videoSensing(noVideoVersion3);
        expect(result).toEqual(false);
    });

    test('videoSensing returns true for a version 2 project with video', () => {
        const result = projectInfo[videoVersion2.projectVersion].videoSensing(videoVersion2);
        expect(result).toEqual(true);
    });
});

const videoVersion3 = {
    targets: [
        {
            isStage: true,
            name: 'Stage',
            variables: {
                '`jEk@4|i[#Fk?(8x)AV.-my variable': [
                    'my variable',
                    '0'
                ]
            },
            lists: {},
            broadcasts: {},
            blocks: {
                'FJz[,QI8`P^5;FEjdBhc': {
                    opcode: 'event_whenflagclicked',
                    next: 'f8q%j#X8sU#C+E1z|-oF',
                    parent: null,
                    inputs: {},
                    fields: {},
                    shadow: false,
                    topLevel: true,
                    x: 255,
                    y: 171
                },
                'f8q%j#X8sU#C+E1z|-oF': {
                    opcode: 'videoSensing_videoToggle',
                    next: null,
                    parent: 'FJz[,QI8`P^5;FEjdBhc',
                    inputs: {
                        VIDEO_STATE: [
                            1,
                            'a2$KXEUlr`=IW!MX8(M7'
                        ]
                    },
                    fields: {},
                    shadow: false,
                    topLevel: false
                },
                'a2$KXEUlr`=IW!MX8(M7': {
                    opcode: 'videoSensing_menu_VIDEO_STATE',
                    next: null,
                    parent: 'f8q%j#X8sU#C+E1z|-oF',
                    inputs: {},
                    fields: {
                        VIDEO_STATE: [
                            'on',
                            null
                        ]
                    },
                    shadow: true,
                    topLevel: false
                }
            },
            comments: {},
            currentCostume: 0,
            costumes: [
                {
                    name: 'backdrop1',
                    dataFormat: 'svg',
                    assetId: 'cd21514d0531fdffb22204e0ec5ed84a',
                    md5ext: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
                    rotationCenterX: 240,
                    rotationCenterY: 180
                }
            ],
            sounds: [
                {
                    name: 'pop',
                    assetId: '83a9787d4cb6f3b7632b4ddfebf74367',
                    dataFormat: 'wav',
                    format: '',
                    rate: 48000,
                    sampleCount: 1123,
                    md5ext: '83a9787d4cb6f3b7632b4ddfebf74367.wav'
                }
            ],
            volume: 100,
            layerOrder: 0,
            tempo: 60,
            videoTransparency: 50,
            videoState: 'on',
            textToSpeechLanguage: null
        }
    ],
    monitors: [
        {
            id: '`jEk@4|i[#Fk?(8x)AV.-my variable',
            mode: 'default',
            opcode: 'data_variable',
            params: {
                VARIABLE: 'my variable'
            },
            spriteName: null,
            value: '0',
            width: 0,
            height: 0,
            x: 7,
            y: 17,
            visible: false,
            sliderMin: 0,
            sliderMax: 100,
            isDiscrete: true
        }
    ],
    extensions: [
        'videoSensing'
    ],
    meta: {
        semver: '3.0.0',
        vm: '1.2.48',
        // eslint-disable-next-line max-len
        agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    },
    projectVersion: 3
};

const noVideoVersion3 = {
    targets: [
        {
            isStage: true,
            name: 'Stage',
            variables: {
                '`jEk@4|i[#Fk?(8x)AV.-my variable': [
                    'my variable',
                    '0'
                ]
            },
            lists: {},
            broadcasts: {},
            blocks: {
                'FJz[,QI8`P^5;FEjdBhc': {
                    opcode: 'event_whenflagclicked',
                    next: '`CA90wtKfX0xa.mK80[|',
                    parent: null,
                    inputs: {},
                    fields: {},
                    shadow: false,
                    topLevel: true,
                    x: 255,
                    y: 171
                },
                '`CA90wtKfX0xa.mK80[|': {
                    opcode: 'data_setvariableto',
                    next: null,
                    parent: 'FJz[,QI8`P^5;FEjdBhc',
                    inputs: {
                        VALUE: [
                            1,
                            [
                                10,
                                '0'
                            ]
                        ]
                    },
                    fields: {
                        VARIABLE: [
                            'my variable',
                            '`jEk@4|i[#Fk?(8x)AV.-my variable'
                        ]
                    },
                    shadow: false,
                    topLevel: false
                }
            },
            comments: {},
            currentCostume: 0,
            costumes: [
                {
                    name: 'backdrop1',
                    dataFormat: 'svg',
                    assetId: 'cd21514d0531fdffb22204e0ec5ed84a',
                    md5ext: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
                    rotationCenterX: 240,
                    rotationCenterY: 180
                }
            ],
            sounds: [
                {
                    name: 'pop',
                    assetId: '83a9787d4cb6f3b7632b4ddfebf74367',
                    dataFormat: 'wav',
                    format: '',
                    rate: 48000,
                    sampleCount: 1123,
                    md5ext: '83a9787d4cb6f3b7632b4ddfebf74367.wav'
                }
            ],
            volume: 100,
            layerOrder: 0,
            tempo: 60,
            videoTransparency: 50,
            videoState: 'on',
            textToSpeechLanguage: null
        }
    ],
    monitors: [
        {
            id: '`jEk@4|i[#Fk?(8x)AV.-my variable',
            mode: 'default',
            opcode: 'data_variable',
            params: {
                VARIABLE: 'my variable'
            },
            spriteName: null,
            value: '0',
            width: 0,
            height: 0,
            x: 7,
            y: 17,
            visible: false,
            sliderMin: 0,
            sliderMax: 100,
            isDiscrete: true
        }
    ],
    extensions: [],
    meta: {
        semver: '3.0.0',
        vm: '1.2.48',
        // eslint-disable-next-line max-len
        agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    },
    projectVersion: 3
};

const videoVersion2 = {
    objName: 'Stage',
    sounds: [{
        soundName: 'pop',
        soundID: 1,
        md5: '83a9787d4cb6f3b7632b4ddfebf74367.wav',
        sampleCount: 258,
        rate: 11025,
        format: ''
    }],
    costumes: [{
        costumeName: 'backdrop1',
        baseLayerID: 3,
        baseLayerMD5: '739b5e2a2435f6e1ec2993791b423146.png',
        bitmapResolution: 1,
        rotationCenterX: 240,
        rotationCenterY: 180
    }],
    currentCostumeIndex: 0,
    penLayerMD5: '5c81a336fab8be57adc039a8a2b33ca9.png',
    penLayerID: 0,
    tempoBPM: 60,
    videoAlpha: 0.5,
    children: [{
        objName: 'Sprite1',
        scripts: [[62,
            85,
            [['whenGreenFlag'], ['doForever', [['say:', ['senseVideoMotion', 'motion', 'this sprite']]]]]],
        [70, 216, [['setVideoState', 'on']]],
        [66, 281, [['setVideoTransparency', 50]]]],
        sounds: [{
            soundName: 'meow',
            soundID: 0,
            md5: '83c36d806dc92327b9e7049a565c6bff.wav',
            sampleCount: 18688,
            rate: 22050,
            format: ''
        }],
        costumes: [{
            costumeName: 'costume1',
            baseLayerID: 1,
            baseLayerMD5: 'f9a1c175dbe2e5dee472858dd30d16bb.svg',
            bitmapResolution: 1,
            rotationCenterX: 47,
            rotationCenterY: 55
        },
        {
            costumeName: 'costume2',
            baseLayerID: 2,
            baseLayerMD5: '6e8bd9ae68fdb02b7e1e3df656a75635.svg',
            bitmapResolution: 1,
            rotationCenterX: 47,
            rotationCenterY: 55
        }],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 90,
        rotationStyle: 'normal',
        isDraggable: false,
        indexInLibrary: 1,
        visible: true,
        spriteInfo: {
        }
    }],
    info: {
        userAgent: 'Scratch 2.0 Offline Editor',
        flashVersion: 'WIN 33,1,1,743',
        spriteCount: 1,
        videoOn: false,
        scriptCount: 1,
        swfVersion: 'v461'
    },
    projectVersion: 2
};
