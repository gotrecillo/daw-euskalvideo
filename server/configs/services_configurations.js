import { ServiceConfiguration } from 'meteor/service-configuration';
const env = process.env.NODE_ENV || 'development';

export default function () {
  // Heroku applications
  if (env === 'heroku') {

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
        clientId: '815961498716-shif5kse7n5jculjmr76hh4er5k3bi76.apps.googleusercontent.com',
        secret: 'UUUhPbf8Y32bQJVbGByZc4CK'
      },
      { upsert: true}
    );

  // LocalHost applications
  } else {
    ServiceConfiguration.configurations.update(
      { service: 'twitter' },
      {
        service: 'twitter',
        consumerKey: 'RobER8fOnYxLEO0JQUqidWPCh',
        loginStyle: 'popup',
        secret: 'uYkrfaUAkrbHEwZTDWxZ6M6GWwSXCUD9wEW68VF5Mwys3J2ikd'
      },
      { upsert: true }
    );

    ServiceConfiguration.configurations.update(
      { service: 'facebook' },
      {
        service: 'facebook',
        appId: '569800213187423',
        secret: 'e15f603163bb63ba3cdd76efc1113a13'
      },
      { upsert: true}
    );

    ServiceConfiguration.configurations.update(
      { service: 'google' },
      {
        service: 'google',
        clientId: '983441373085-pbheeeaa5teq032hp209tlu85lmikg29.apps.googleusercontent.com',
        secret: 'fTKXmJa7fsPNLRqNcEp0L6F1'
      },
      { upsert: true}
    );
  }

}
