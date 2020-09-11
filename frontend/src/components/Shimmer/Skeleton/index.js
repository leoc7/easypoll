import React from 'react'
import { LineShimmer, CircleShimmer } from './styles';

export function Line({ width='100%', height='12px' }) {
    return (
        <LineShimmer style={{width, height}}></LineShimmer>
    )
}

export function Circle({ width='100%', height='12px' }) {
    return (
        <CircleShimmer style={{width, height}}></CircleShimmer>
    )
}


