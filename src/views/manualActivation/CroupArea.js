import React from "react";
import { Button} from "reactstrap";
import Cropper from 'react-easy-crop';

class CroupArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: { x: 0, y: 0 },
            zoom: 1,
            croppedAreaPixels: null
        }
    }

    render() {
        const croupContainerStyle = {
            position: 'relative',
            width: '100%',
            height: 400,
            background: '#fff'
        };

        const { crop, zoom, croppedAreaPixels } = this.state;
        const { src, handleModal } = this.props;

        return (
            <>
                <div style={croupContainerStyle}>
                    <Cropper
                        aspect={1}
                        crop={crop}
                        image={src}
                        zoom={zoom}
                        onZoomChange={(data) => this.setState({zoom: data})}
                        onCropChange={(data) => this.setState({crop: data})}
                        onCropComplete={(croppedArea, pixels) => this.setState({croppedAreaPixels: pixels})}
                    />
                </div>
                <div className="mt-2">
                    <Button color="primary" className="rounded" onClick={() => handleModal(src, croppedAreaPixels)}>
                        Croup
                    </Button>
                </div>
            </>
        )
    }
}

export default CroupArea;
