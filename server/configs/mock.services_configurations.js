import { ServiceConfiguration } from 'meteor/service-configuration';

export default function () {
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
