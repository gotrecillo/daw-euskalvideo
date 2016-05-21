import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import { styles } from './styles';

const Feature = ({ feature }) => (
  <Card zDepth={2} style={styles.feature.item}>
    <CardTitle title={feature.title} titleStyle={styles.feature.title}/>
    <CardText>
      <FontIcon className={feature.iconClass} style={styles.feature.icon}/>
    </CardText>
    <CardText style={styles.feature.text}>{feature.text}</CardText>
  </Card>
);

export default Feature;
