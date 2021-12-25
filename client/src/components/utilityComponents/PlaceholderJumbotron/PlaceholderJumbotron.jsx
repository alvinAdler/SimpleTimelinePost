import React from 'react'

import styles from './PlaceholderJumbotron_master.module.css'

const PlaceholderJumbotron = ({title = "Placeholder Title"}) => {
    return (
        <div className={styles.jumbotron_container}>
            <h2>{title}</h2>
            <p className="lead">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam, ullam.</p>
            <hr className="my-4" />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam similique dolore repudiandae quisquam officia accusamus voluptatum fuga unde voluptatem nesciunt.</p>
        </div>
    )
}

export default PlaceholderJumbotron
