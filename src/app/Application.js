import gsap from 'gsap/all';
import config from '../config';
import { getRandomInt } from './utils';

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application {
  constructor() {
    this.config = config;
    this.data = { };
    this.loopIndex = 0;

    this.setInfiniteLoops();
    this.animationStart();
  }

  async animationStart() {
    const intro = this.createIntro();
    const trap = this.createRandomTrap();
    const outro = this.createOutro();

    if (this.loopIndex) {
      const loopSpeech = this.createLoopSpeech();

      intro.add(loopSpeech);
    }

    intro.add(trap);
    trap.add(outro, 'outro');

    intro.timeScale(1 + this.loopIndex / 2);

    await intro;

    this.loopIndex++;

    this.animationStart();
  }

  createIntro() {
    const { container: strangeContainer, speechBubble: strangeSpeechBubble } = config.selectors.strange;
    const { portal } = config.selectors.environment;
    const { speechBubble: dormammuSpeechBubble, texts: { main } } = config.selectors.dormammu;

    return gsap
      .timeline()
      .fromTo(portal, { opacity: 0, rotate: 0, scale: 0 }, { opacity: 1, rotate: 360, scale: 1, duration: 1 })
      .to(strangeContainer, { opacity: 1, duration: 1 }, 'portal-hide')
      .to(portal, { opacity: 0, rotate: 0, scale: 0, duration: 1 })
      .fromTo(strangeSpeechBubble, { scale: 0 }, { scale: 1, opacity: 1, duration: 1 }, 'portal-hide')
      .to(strangeSpeechBubble, { opacity: 0, duration: 1 }, '+=0.5')
      .fromTo([dormammuSpeechBubble, main], { scale: 0 }, { scale: 1, opacity: 1, duration: 1 })
      .to([dormammuSpeechBubble, main], { opacity: 0, duration: 1 }, '+=0.5');
  }

  createOutro() {
    const { container: strangeContainer } = config.selectors.strange;

    return gsap
      .timeline()
      .to(strangeContainer, { x: '+= 6', y: '+= 6', yoyo: true, repeat: 31, duration: 0.01, ease: 'power2.in' })
      .to(strangeContainer, { opacity: 0, duration: 1 });
  }

  createLoopSpeech() {
    const { speechBubble: dormammuSpeechBubble } = config.selectors.dormammu;
    const texts = Object.values(config.selectors.dormammu.texts);
    const loopTexts = texts.filter(t => t.includes('loop'));
    const randomIndex = getRandomInt(0, loopTexts.length - 1);
    const randomLoopText = loopTexts[randomIndex];

    gsap.set(texts, { opacity: 0 });

    return gsap
      .timeline()
      .fromTo([dormammuSpeechBubble, randomLoopText], { scale: 0 }, { scale: 1, opacity: 1, duration: 1 })
      .to([dormammuSpeechBubble, randomLoopText], { opacity: 0, duration: 1 }, '+=0.5');
  }

  createRandomTrap() {
    const traps = Object.keys(config.selectors.environment.traps);
    const randomIndex = getRandomInt(0, traps.length - 1);
    const trapName = traps[randomIndex];
    let trap;

    switch (trapName) {
      case 'spikes': {
        trap = this.createSpikes();

        break;
      }

      case 'beam': {
        trap = this.createBeam();

        break;
      }

      default: {
        trap = this.createSpikes();

        break;
      }
    }

    return trap;
  }

  createBeam() {
    const { beam } = config.selectors.environment.traps;

    return gsap
      .timeline()
      .fromTo(beam, { scale: 0 }, { scale: 1, opacity: 1, duration: 0.5 })
      .addLabel('outro')
      .to(beam, { opacity: 0, duration: 1 });
  }

  createSpikes() {
    const { container: spikesContainer, left, middle, right } = config.selectors.environment.traps.spikes;

    return gsap
      .timeline()
      .to(spikesContainer, { opacity: 1, duration: 1 })
      .to([left, middle, right], { x: '+=2', y: '+=2', yoyo: true, repeat: 31, duration: 0.01 })
      .fromTo(left, { x: 0, y: 0 }, { x: 300, y: -300, duration: 0.5, ease: 'power4.in' }, 'impale-start')
      .fromTo(right, { x: 0, y: 0 }, { x: -300, y: -300, duration: 0.5, ease: 'power4.in' }, 'impale-start+=0.1')
      .fromTo(middle, { x: 0, y: 0 }, { y: -300, duration: 0.5, ease: 'power4.in' }, 'impale-start+=0.2')
      .addLabel('outro')
      .to(spikesContainer, { opacity: 0, duration: 1 }, 'outro+=1');
  }

  setInfiniteLoops() {
    const { container: dormammuContainer } = config.selectors.dormammu;
    const { planet, small, medium, big, huge } = config.selectors.environment.planets;

    gsap.to(dormammuContainer, { x: '-= 5', y: '+= 15', duration: 3, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    gsap.to(planet, { scale: 0.94, duration: 3, repeat: -1, yoyo: true, stagger: 1.5 });
    gsap.to(small, { rotate: 360, duration: 50, repeat: -1, ease: 'none' });
    gsap.to(medium, { rotate: 360, duration: 40, repeat: -1, ease: 'none' });
    gsap.to(big, { rotate: 360, duration: 30, repeat: -1, ease: 'none' });
    gsap.to(huge, { rotate: 360, duration: 20, repeat: -1, ease: 'none' });
  }
}
