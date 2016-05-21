import { ServiceConfiguration } from 'meteor/service-configuration';

const env = process.env.NODE_ENV || 'development';


export default function () {
  // Heroku service configuration
  if (env === 'heroku') {
    ServiceConfiguration.configurations.update(
      { service: 'twitter' },
      {
        service: 'twitter',
        consumerKey: 'herokutwitterKey',
        loginStyle: 'popup',
        secret: 'herokutwitterSecret'
      },
      { upsert: true }
    );

    ServiceConfiguration.configurations.update(
      { service: 'facebook' },
      {
        service: 'facebook',
        appId: 'herokufacebookKey',
        secret: 'herokufacebookSecret'
      },
      { upsert: true}
    );

    ServiceConfiguration.configurations.update(
      { service: 'google' },
      {
        service: 'google',
        clientId: 'herokugoogleKey',
        secret: 'herokugoogleSecret'
      },
      { upsert: true}
    );

  // Default service Configuration
  } else {
    ServiceConfiguration.configurations.update(
      { service: 'twitter' },
      {
        service: 'twitter',
        consumerKey: 'twitterKey',
        loginStyle: 'popup',
        secret: 'twitterSecret'
      },
      { upsert: true }
    );

    ServiceConfiguration.configurations.update(
      { service: 'facebook' },
      {
        service: 'facebook',
        appId: 'facebookKey',
        secret: 'facebookSecret'
      },
      { upsert: true}
    );

    ServiceConfiguration.configurations.update(
      { service: 'google' },
      {
        service: 'google',
        clientId: 'googleKey',
        secret: 'googleSecret'
      },
      { upsert: true}
    );
  }

}
