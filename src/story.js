import bgSchoolGate from './assets/backgrounds/school_gate.jpg';
import bgClassroom from './assets/backgrounds/classroom.jpg';
import rinAnnoyed from './assets/sprites/rin_annoyed.png';
import saberNormal from './assets/sprites/saber_normal.png';
import rinHappy from './assets/sprites/rin_happy.png'; // Assuming you have this asset

export const storyData = {
  chapter1: {
    id: 'chapter1',
    title: 'Capítulo 1: Un Encuentro Predestinado',
    script: {
      'start': {
        background: bgSchoolGate,
        bgm: 'bgm_school',
        sprites: [{ id: 'rin', image: rinAnnoyed, position: 'right' }],
        character: 'Rin Tohsaka',
        text: 'Hmph. Llegas tarde, como siempre. ¿Crees que tengo todo el día para esperarte?',
        next: 'saber_appears', 
      },
      'saber_appears': {
        background: bgSchoolGate,
        sprites: [
          { id: 'rin', image: rinAnnoyed, position: 'right' },
          { id: 'saber', image: saberNormal, position: 'left' },
        ],
        character: 'Saber',
        text: 'Cálmate, Rin. No ha sido su intención. Hemos encontrado algunos problemas en el camino.',
        next: 'rin_choice_1',
      },
      'rin_choice_1': {
        type: 'choice', 
        choices: [
          {
            text: '"¿Qué clase de problemas?"',
            next: 'ask_about_problems', 
          },
          {
            text: '"Lo siento, no volverá a pasar."',
            next: 'apologize',
          },
          {
            text: '[Quedarse en silencio]',
            next: 'stay_silent',
          }
        ]
      },
      'ask_about_problems': {
        background: bgSchoolGate,
        sprites: [{ id: 'rin', image: rinHappy, position: 'right' }],
        character: 'Rin Tohsaka',
        text: 'Oh, ¿"problemas"? Eso suena mucho más interesante que una simple disculpa. Cuéntamelo todo.',
        next: 'end_chapter',
      },
      'apologize': {
        background: bgSchoolGate,
        sprites: [{ id: 'rin', image: rinAnnoyed, position: 'right' }],
        character: 'Rin Tohsaka',
        text: 'Hmph. Más te vale. La puntualidad es una virtud. No lo olvides.',
        next: 'end_chapter',
      },
      'stay_silent': {
        background: bgSchoolGate,
        sprites: [{ id: 'rin', image: rinAnnoyed, position: 'right' }],
        character: 'Rin Tohsaka',
        text: '... ¿Nada que decir? Qué aburrido. En fin, no perdamos más el tiempo.',
        next: 'end_chapter',
      },
      'end_chapter': {
        character: null,
        text: 'La conversación continuó, marcada por la elección que acababa de hacer.',
        end: true,
        next: 'chapter2', // Transition to the next chapter
      }
    }
  },
  chapter2: {
    id: 'chapter2',
    title: 'Capítulo 2: El Aula Después de Clases',
    script: {
        'start': {
            background: bgClassroom,
            sprites: [{ id: 'saber', image: saberNormal, position: 'center', visible: true }],
            character: 'Saber',
            text: 'Este lugar me trae recuerdos... aunque no son míos. Es una sensación extraña.',
            next: 'saber_stares'
        },
        'saber_stares': {
            background: bgClassroom,
            sprites: [{ id: 'saber', image: saberNormal, position: 'center', visible: true }],
            character: null, 
            text: 'Saber miraba por la ventana, con una expresión melancólica en su rostro.',
            end: true,
        },
    }
  },
};