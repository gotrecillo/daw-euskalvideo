import React from 'react';
import Dialog from 'material-ui/Dialog';

const Preview = ({video, fullWidth, watching, closeHandler, style}) => {
  const { id } = video;
  const dialogWidth = (fullWidth) ? '100%' : '50%';
  return (
    <Dialog
      style={style}
      contentStyle={{width: dialogWidth}}
      open={watching}
      onRequestClose={closeHandler}
      autoScrollBodyContent
      >
      <div className="embed-container">
        <iframe
          id="ytplayer"
          type="text/html"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          frameBorder="0"
        />
      </div>
    </Dialog>
  );
};

export default Preview;
