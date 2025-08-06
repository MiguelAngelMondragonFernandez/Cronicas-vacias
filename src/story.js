import bgSchoolGate from './assets/backgrounds/school_gate.jpg';
import bgClassroom from './assets/backgrounds/classroom.jpg';
import rinAnnoyed from './assets/sprites/rin_annoyed.png';
import saberNormal from './assets/sprites/saber_normal.png';
import rinHappy from './assets/sprites/rin_happy.png';

export const storyData = {
  "chapter1": {
    "id": "chapter1",
    "title": "Capítulo 1: Resonancia Cristalizada",
    "script": {
      "start": {
        "background": "bgCityStreet",
        "bgm": "bgm_city_crowd",
        "character": "Naoko (Narración)",
        "text": "El bullicio de la calle me golpeaba de lleno al salir de la estación, el ambiente se sentía húmedo cosa que era una molestia porque no quería que mi cabello se vuelva grasoso. Gente iba y venía, los aerobuses deslizándose por las vías magnéticas con su característico zumbido suave, mientras las pantallas gigantes proyectaban todo tipo de productos en una mezcla de colores fríos, estos se reflejaban en los edificios, que eran tan altos que parecían tocar el techo del domo.",
        "next": "naoko_terminal"
      },
      "naoko_terminal": {
        "background": "bgCityStreet",
        "character": "Naoko",
        "text": "Mis ojos ya no se enfocaban en las cosas a mi alrededor, ignoraba a las personas, los drones, vehículos, edificios, tiendas... todo. Veía la pequeña pantalla que se desplegó desde mi terminal, que estaba ajustado en mi brazo izquierdo.",
        "next": "jina_chat_1"
      },
      "jina_chat_1": {
        "background": "bgCityStreet",
        "character": "Jina",
        "text": "Mira que eres suertuda, Nao te fuiste en buen momento. El jefe llegó y empezó a hablar como un holograma en bucle. (Por cierto se me olvidó mencionarte, me alegra que usaras ese perfume que te regalé el otro día).",
        "next": "naoko_chat_1"
      },
      "naoko_chat_1": {
        "background": "bgCityStreet",
        "character": "Naoko",
        "text": "En serio? Eso explica por qué nunca apareciste. Me quedé esperando cerca del Bar de Bashin que está cerca de la estación, quería tomarme unas bebidas contigo pero como no apareciste al final desistí y me fuí. (No soy de usar perfumes, pero tiene un olor a madera que se me hizo agradable, muchas gracias por el regalo).",
        "next": "jina_chat_2"
      },
      "jina_chat_2": {
        "background": "bgCityStreet",
        "character": "Jina",
        "text": "Me perdí unas bebidas? Nooo. Me quiero morir, pasado el fin de semana debemos ir a tomarnos unas copas allí, un sitio con clase para chicas con clase. (Lo elegí justo por eso, sabía que te gustaría).",
        "next": "naoko_chat_2"
      },
      "naoko_chat_2": {
        "background": "bgCityStreet",
        "character": "Naoko",
        "text": "Entonces te esperaré al salir, cuando llegue a la casa lo anotaré en el calendario. (Creo que me conoces mejor que mi propia hermana).",
        "next": "jina_chat_3"
      },
      "jina_chat_3": {
        "background": "bgCityStreet",
        "character": "Jina",
        "text": "Perfecto, lo anotaré y veré si hay que hacer reservación, ya sabes como es el sitio, casi nunca hay mesas disponibles. (Y gracias a eso tú invitas las copas).",
        "next": "naoko_chat_3"
      },
      "naoko_chat_3": {
        "background": "bgCityStreet",
        "character": "Naoko",
        "text": "Espera, espera... cuando dije que yo iba a apagar todo?",
        "next": "jina_chat_4"
      },
      "jina_chat_4": {
        "background": "bgCityStreet",
        "character": "Jina",
        "text": "Hasta mañana, Nao, besitos!",
        "next": "naoko_chat_4"
      },
      "naoko_chat_4": {
        "background": "bgCityStreet",
        "character": "Naoko",
        "text": "¡No cambies el tema!",
        "next": "news_alert"
      },
      "news_alert": {
        "background": "bgCityStreet",
        "character": "Narrador",
        "text": "[Revuelta en las residencias Lycoris. Posible sintético desconectado. Comisión Tengu interviene].",
        "next": "tengu_presence"
      },
      "tengu_presence": {
        "background": "bgCityCheckpoint",
        "sprites": [
          {
            "id": "guards",
            "image": "sprite_tengu",
            "position": "center"
          }
        ],
        "character": "Naoko",
        "text": "Levanto la mirada y noto algo inusual: la parada del aerobus estaba colapsada, llena de dispositivos de seguridad que se alinean en un perímetro claramente delimitado. Los uniformes de la comisión Tengu son inconfundibles, con esas máscaras que los hacen parecer casi inhumanos.",
        "next": "temple_path"
      },
      "temple_path": {
        "background": "bgTempleStreet",
        "character": "Naoko",
        "text": "Mejor tomo otro camino -murmuro para mí misma, desviando mis pasos hacia una calle lateral. No tengo intención de pasar horas esperando cuando puedo avanzar más rápido a pie - después de todo, tengo tiempo sin ir por allí. Sentí el cambio de atmósfera casi de inmediato. A medida que me alejaba, el ruido se disipaba lentamente, y la tranquilidad de la zona me envolvía.",
        "next": "impact_event"
      },
      "impact_event": {
        "background": "bgTempleExplosion",
        "sfx": "sfx_explosion",
        "character": "Naoko",
        "text": "En ese momento tuve una extraña sensación, detuve mi andar, estaba a pocos metros del templo y me di la vuelta, escuchaba un muy ligero silbido. Una extraña sombra luminosa se reflejaba al otro lado del cielo, o sea, había algo extraño al otro lado del domo. Tras un repentino destello escuché como algo se quiebra después de un muy fuerte impacto. El estruendo me dejó sorda, como si el sonido hubiese arrancado todo el aire a mi alrededor.",
        "next": "crystal_emerge"
      },
      "crystal_emerge": {
        "background": "bgTempleFire",
        "sprites": [
          {
            "id": "crystal",
            "image": "sprite_crystal",
            "position": "center"
          }
        ],
        "character": "Naoko",
        "text": "Un cristal... no, más bien un coloso de cristal, de al menos dos metros de altura, incrustado en el centro del templo, desentonaba con todo el lugar. Su superficie brillante reflejaba las llamas a su alrededor, distorsionando las luces y sombras en formas que parecían vivas, como si las mismas llamas estuvieran atrapadas dentro.",
        "next": "crystal_scan"
      },
      "crystal_scan": {
        "background": "bgTempleFire",
        "sprites": [
          {
            "id": "crystal",
            "image": "sprite_crystal",
            "position": "center"
          }
        ],
        "character": "Naoko",
        "text": "Mis dedos temblorosos se estiraron hacia la superficie brillante, ¿qué haces? ¡Detente! Pero antes de tocarla, una luz emergió del cristal, suave al principio, luego más intensa. Un rayo de luz azulada recorrió mi reflejo, escaneando el contorno de mi figura, desde la cabeza hasta los pies.",
        "next": "beast_awaken"
      },
      "beast_awaken": {
        "background": "bgTempleFire",
        "sprites": [
          {
            "id": "crystal_beast",
            "image": "sprite_crystal_beast",
            "position": "center"
          }
        ],
        "character": "Naoko",
        "text": "Entonces, el cristal empezó a dividirse. Al principio fue un crujido, como si algo se estuviera desgajando desde su interior, y luego vino el sonido. Era un chirrido áspero, agudo, como si un millón de uñas rasparan un vidrio al unísono. Un gruñido... o algo parecido a un gruñido, resonó desde el interior del templo.",
        "next": "relina_arrives"
      },
      "relina_arrives": {
        "background": "bgTempleFire",
        "sprites": [
          {
            "id": "relina",
            "image": "relina_battle",
            "position": "left"
          },
          {
            "id": "crystal_beast",
            "image": "sprite_crystal_beast",
            "position": "right"
          }
        ],
        "character": "Narrador",
        "text": "Una figura rápida y delgada se interpuso entre nosotros con una patada brutal que impactó directamente en el torso cristalino del monstruo, haciéndolo retroceder violentamente. Fue rápido, un barrido ágil y devastador, la lanza brilló y cortó el cuerpo del monstruo en dos, dividiéndolo de manera limpia.",
        "next": "relina_intro"
      },
      "relina_intro": {
        "background": "bgTempleFire",
        "sprites": [
          {
            "id": "relina",
            "image": "relina_battle",
            "position": "center"
          }
        ],
        "character": "Relina",
        "text": "¿Tú vives aquí? -dijo con una voz suave, pero en un idioma que no entendí. Había una musicalidad en sus palabras - ¿vives en Órbita Tres?",
        "next": "naoko_confused"
      },
      "naoko_confused": {
        "background": "bgTempleFire",
        "character": "Naoko",
        "text": "Negué con la cabeza, mi voz apenas un susurro-. No... no te entiendo...",
        "next": "relina_resonance"
      },
      "relina_resonance": {
        "background": "bgTempleFire",
        "sprites": [
          {
            "id": "relina",
            "image": "relina_battle",
            "position": "center"
          }
        ],
        "character": "Relina",
        "text": "Ahora, ¿puedes entenderme? -me dijo ella de repente en mi idioma. - perfecto, me alegro que la resonancia haya funcionado.",
        "next": "flee_scene"
      },
      "flee_scene": {
        "background": "bgCityRain",
        "sprites": [
          {
            "id": "relina",
            "image": "relina_battle",
            "position": "left"
          }
        ],
        "character": "Relina",
        "text": "Me llamo Relina, soy una thane de Órbita Dos -su voz me trajo de regreso a la realidad - quiero que me respondas algo. ¿Por qué Órbita Tres no está destruida?",
        "next": "naoko_response_flee"
      },
      "naoko_response_flee": {
        "background": "bgCityRain",
        "character": "Naoko",
        "text": "¿Ó-órbita tres? -no supe qué responder- no sé a qué te refieres...",
        "next": "relina_flee_2"
      },
      "relina_flee_2": {
        "background": "bgCityRain",
        "character": "Relina",
        "text": "Primero debemos refugiarnos, se acerca la precipitación.",
        "next": "end_chapter"
      },
      "end_chapter": {
        "character": "Naoko (Narración)",
        "text": "Aún confundida traté de decir una palabra, pero una gota cayó en mi nariz. Alcé la vista y vi que el domo ahora estaba nublado. Quizás hicieron llover por la zona para calmar el fuego. Las sirenas de la comisión tengu me aturdía. Espera, espera, esta persona, ¿es a quién están buscando? - Acaso... ¿ahora soy fugitiva? - la pregunta se repitió como un eco en mi frente mientras ambas avanzábamos huyendo de la zona.",
        "end": true,
        "next": "chapter2"
      }
    }
  }
};