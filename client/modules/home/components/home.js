import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Feature from './feature';
import { styles } from './styles';
import Slider from './slider';


const style = {
  margin: 12,
  color: 'white',
};

const Home = ({ features, navigate, social }) => (
  <Card>
    <Slider navigate={navigate} />
    <CardText style={styles.feature.container}>
      { features.map(feature => <Feature key={feature.title} feature={feature} />) }
    </CardText>
    <CardText style={styles.button.container}>
      <RaisedButton
        zDepth={2}
        label="Empieza a usarla"
        onTouchTap={navigate.bind(this, '/login')}
        backgroundColor={styles.button.backgroundColor}
        labelStyle={{color: styles.button.color}}
      />
    </CardText>
    <CardText style={styles.footer.container}>
      <h2 style={styles.footer.title}>Compartenos en:</h2>
      {
        social.map(socialIcon => (
          <FlatButton
            linkButton
            target="_blank"
            href={socialIcon.getUrl()}
            key={socialIcon.icon}
            backgroundColor={socialIcon.color}
            hoverColor={socialIcon.hoverColor}
            icon={<FontIcon className={`fa fa-${socialIcon.icon}`} />}
            style={style}
          />
        ))
      }
      <p>Desarrollada por: <a style={styles.footer.link} href="https://github.com/gotrecillo">Sergio Panadero Perez</a></p>
      <p>&copy; 2016</p>
    </CardText>
  </Card>
);

export default Home;
