/* eslint-disable react/prop-types */

const Notification = ({ text, type }) => {
    if (text === null || !type) {
        return null
    }

    return (
        <div className={type}>
            {text}
        </div>
    )
}

export default Notification;