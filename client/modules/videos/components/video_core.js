import React from 'react';
import { CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ImageWithPlaceholder from '../../core/components/image_with_placeholder';
import Preview from './preview';
import { truncate } from 'lodash';
import logo from '../configs/logo64';
import { styles } from './styles';

const VideoCore = ({video, fullWidhtDialog, watchingVideo, closeHandler}) => (
  <div>
    <CardMedia
      overlay={<CardTitle title={truncate(video.title, {separator: ' '})} />}
      >
      <ImageWithPlaceholder
        src={video.image}
        placeholderSrc={logo}
        style={styles.thumb}
        alt="youtube thumb image"
        />
    </CardMedia>
    <CardText>
      <div style={{overflowX: 'auto', padding: '5px 0 5px 5px', borderRight: 'solid 5px rgba(0,0,0,0)'}}>
        {video.description}
      </div>
    </CardText>
    <Preview
      video={video}
      style={styles.dialog}
      fullWidth={fullWidhtDialog}
      watching={watchingVideo}
      closeHandler={closeHandler}
    />
  </div>
);

export default VideoCore;
