export default {
  selectors: {
    strange: {
      container: '.dr-strange-character',
      speechBubble: '.dr-strange-speech-bubble',
      head: '.dr-strange-head' ,
      body: '.dr-strange-body',
      armLeft: '.dr-strange-arm-left',
      armRight: '.dr-strange-arm-right',
      legLeft: '.dr-strange-leg-left',
      legRight: '.dr-strange-leg-right',
      shadow: '.dr-strange-shadow',
    },
    dormammu: {
      container: '.dormammu-character',
      speechBubble: '.dormammu-speech-bubble',
      body: '.dormammu-body',
      shadow: '.dormammu-shadow',
      texts: {
        main: '.text-main',
        loop0: '.text-loop-0',
        loop1: '.text-loop-1',
      },
    },
    environment: {
      portal: '.portal',
      planets: {
        container: '.planets',
        planet: '.planet',
        small: '.small',
        medium: '.medium',
        big: '.big',
        huge: '.huge',
      },
      traps: {
        beam: '.dormammu-beam',
        spikes: {
          container: '.spikes',
          left: '.spike-left',
          middle: '.spike-middle',
          right: '.spike-right',
        },
        rock: {
          container: '.rock',
          initPos: { y: -500 },
          endPos: { y: 950 },
        }
      },
    },
  }
};
