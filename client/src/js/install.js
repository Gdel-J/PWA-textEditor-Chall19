const butInstall = document.getElementById("buttonInstall");

console.log('install.js working');

// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;

  //Remove the hidden class from the button
  butInstall.classList.toggle('hidden', false);
});

// Click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  console.log('I have been clicked');
  if (!promptEvent) {
    return;
  }

  //   //Show prompt
  promptEvent.prompt();

  //Reset the deffered prompt variable, it can only be used once.
  window.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);
  console.log('Working');
});

window.addEventListener('appinstalled', (event) => {
  //Clear prompt
  window.deferredPrompt = null;
});
