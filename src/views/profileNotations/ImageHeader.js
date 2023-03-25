import React from "react";
import * as Icon from "react-feather";
import {Button, Input, Form} from "reactstrap";

class ImageSidebar extends React.Component {
    // props { activeChatId, verified, mainSidebar, handleActiveChat, handleUserSidebar, updateImagesToVerify, handleResetImage, handleImagesToNotate }
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
    }

    updateSearchInput = (e) => {
        const search = e?.target?.value;
        this.setState({search})
    };

    refresh = () => {
        this.setState({search: ""});
        this.props.loadData();
    };

    render() {
        const { search } = this.state;
        const { verified, toVerify, handleSearch } = this.props;

        return (
            <div className="d-flex justify-content-between mb-50">
                <div>
                    <Form className="d-flex mx-auto " onSubmit={(e) => handleSearch(e, search)}>
                        <div className="position-relative">
                            <Input
                                type="text"
                                className="search-width"
                                placeholder="Search verification by user id..."
                                onChange={this.updateSearchInput}
                                value={search}
                            />
                            <div className="form-control-position">
                                <Icon.X size={15} onClick={this.refresh} />
                                {/*<Icon.X size={15} onClick={() => this.setState({search: "" })} />*/}
                            </div>
                        </div>
                        <div className="ml-1">
                            <Button size="sm" color="primary" className="rounded" type="submit" title="Search">
                                <Icon.Search size={20} />
                            </Button>
                        </div>
                    </Form>
                </div>
                <div>
                    <strong className="text-primary">{verified}</strong> noted profile(s) / <strong className="text-primary">{toVerify}</strong> profile(s) to note
                    <Button color="primary" className="ml-50 rounded" onClick={this.refresh} size="sm">
                        <Icon.RefreshCcw size={15} />
                    </Button>
                </div>
            </div>
        );
    }
}

export default ImageSidebar;
