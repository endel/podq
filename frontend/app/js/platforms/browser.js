import Main from '../main.js';
import { browserHistory } from 'react-router'

window.BACKEND_ENDPOINT = (process.env.NODE_ENV !== 'production')
  ? `${ location.protocol }//${ location.hostname }:5000`
  : `${ location.protocol }//podq.devstd.io`

const main = new Main({
  history: browserHistory
});
