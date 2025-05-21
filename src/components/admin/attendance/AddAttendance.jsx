import React, { useState } from 'react'

const AddAttendance = () => {
    const [formData, setFormData] = useState({
        lecturerId : "",
        studentIds : [],
        deviceId : "",
        timeStart : "",
        timeEnd : ""
    })
  return (
    <div>AddAttendance</div>
  )
}

export default AddAttendance