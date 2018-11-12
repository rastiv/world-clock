import anime from 'animejs';

export default class Animations {

    constructor() {
        this.timelineSelector = null;
        this.timelineItemInfo = null;
    }

    initSelector() {
        this.timelineSelector = anime.timeline({
            loop: false,
            autoplay: false,
            easing: 'easeOutSine'
        });
        this.timelineSelector
            .add({
                targets: '#line',
                height: 0,
                duration: 400
            })
            .add({
                targets: '#lineCircleRed',
                scale: 0,
                duration: 400,
                offset: '-=400'
            })
            .add({
                targets: '[item]',
                scale: 0,
                opacity: 0,
                duration: 300,
                delay: (el, i, l) => {
                    let step = 200 / application.Cities.length;
                    return (application.Cities.length - i - 1) * step;
                },
                offset: '-=400'
            })
            .add({
                targets: '#lineCircleWhite',
                scale: 0,
                duration: 300
            })
            .add({
                targets: '#header',
                height: () => { return $('body').height() + 'px'; },
                duration: 500,
                offset: '-=400'
            })
            .add({
              targets: '#selector',
              scale: 1,
              duration: 0,  
            })
            .add({
                targets: '#selector',
                opacity: 1,
                duration: 400,  
              });
    }

    showSelector() {
        // if (this.timelineSelector === null) this.initSelector();
        this.timelineSelector.reverse();
        this.timelineSelector.play();
    }

    hideSelector() {
        this.initSelector();
        this.timelineSelector.restart();
        this.timelineSelector.play();
    }

    showItemInfo() {
        let timeline = anime.timeline({
            loop: false,
            autoplay: true,
            easing: 'easeOutSine'
        });
        timeline
            .add({
                targets: '#line',
                height: 0,
                duration: 400
            })
            .add({
                targets: '#lineCircleRed',
                scale: 0,
                duration: 400
            })
            .add({
                targets: '#lineCircleWhite',
                scale: 0,
                duration: 300,
                offset: 400
            })
            .add({
                targets: '.header',
                boxShadow: '0 0 0 rgba(0,0,0,0)',
                duration: 300,
                offset: 400
            })
            .add({
                targets: '.header__gradient',
                top: '-100%',
                duration: 300,
                offset: 400
            })
            .add({
                targets: ['.header__heading', '.header__pax'],
                top: '-=30px',
                duration: 300,
                offset: 400
            })
            .add({
                targets: '[item]:not(.selected)',
                scale: 0,
                opacity: 0,
                duration: 400,
                offset: 400
            })
            .add({
                targets: '#carrier',
                top: '0px',
                height: () => { return $('body').height() + 'px'; },
                duration: 400,
                offset: 400
            })
            .add({
                targets: '[item].selected',
                height: () => { return $('body').height() + 'px'; },
                duration: 400,
                offset: 400
            })
            .add({
                targets: '[item].selected .item__scale',
                opacity: 0,
                zIndex: 0,
                duration: 400,
                offset: 400
            })
            .add({
                targets: '[item].selected .item__info',
                opacity: 1,
                zIndex: 1,
                duration: 400,
                offset: 400
            });
        return timeline;
    }

    hideItemInfo(callback = null) {
        let timeline = anime.timeline({
            loop: false,
            autoplay: true,
            easing: 'easeOutSine'
        });
        timeline
            .add({
                targets: '[item].selected .item__info',
                opacity: 0,
                zIndex: 0,
                duration: 400,
                offset: 0
            })
            .add({
                targets: '[item].selected .item__scale',
                opacity: 1,
                zIndex: 1,
                duration: 400,
                offset: 0
            })
            .add({
                targets: '[item].selected',
                height: application.FrameH + 'px',
                duration: 400,
                offset: 0
            })
            .add({
                targets: '#carrier',
                top: $('#carrier').attr('offset-top') + 'px',
                height: application.FrameH + 'px',
                duration: 400,
                offset: 0
            })
            .add({
                targets: '[item]:not(.selected)',
                scale: 1,
                opacity: 1,
                duration: 400,
                offset: 0
            })
            .add({
                targets: ['.header__heading', '.header__pax'],
                top: '+=30px',
                duration: 300,
                offset: 0
            })
            .add({
                targets: '.header__gradient',
                top: '0%',
                duration: 300,
                offset: 0
            })
            .add({
                targets: '.header',
                boxShadow: '0 5px 5px rgba(0, 0, 0, .15)',
                duration: 300,
                offset: 0
            })
            .add({
                targets: '#lineCircleWhite',
                scale: 1,
                duration: 300,
                offset: 0
            })
            .add({
                targets: '#lineCircleRed',
                scale: 1,
                duration: 400,
                offset: 400
            })
            .add({
                targets: '#line',
                height: () => { return ($('body').height() - $('#line').position().top) + 'px'; },
                duration: 400,
                offset: 400
            });

        return timeline;
    }

    loaderToMessage() {
        return anime.timeline({
            loop: false,
            autoplay: true,
            easing: 'easeOutSine'
        })
            .add({
                targets: ['#loaderClock [rel="1"]', '#loaderClock [rel="2"]'],
                opacity: 0,
                duration: 400
            })
            .add({
                targets: '#loaderClock',
                width: '300px',
                height: '140px',
                borderRadius: '3px',
                duration: 400
            })
            .add({
                targets: "#loaderMessage",
                opacity: 1,
                scale: 1,
                duration: 400
            });
    }

    messageToLoader() {
        return anime.timeline({
            loop: false,
            autoplay: true,
            easing: 'easeOutSine'
        })
            .add({
                targets: "#loaderMessage",
                opacity: 0,
                scale: 0,
                duration: 400
            })
            .add({
                targets: '#loaderClock',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                duration: 400
            })
            .add({
                targets: ['#loaderClock [rel="1"]', '#loaderClock [rel="2"]'],
                opacity: 1,
                duration: 400
            });
    }

    removeItem(code, moveUpCities) {
        return anime.timeline({
            loop: false,
            autoplay: true,
            easing: 'easeOutSine'
        })
            .add({
                targets: '[item="' + code + '"]',
                opacity: 0,
                scale: 0,
                duration: 400
            })
            .add({
                targets: ((cities) => {
                    let arr = [];
                    for (let i = 0; i < cities.length; i++) {
                        arr.push('[item="' + cities[i] + '"]');
                    }
                    return arr;
                })(moveUpCities),
                top: '-=' + application.FrameH + 'px',
                duration: 400
            });
    }

    referenceItem(item, reference) {
        return anime.timeline({
            loop: false,
            autoplay: true,
            easing: 'easeOutSine'
        })
        .add({
            targets: '#reference ' + reference,
            translateX: '100%',
            scale: 0,
            opacity: 0,
            duration: 700,
            offset: 0
        })
        .add({
            targets: '#reference ' + item,
            translateX: '0%',
            scale: 1,
            opacity: 1,
            duration: 700,
            offset: 0
        })
        .add({
            targets: '#itemsContainer ' + item,
            translateX: '-100%',
            scale: 0,
            opacity: 0,
            duration: 700,
            offset: 0
        })
        .add({
            targets: '#itemsContainer ' + reference,
            translateX: '0%',
            scale: 1,
            opacity: 1,
            duration: 700,
            offset: 0
        });
    }

    addNewItem(code) {
        return anime.timeline({
            loop: false,
            autoplay: true,
            easing: 'easeOutSine'
        })
        .add({
            targets: '[selector-item="' + code + '"]',
            left: '-100%',
            duration: 400
        });
    }

}
