import './ChibiModal_master.css'

import BlackBanner from '../BlackBanner/BlackBanner'

import chibiModalInfo from '../../utilities/chibiModalInfo'

const ChibiModal = ({
    showModal,
    status = "info",
    headerText,
    bodyText,
    showCancelButton = false,
    cancelButtonText = "Cancel",
    confirmButtonText = "OK"
}) => {
    return (
        <>
            <div className={`${!showModal && "hide-modal"} chibi-modal-container`}>
                {chibiModalInfo[status].icon}
                <p>{headerText}</p>
                <p>{bodyText}</p>

                <div className="chibi-modal-buttons">
                    <button className="btn-confirm">{confirmButtonText}</button>
                    {showCancelButton && 
                    <button className="btn-cancel">{cancelButtonText}</button>
                }
                </div>
            </div>
            <BlackBanner isVisible={showModal}/>
        </>
    )
}

export default ChibiModal
