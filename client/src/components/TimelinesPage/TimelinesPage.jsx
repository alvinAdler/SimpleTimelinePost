import { useState } from 'react'

import styles from "./TimelinesPage_master.module.css"

import PlaceholderJumbotron from '../utilityComponents/PlaceholderJumbotron/PlaceholderJumbotron'
import ChibiModal from '../utilityComponents/ChibiModal/ChibiModal'

const TimelinesPage = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <PlaceholderJumbotron title="Timelines Page"/>
            <button className="btn btn-primary" onClick={() => setShowModal(!showModal)}>Sample Modal</button>
            <button className="btn btn-danger" onClick={() => console.log("test")}>Test</button>

            <ChibiModal 
            showModal={showModal}
            headerText="Hello World"
            bodyText="Lorem ipsum dolor sit amet adipisincing dolor ela borat"
            />
        </div>
    )
}

export default TimelinesPage
