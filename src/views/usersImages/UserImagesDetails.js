import React from "react";
import * as Icon from "react-feather"
import {
    Card,
    CardBody,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from "reactstrap";

import "../../assets/scss/pages/users.scss";
import DisplayImage from "../../components/DisplayImage";
import {Image} from "react-feather";

class UserImagesDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.images.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { images } = this.props;
        const { activeIndex } = this.state;

        if (images?.length === 0) return (
            <strong className="text-danger">
                <Image size={20} /> No image found for this user
            </strong>
        );

        const slides = images.map((item) => {
            return (
                <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.mediaId}>
                    {item.verified
                        ? <strong className="text-success"><Icon.Check size={20}/> Verified</strong>
                        : <strong className="text-danger"><Icon.X size={20}/> Not verified</strong>
                    }
                    <DisplayImage src={item?.chosenUrl} withPercentage />
                </CarouselItem>
            );
        });

        return (
            <>
                <Card>
                    <CardBody>
                        <div className="user-chats">
                            <div className="mx-auto">
                                <Carousel
                                    interval={false}
                                    activeIndex={activeIndex}
                                    next={this.next}
                                    previous={this.previous}>
                                    <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                    {slides}
                                    {(images.length > 1) && (
                                        <>
                                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                        </>
                                    )}
                                </Carousel>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </> 
        )
    }
}

export default UserImagesDetails
