function toggleText() {
  const toggleButton = document.querySelector('.toggle-text-button');
  const textBlock = document.querySelector('#text');

  toggleButton.addEventListener('click', function() {
    if (textBlock.hidden === true) {
      textBlock.hidden = false;
    } else {
      textBlock.hidden = true;
    }
  });
}
