import React from 'react'
import './skeletonSearch.css'


const SkeletonSearch = () => {
    return (
        <div className="skeleton-search-list">
            <div className="search-item skeleton-search-card" >
                {/* Left Image */}
                <div className="skeleton-search skeleton-search-image"></div>

                {/* Right Details */}
                <div className="search-item-details">

                    <div className="skeleton-search-content">
                        <div className="skeleton-search skeleton-search-title"></div>

                        <div className="skeleton-search skeleton-search-description"></div>
                        <div className="skeleton-search skeleton-search-description small"></div>
                    </div>


                    <div className="search-item-bottom">

                        <div className="skeleton-search skeleton-search-price"></div>

                        <div className="skeleton-search skeleton-search-button"></div>

                    </div>

                </div>

            </div>
        </div>

    )
}

export default SkeletonSearch