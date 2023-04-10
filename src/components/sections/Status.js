import React, {useState, useEffect, useCallback} from 'react';
import classNames from 'classnames';
import {SectionProps} from '../../utils/SectionProps';

const propTypes = {
    ...SectionProps.types
}

const parseQueryParams = (search) => {
    const queryParams = {};
    const queryString = search.slice(1);
    const pairs = queryString.split('&');

    pairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return queryParams;
};


const defaultProps = {
    ...SectionProps.defaults
}


const Status = ({
                    className,
                    topOuterDivider,
                    bottomOuterDivider,
                    topDivider,
                    bottomDivider,
                    hasBgColor,
                    invertColor,
                    ...props
                }) => {


    const outerClasses = classNames(
        'hero section center-content',
        topOuterDivider && 'has-top-divider',
        bottomOuterDivider && 'has-bottom-divider',
        hasBgColor && 'has-bg-color',
        invertColor && 'invert-color',
        className
    );

    const innerClasses = classNames(
        'hero-inner section-inner',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    );


    const handleResponse = useCallback((code, subKey = '') => {
        const STATUS_MAP = {
            '200': {message: 'Email already verified'},
            '200_v_s': {message:'Thanks for signing up for the Shrub waitlist. You are all set! 💃'},
            '201': {message: 'Email successfully received and verification email sent 🚀'},
            '400_i_e': {error: 'Invalid email format.'},
            '400_h_r': {error: 'Hash is required.'},
            '400_e_r': {error: 'Email is required.'},
            '400_v_f': {error: '❗Email could not be verified. Please try again or report in Shrub Discord.'},
            '404_m_i': {error: 'Seems like the email was not formatted right. Please try again or report in Shrub Discord.'},
            '429': {error: 'We got too many requests 😬, please wait a minute and try again.'},
            '500': {error: 'Something went wrong. 😬'}
        };
        const key = subKey ? `${code}_${subKey}` : code;
        const result = STATUS_MAP[key] || {error: 'Unexpected status code'};

        return result;
    }, []);


    const [response, setResponse] = useState({});

    useEffect(() => {
        const parsedQueryParams = parseQueryParams(window.location.search);
        const code = parsedQueryParams.code;
        const subKey = parsedQueryParams.subKey;

        if (code) {
            const result = handleResponse(code, subKey);
            setResponse(result);
        } else {
            setResponse({error: 'No status to display.'});
        }
    }, [handleResponse]);

    return (
        <section
            className={outerClasses}
        >
            <div className="container">
                <div className={innerClasses}>
                    <div className="hero-content" style={{marginTop: "10%"}}>
                        {response.message && <h4 className="mt-0 mb-16" style={{fontWeight: 400}}
                                                 data-reveal-delay="200">
                            {response.message}
                        </h4>}
                        {response.error && <h4 className="mt-0 mb-16" style={{fontWeight: 400}}
                                               >
                            {response.error}
                        </h4>}
                    </div>
                </div>
            </div>
        </section>
    );
}


Status.propTypes = propTypes;
Status.defaultProps = defaultProps;

export default Status;
