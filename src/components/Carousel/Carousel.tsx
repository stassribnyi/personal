import React, { Children, useEffect, useRef } from 'react';

import Glide, { Options } from '@glidejs/glide';

import { Styled } from './Carousel.styles';

export type CarouselProps = Readonly<{
    options?: Options
}>;

export const DEFAULT_OPTIONS: Options = {
    autoplay: 15000,
    type: "carousel",
    dragThreshold: 60,
    hoverpause: false,
    swipeThreshold: 60,
    animationDuration: 1000,
    animationTimingFunc: "cubic-bezier(0.6, 0, 0.14, 1)"
};

export const Carousel: React.FC<CarouselProps> = (({ options = DEFAULT_OPTIONS, children }) => {
    const sliderRef = useRef<HTMLDivElement>();

    useEffect(() => {
        const slider = new Glide(sliderRef.current, options).mount();

        return () => slider.destroy();
    }, [options]);

    return (
        <Styled.Container ref={sliderRef}>
            <Styled.Track data-glide-el="track">
                <Styled.List>
                    {Children.map(children, (item, idx) => (
                        <Styled.Item key={idx}>{item}</Styled.Item>
                    ))}
                </Styled.List>
            </Styled.Track>
        </Styled.Container>
    );
});
