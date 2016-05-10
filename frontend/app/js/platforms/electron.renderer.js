import os from 'os';
import Main from '../main.js';
import { hashHistory } from 'react-router'

window.BACKEND_ENDPOINT = (process.env.NODE_ENV !== 'production')
  ? `http://localhost:5000`
  : `http://podq.devstd.io`


const main = new Main({
  history: hashHistory
});

// Global play key workaround
if (os.platform() === 'linux') {
  const DBus = window.require('dbus');
  const dbus = new DBus();
  const session = dbus.getBus('session');
  registerBindings('gnome', session);

  function registerBindings(desktopEnv, session) {
    session.getInterface(`org.${desktopEnv}.SettingsDaemon`,
    `/org/${desktopEnv}/SettingsDaemon/MediaKeys`,
    `org.${desktopEnv}.SettingsDaemon.MediaKeys`, (err, iface) => {
      if (!err) {
        iface.on('MediaPlayerKeyPressed', (n, keyName) => {
          console.log(keyName);
          if (keyName === 'Play') {
            playButton.click();
          }
        });
        iface.GrabMediaPlayerKeys(0, `org.${desktopEnv}.SettingsDaemon.MediaKeys`); // eslint-disable-line
      }
    });
  }
}
