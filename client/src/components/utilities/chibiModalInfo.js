import { FaExclamation, FaCheck, FaTimes } from 'react-icons/fa'

const chibiModalInfo = {
    "success": {
        icon: <FaCheck className="chibi-modal-success"/>
    },
    "info": {
        icon: <FaExclamation className="chibi-modal-info"/>
    },
    "danger": {
        icon: <FaTimes className="chibi-modal-danger"/>
    },
}

export default chibiModalInfo