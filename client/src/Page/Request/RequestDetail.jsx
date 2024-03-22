import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function RequestDetail() {
    const { id } = useParams();
    useEffect(() => {
        console.log('Request ID:', id);
    })
    return (
        <div>RequestDetail</div>
    )
}

export default RequestDetail