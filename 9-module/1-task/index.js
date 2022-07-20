export default function promiseClick(button) {
  return new Promise((resolve)=> {
    button.addEventListener('click', function(evt) {
      resolve(evt);
    }, { once: true });
  });
}
