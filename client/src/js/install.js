const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
event.preventDefault();
// Store the triggered events
window.deferredPrompt = event;

//Remove the hidden class from the button
butInstall.classList.toggle('hidden', false);
});



// Click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

const promptEvent = window.defferedPrompt;
if (!promptEvent) {
    return;
}    
//Show prompt
promptEvent.prompt();

//Reset the deffered prompt variable, it can only be used once.
window.defferedPrompt = null;

butInstall.ClassList.toggle('hidden', true);

});


window.addEventListener('appinstalled', (event) => {
    //Clear prompt
    window.defferedPrompt = null;
});




