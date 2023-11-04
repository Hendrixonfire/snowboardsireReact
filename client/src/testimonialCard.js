import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function TestimonialCard(props){

    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        { rootMargin: "-10px" }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, [isIntersecting]);
  
    useEffect(() => {
      if (isIntersecting) {
        ref.current.classList.add('show');

      } else {
        ref.current.classList.remove('show');
      }
    }, [isIntersecting]);

    return(
        <article className={`testimonial testimonialHover flow ${(props.cardStyle === 1) ? 'purpleCard' : (props.cardStyle === 2) ? 'greyCard': (props.cardStyle === 3) ? 'whiteCard': (props.cardStyle === 4) ? 'turquoiseCard': 'greyCard'} quote ${props.cardGridSpan} testimonialHidden`}  ref={ref} >
            <div className="flex">
             <div>
                <img src={props.cardImage} alt={props.cardUserName} />
             </div>
             <div>
                <h2 className="name">{props.cardUserName}</h2>
                <p className="postion">{props.cardPosition}</p>
             </div>
            </div>
            <p>
                {props.cardDescriptionOne}
            </p>
            <p>
               {props.cardDescriptionTwo}
            </p>
        </article>
    )
}
export default TestimonialCard;