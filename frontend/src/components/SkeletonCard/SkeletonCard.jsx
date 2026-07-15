import React from 'react'
import './skeleton.css'


const SkeletonCard = () => {
    return (
        <div className="food-item skeleton-card">
            <div className="skeleton skeleton-image"></div>

            <div className="food-item-info">
                <div className="skeleton skeleton-name"></div>

            </div>

            <div className="food-info">
                <div className="skeleton skeleton-desc"></div>
                <div className="skeleton skeleton-desc small"></div>
                <div className="skeleton skeleton-price"></div>
            </div>

            <div className="food-item-image-container">
            </div>
        </div>

    )
}

export default SkeletonCard