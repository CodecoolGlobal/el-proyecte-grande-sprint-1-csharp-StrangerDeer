import React from "react";
const ShootingStars = () => {
    
    const shootingStar = (starClassName, numberOfStars) => {
        let elements = [];
        
        for(let i = 0; i < numberOfStars; i++){
            elements.push(<div key={i} className={starClassName}></div>)
        }
        
        return elements;
    }
    
    return <>
        <div className="shooting-stars">
            {shootingStar("shooting-star", 25).map(element => (element))}
        </div>

        <div className="shooting-stars2">
            {shootingStar("shooting-star2", 25).map(element => (element))}
        </div>
    </>
}

export default ShootingStars;