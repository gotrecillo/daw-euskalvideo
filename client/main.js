import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import commentsModule from './modules/comments';
import usersModule from './modules/users';
import videos from './modules/videos';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(usersModule);
app.loadModule(commentsModule);
app.loadModule(videos);
app.init();
