import { FaExclamation, FaCheck, FaTimes } from 'react-icons/fa'

const chibiModalInfo = {
    "success": {
        icon: <FaCheck className="chibi-status-icon chibi-success"/>
    },
    "info": {
        icon: <FaExclamation className="chibi-status-icon chibi-info"/>
    },
    "danger": {
        icon: <FaTimes className="chibi-status-icon chibi-danger"/>
    },
}

export default chibiModalInfo