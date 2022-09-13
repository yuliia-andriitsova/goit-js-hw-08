import Player from '@vimeo/player';
import Throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
// сделали переменную для ключа
const timeKey = 'videoplayer - current - time';

//создали ф-ю для колбека, кот достает из объека тайм апдейт секуны

function durationSaveToStorage({ seconds }) {
  localStorage.setItem(timeKey, seconds);
}

// проерка на перезагрузку страницы и ф-я срабатывает после перезагрузки страницы
window.addEventListener('load', newStart);

player.on('timeupdate', Throttle(durationSaveToStorage, 1000));

function newStart(params) {
  if (!localStorage.getItem(timeKey)) {
    return;
  }
  const currentVideoTime = localStorage.getItem(timeKey);

  player
    .setCurrentTime(currentVideoTime)
    .then(() => {
      player.play();
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
