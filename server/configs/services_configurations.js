import { ServiceConfiguration } from 'meteor/service-configuration';

export default function () {
  ServiceConfiguration.configurations.update(
    { service: 'twitter' },
    {
      service: 'twitter',
      consumerKey: 'aY3nlmhqbJ5pnp8UysIJcdp10',
      loginStyle: 'popup',
      secret: 'wMDAf0kwweI1OvOKL06pD0u2se25A4xgabZtGehYjGMH6CEl3B'
    },
    { upsert: true }
  );

  ServiceConfiguration.configurations.update(
    { service: 'facebook' },
    {
      service: 'facebook',
      appId: '1120043108059273',
      secret: '01fa6b911b08ea1863e7c5728e39ac3b'
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
}
