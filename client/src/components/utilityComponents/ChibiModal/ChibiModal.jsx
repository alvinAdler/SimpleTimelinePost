import './ChibiModal_master.css'

import BlackBanner from '../BlackBanner/BlackBanner'
import chibiModalInfo from '../../utilities/chibiModalInfo'

const ChibiModal = ({
    showModal,
    onHide,
    onConfirm,
    status = "info",
    headerText,
    bodyText,
    showCancelButton = false,
    cancelButtonText = "Cancel",
    confirmButtonText = "OK"
}) => {
    return (
        <>
            <div className={`${!showModal ? "hide-modal" : "active-modal"} chibi-modal-container`}>
                {chibiModalInfo[status].icon}
                <p className="chibi-header-text">{headerText}</p>
                <p className="chibi-body-text">{bodyText}</p>

                <div className="chibi-modal-buttons">
                    {showCancelButton && 
                    <button className="chibi-btn-cancel"
                    onClick={onHide}
                    >
                        {cancelButtonText}
                    </button>
                    }

                    <button className="chibi-btn-confirm"
                    onClick={onConfirm ? 
                        () => {
                            onConfirm()
                            onHide()
                        } 
                        : 
                        onHide
                    }
                    >
                        {confirmButtonText}
                    </button>

                </div>
            </div>
            <BlackBanner isVisible={showModal} onClick={onHide}/>
        </>
    )
}

export default ChibiModal
