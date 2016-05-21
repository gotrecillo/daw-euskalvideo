import publications from './publications';
import methods from './methods';
import addInitialData from './configs/initial_adds.js';
import configureServices from './configs/services_configurations.js';
import addDefaultUsers from './configs/default_users.js';
import setUpAccountsConfig from './configs/accounts.js';

publications();
methods();
addInitialData();
configureServices();
addDefaultUsers();
setUpAccountsConfig();
