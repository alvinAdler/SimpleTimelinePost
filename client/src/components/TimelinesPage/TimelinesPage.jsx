import { useState } from 'react'
import swal from 'sweetalert2'

import "./TimelinesPage_master.css"

import PlaceholderJumbotron from '../utilityComponents/PlaceholderJumbotron/PlaceholderJumbotron'
import ChibiModal from '../utilityComponents/ChibiModal/ChibiModal'

const TimelinesPage = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <PlaceholderJumbotron title="Timelines Page"/>
            <button className="btn btn-primary" onClick={() => setShowModal(!showModal)}>Sample Modal</button>
            <button className="btn btn-success" onClick={() => console.log(swal.fire)}>Print Swal</button>

            <ChibiModal 
            showModal={showModal}
            onHide = {() => setShowModal(!showModal)}
            onConfirm={() => console.log("Something")}
            headerText="Hello World"
            bodyText="Lorem ipsum dolor sit amet adipisincing dolor ela borat"
            showCancelButton={true}
            />
        </div>
    )
}

export default TimelinesPage
