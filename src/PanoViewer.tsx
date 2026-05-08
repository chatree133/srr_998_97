import React from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

interface PanoViewerProps {
  src: string;
}

const PanoViewer: React.FC<PanoViewerProps> = ({ src }) => {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: '500px' }}>
      <ReactPhotoSphereViewer
        src={src}
        height="100%"
        width="100%"
        navbar={['zoom', 'move', 'caption', 'fullscreen']}
        defaultZoomLvl={0}
        panoData={(image) => ({
          fullWidth: image.width,
          fullHeight: Math.round(image.width / 2),
          croppedWidth: image.width,
          croppedHeight: image.height,
          croppedX: 0,
          croppedY: Math.round((image.width / 2 - image.height) / 2),
        })}
      />
    </div>
  );
};

export default PanoViewer;
