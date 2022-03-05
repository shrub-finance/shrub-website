import React, { useState, useEffect } from 'react'
import CountDownTimer from './CountDownTimer'
import classNames from 'classnames';
import Image from "../../elements/Image";
import { motion } from 'framer-motion';
import { isMobile, isSafari } from "react-device-detect";
const ImageData = [
    require('../../../assets/images/emptypot.svg'),
    require('../../../assets/images/pot with soul.svg'),
    require('../../../assets/images/stage_2.svg'),
    require('../../../assets/images/stage_3.svg'),
    require('../../../assets/images/stage_4.svg'),
    require('../../../assets/images/stage_5.svg')
]
const noOfImg = ImageData.length;
export default function Chapter3({
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    pushLeft,
    ...props
}) {
    const tilesClasses = classNames(
        'tiles-wrap center-content',
        pushLeft && 'push-left'
    );
    const innerClasses = classNames(
        'hero-inner section-inner',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    );
    const [currentImgCounter, setCurrentImgCounter] = useState(0);
    useEffect(() => {
        const imgCounter = setInterval(() => {
            if (currentImgCounter <= noOfImg) {
                setCurrentImgCounter(previousvalue => {
                    if (previousvalue === (noOfImg - 1)) {
                        return 0;
                    }
                    return previousvalue + 1
                })
            }
        }, 3000);
    }, []);

    return (
        <>
            <div className="center-content">
                <div style={{ fontWeight: "600" }}>
                    <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                        Chapter 3
                    </p>
                </div>
                <h2 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200" style={{ paddingTop: '20px' }}>
                    TIME TO GROW
                </h2>
            </div>
            <div>
                <CountDownTimer tillTime='march 6,2022 09:14:00'></CountDownTimer>
            </div>
            <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'loop',
                }}
                className="container"
                >
                <div className={innerClasses}>
                    <div className={tilesClasses}>
                        <Image className="reveal-from-bottom" style={{ width: "80%", height: "intrinsic" }}
                            src={ImageData[currentImgCounter]}
                            alt="Seed Grow" />
                    </div>
                </div>
            </motion.div>
        </>
    )
}
