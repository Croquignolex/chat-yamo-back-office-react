import React from "react";
import Select from "react-select";
import Cropper from 'react-easy-crop';
import {Button, Label} from "reactstrap";

class CroupArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: { x: 0, y: 0 },
            zoom: 2,
            aspect: 1,
            croppedAreaPixels: null,
            type: {label: 'Square', value: 1}
        }
    }

    updateTypeSelect = (type) => {
        this.setState({aspect: type.value, type});
    };

    render() {
        const croupContainerStyle = {
            position: 'relative',
            width: '100%',
            height: 400,
            background: '#fff'
        };
        const selectItems = [
            {label: 'Square', value: 1},
            {label: 'Landscape 1', value: 4/3},
            {label: 'Landscape 2', value: 6/3},
            {label: 'Landscape 3', value: 8/3},
            {label: 'Portrait 1', value: 11/12},
            {label: 'Portrait 2', value: 11/14},
            {label: 'Portrait 3', value: 11/16},
        ];

        const { crop, zoom, aspect, type, croppedAreaPixels } = this.state;
        const { src, handleModal } = this.props;

        return (
            <>
                <div style={croupContainerStyle}>
                    <Cropper
                        aspect={aspect}
                        crop={crop}
                        image={src}
                        zoom={zoom}
                        onZoomChange={(data) => this.setState({zoom: data})}
                        onCropChange={(data) => this.setState({crop: data})}
                        onCropComplete={(croppedArea, pixels) => this.setState({croppedAreaPixels: pixels})}
                    />
                </div>
                <div className="mt-2 controls text-center">
                    <Label>Zoom</Label>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e) => this.setState({zoom: e.target.value})}
                        className="form-control-range col-centered w-50 zoom-range"
                    />
                </div>
                <div className="mt-2 text-center">
                    <Label>Shape</Label>
                    <Select
                        className="col-centered w-50 text-left"
                        value={type}
                        options={selectItems}
                        onChange={this.updateTypeSelect}
                    />
                </div>
                <div className="mt-50">
                    <Button color="primary" className="rounded" onClick={() => handleModal(src, croppedAreaPixels)}>
                        Croup
                    </Button>
                </div>
            </>
        )
    }
}

export default CroupArea;
