import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap'

import './PageSpinner_master.css'

import BlackBanner from '../BlackBanner/BlackBanner'

const PageSpinner = ({message = "Loading", isShow = true, opacity}) => {

    useEffect(() => {
        document.querySelector("body").style.overflowY = "hidden"

        return () => {
            document.querySelector("body").style.overflowY = "auto"
        }
    }, [])

    return(
        <div className={`${!isShow && "hidden-spinner"} page-spinner-container`}>
            <p>{message}</p>
            <div className="spinners">
                <Spinner className="custom-spinner" animation="grow"/>
                <Spinner className="custom-spinner" animation="grow"/>
                <Spinner className="custom-spinner" animation="grow"/>
            </div>
            <BlackBanner isVisible={true} opacity={opacity}/>
        </div>
    );
};

export default PageSpinner;
