/**
 *  A THREEJS wrapper function that allows GUI to connect to the web workers.
 *  This file is for the Worker.
 *  Sadly, this is only a simple example, not for sofisticated works. :(
 *  @param {Function} callback, the callback function to run, passes the key
 *  and value from the GUIHelperUI.
 */

const GUIHelperWorker = (callback) => {
  self.addEventListener('message', ev => {
    let { id, key, value } = ev.data;
    if ( id === 'GUIHelperUIUpdate' ) {
      callback(key, value);
    }
  });
};

export default GUIHelperWorker;
